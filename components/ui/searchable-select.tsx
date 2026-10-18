"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search, ChevronDown, Check, X } from "lucide-react";

export interface SearchableSelectOption {
  label: string;
  value: string;
}

export interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: (string | SearchableSelectOption)[];
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  disabledPlaceholder?: string;
  error?: string | boolean;
  className?: string;
  triggerClassName?: string;
  id?: string;
  name?: string;
  required?: boolean;
  clearable?: boolean;
}

export function SearchableSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  disabled = false,
  disabledPlaceholder,
  error,
  className = "",
  triggerClassName = "",
  id,
  clearable = true,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Normalize options
  const normalizedOptions: SearchableSelectOption[] = useMemo(() => {
    return options.map((opt) =>
      typeof opt === "string" ? { label: opt, value: opt } : opt
    );
  }, [options]);

  // Current selected option
  const selectedOption = useMemo(() => {
    return normalizedOptions.find((opt) => opt.value === value);
  }, [normalizedOptions, value]);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return normalizedOptions;
    return normalizedOptions.filter((opt) =>
      opt.label.toLowerCase().includes(q)
    );
  }, [normalizedOptions, search]);

  // Focus search input when dropdown opens and detect orientation
  useEffect(() => {
    if (isOpen) {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        if (spaceBelow < 260 && spaceAbove > spaceBelow) {
          setOpenUpward(true);
        } else {
          setOpenUpward(false);
        }
      }

      // Short delay to ensure popover is rendered
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearch("");
      setOpenUpward(false);
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearch("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setSearch("");
  };

  const displayText = disabled
    ? disabledPlaceholder || placeholder
    : selectedOption
    ? selectedOption.label
    : placeholder;

  const isSelected = Boolean(selectedOption);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`group flex h-11 w-full items-center justify-between rounded-xl border px-3 text-left text-sm transition-all duration-200 outline-none select-none ${
          disabled
            ? "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-500"
            : error
            ? "border-red-500 bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:bg-zinc-900 dark:focus:ring-red-950"
            : isOpen
            ? "border-black bg-white ring-2 ring-zinc-200 dark:border-white dark:bg-zinc-900 dark:ring-zinc-800"
            : "border-zinc-300 bg-white hover:border-zinc-400 focus:border-black focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:focus:border-zinc-400"
        } ${triggerClassName}`}
      >
        <span
          className={`truncate pr-2 ${
            !isSelected || disabled
              ? "text-zinc-400 dark:text-zinc-500"
              : "font-medium text-zinc-900 dark:text-zinc-100"
          }`}
        >
          {displayText}
        </span>

        <div className="flex items-center gap-1.5 shrink-0">
          {clearable && isSelected && !disabled && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleClear(e as any);
                }
              }}
              title="Clear selection"
              className="rounded-full p-0.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 transition-colors"
            >
              <X size={14} />
            </span>
          )}
          <ChevronDown
            size={16}
            className={`text-zinc-400 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-zinc-700 dark:text-zinc-200" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div
          className={`absolute left-0 right-0 z-[70] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl animate-in fade-in-0 zoom-in-95 dark:border-zinc-800 dark:bg-zinc-900 ${
            openUpward ? "bottom-full mb-1.5" : "top-full mt-1.5"
          }`}
        >
          {/* Search Input Box */}
          <div className="p-2 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="relative flex items-center">
              <Search
                size={15}
                className="pointer-events-none absolute left-2.5 text-zinc-400"
              />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="h-9 w-full rounded-lg border border-zinc-200 bg-white pl-8 pr-7 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-white"
                onClick={(e) => e.stopPropagation()}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            {normalizedOptions.length > 0 && (
              <div className="mt-1.5 flex items-center justify-between px-1 text-[11px] text-zinc-400">
                <span>
                  {filteredOptions.length}{" "}
                  {filteredOptions.length === 1 ? "option" : "options"}
                  {search ? " found" : " total"}
                </span>
                {search && (
                  <span className="truncate max-w-[150px]">
                    Matching &quot;{search}&quot;
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Options List */}
          <div
            role="listbox"
            className="max-h-56 overflow-y-auto p-1 text-sm scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700"
          >
            {filteredOptions.length === 0 ? (
              <div className="py-6 px-3 text-center">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  No matching options
                </p>
                {search && (
                  <p className="mt-1 text-[11px] text-zinc-400 dark:text-zinc-500">
                    Try searching with another keyword
                  </p>
                )}
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const active = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => handleSelect(opt.value)}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
                      active
                        ? "bg-zinc-100 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-white"
                        : "text-zinc-700 hover:bg-zinc-100/70 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
                    }`}
                  >
                    <span className="truncate pr-2">{opt.label}</span>
                    {active && (
                      <Check
                        size={14}
                        className="shrink-0 text-zinc-900 dark:text-white"
                      />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
