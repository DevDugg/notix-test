"use client";

import { useState } from "react";
import SearchInput from "@/components/search-input";

export default function SearchContainer() {
  const [searchQuery, setSearchQuery] = useState("");

  return <SearchInput value={searchQuery} onChange={setSearchQuery} />;
}
