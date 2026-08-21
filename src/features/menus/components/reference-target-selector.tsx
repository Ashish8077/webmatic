"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search, ChevronDown, Check, Loader2 } from "lucide-react";
import { usePages } from "@/features/pages/hooks/use-pages";
import { useServices } from "@/features/services/hooks/use-services";
import { usePage } from "@/features/pages/hooks/use-page";
import { useService } from "@/features/services/hooks/use-service";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { DEFAULT_PAGE_QUERY } from "@/features/pages/types/page-query";

export type ReferenceTargetType = "page" | "service";

interface ReferenceTargetSelectorProps {
  type: ReferenceTargetType;
  value: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
  error?: string;
}

export function ReferenceTargetSelector({
  type,
  value,
  onChange,
  disabled = false,
  error,
}: ReferenceTargetSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch paginated lists
  const { data: pagesData, isLoading: isLoadingPages, isError: isErrorPages } = usePages({
    ...DEFAULT_PAGE_QUERY,
    search: debouncedSearch,
    status: "published", // Only published pages should be linkable
  });

  const { data: servicesData, isLoading: isLoadingServices, isError: isErrorServices } = useServices({
    page: 1,
    limit: 20,
    search: debouncedSearch,
    status: "published",
  });

  // Fetch specific entity if editing (value exists) to get its name
  // This handles the case where the selected item is not on the first page of results
  const { data: pageData, isLoading: isLoadingPage } = usePage(value ?? 0);
  const { data: serviceData, isLoading: isLoadingService } = useService(value ?? 0, value !== null && value > 0 && type === "service");

  const isLoading = type === "page" ? isLoadingPages : isLoadingServices;
  const isError = type === "page" ? isErrorPages : isErrorServices;

  const options = useMemo(() => {
    if (type === "page") {
      return pagesData?.data.items.map((p) => ({ value: p.id, label: p.title })) || [];
    } else {
      return servicesData?.data.items.map((s) => ({ value: s.id, label: s.name })) || [];
    }
  }, [type, pagesData, servicesData]);

  // Determine current display label
  const currentLabel = useMemo(() => {
    if (!value) return `Select ${type}...`;
    
    // First try to find it in the current paginated list
    const found = options.find((opt) => opt.value === value);
    if (found) return found.label;

    // Otherwise use the specific entity fetch result
    if (type === "page" && pageData?.data) {
      return pageData.data.title;
    }
    if (type === "service" && serviceData?.data) {
      return serviceData.data.name;
    }

    // Still loading the specific entity
    if ((type === "page" && isLoadingPage) || (type === "service" && isLoadingService)) {
      return "Loading...";
    }

    return "Unknown item";
  }, [value, options, type, pageData, serviceData, isLoadingPage, isLoadingService]);

  const handleSelect = (selectedValue: number) => {
    onChange(selectedValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-1.5" ref={wrapperRef} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className={`flex w-full items-center justify-between rounded-md border bg-input-bg px-3 py-2.5 text-sm text-foreground shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent disabled:cursor-not-allowed disabled:opacity-50 ${error ? "border-danger focus:ring-danger/40" : "border-input-border"} ${isOpen ? "ring-2 ring-accent/40 border-accent" : ""}`}
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
            if (!isOpen) {
              setTimeout(() => inputRef.current?.focus(), 0);
            }
          }
        }}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{currentLabel}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute z-[100] mt-1 w-full rounded-md border border-card-border bg-card-bg text-foreground shadow-xl outline-none animate-in fade-in-0 zoom-in-95">
          <div className="flex items-center border-b border-card-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              ref={inputRef}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={`Search ${type}s...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto p-1" role="listbox">
            {isLoading ? (
              <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading {type}s...
              </div>
            ) : isError ? (
              <div className="py-6 text-center text-sm text-red-500">
                Unable to load {type}s.
              </div>
            ) : options.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {searchTerm ? `No ${type}s match "${searchTerm}".` : `No published ${type}s available.`}
              </div>
            ) : (
              options.map((option) => (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={value === option.value}
                  className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none hover:bg-surface-hover transition-colors ${value === option.value ? "bg-accent/20 font-medium text-accent-hover" : ""}`}
                  onClick={() => handleSelect(option.value)}
                >
                  {value === option.value && (
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {error && <p className="text-xs text-danger mt-0.5">{error}</p>}
    </div>
  );
}
