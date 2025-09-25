"use client";

import { useEffect, useReducer, useRef } from "react";
import { SearchResult } from "@/components/search-results";

interface State {
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
}

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: SearchResult[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "RESET" };

const initialState: State = {
  results: [],
  isLoading: false,
  error: null,
};

function searchReducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        results: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function useSearch(debouncedQuery: string) {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const cache = useRef<Map<string, SearchResult[]>>(new Map());

  useEffect(() => {
    if (!debouncedQuery) {
      dispatch({ type: "RESET" });
      return;
    }

    if (cache.current.has(debouncedQuery)) {
      dispatch({
        type: "FETCH_SUCCESS",
        payload: cache.current.get(debouncedQuery)!,
      });
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      dispatch({ type: "FETCH_START" });

      try {
        const response = await fetch(`/api/search?q=${debouncedQuery}`, {
          signal,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.errors[0]?.message || "An error occurred");
        }

        const data = await response.json();
        cache.current.set(debouncedQuery, data);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          dispatch({ type: "FETCH_ERROR", payload: error.message });
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  return state;
}
