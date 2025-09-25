"use client";

import React, { forwardRef } from "react";
import styles from "./search-input.module.css";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  activeDescendant?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, placeholder = "Search...", activeDescendant }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };

    return (
      <div className={styles.wrapper}>
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={styles.input}
          autoFocus
          role="combobox"
          aria-expanded={value.length > 0}
          aria-controls="search-results-list"
          aria-activedescendant={activeDescendant}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default React.memo(SearchInput);
