"use client";

import { useEffect, useMemo, useRef } from "react";
import { debounce } from "@/lib/utils";

export function useDebouncedCallback<F extends (...args: any[]) => any>(
  callback: F,
  delay: number
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  const debouncedCallback = useMemo(() => {
    const func = (...args: Parameters<F>) => {
      callbackRef.current(...args);
    };
    return debounce(func, delay);
  }, [delay]);

  useEffect(() => {
    return () => {
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);

  return debouncedCallback;
}
