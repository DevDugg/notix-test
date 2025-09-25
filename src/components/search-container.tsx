"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import SearchInput from "@/components/search-input";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";

export default function SearchContainer({
  initialQuery,
}: {
  initialQuery: string;
}) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const [inputValue, setInputValue] = useState(initialQuery);

  const updateUrl = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(window.location.search);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    updateUrl(value);
  };

  useEffect(() => {
    setInputValue(initialQuery);
  }, [initialQuery]);

  return <SearchInput value={inputValue} onChange={handleInputChange} />;
}
