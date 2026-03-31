"use client";

import { useEffect, useMemo, useState } from "react";

export function useSearch(initialValue = "", delay = 350) {
  const [search, setSearch] = useState(initialValue);
  const [debouncedSearch, setDebouncedSearch] = useState(initialValue);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [search, delay]);

  const normalizedSearch = useMemo(() => search.trim(), [search]);

  return {
    search,
    setSearch,
    debouncedSearch,
    normalizedSearch,
    hasSearch: normalizedSearch.length > 0,
  };
}
