"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { useSearch } from "@/hooks/use-search";
import SearchInput from "@/components/search-input";
import SearchResults from "@/components/search-results";

export default function SearchContainer({
  initialQuery,
}: {
  initialQuery: string;
}) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const [inputValue, setInputValue] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  const { results, isLoading, error } = useSearch(debouncedQuery);

  const updateUrlAndQuery = useDebouncedCallback((query: string) => {
    setDebouncedQuery(query);
    const params = new URLSearchParams(window.location.search);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
      updateUrlAndQuery(value);
    },
    [updateUrlAndQuery]
  );

  useEffect(() => {
    setInputValue(initialQuery);
    setDebouncedQuery(initialQuery);
  }, [initialQuery]);

  return (
    <>
      <SearchInput value={inputValue} onChange={handleInputChange} />
      <SearchResults results={results} isLoading={isLoading} error={error} />
    </>
  );
}
