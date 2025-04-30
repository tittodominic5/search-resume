"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Loader2, Search, Tag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Define the type for search results
interface SearchResult {
  id: string;
  title: string;
  description: string;
  tags?: string[];
}

// Mock API function - replace with actual API call
const mockSearchApi = async (query: string): Promise<SearchResult[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!query.trim()) return [];

  // Mock results based on query
  return [
    {
      id: "1",
      title: `Result for "${query.split("\n")[0]}" #1`,
      description:
        "This is the first search result description with more details about the content.",
      tags: ["Featured", "New"],
    },
    {
      id: "2",
      title: `Result for "${query.split("\n")[0]}" #2`,
      description:
        "This is the second search result description with additional information.",
      tags: ["Popular"],
    },
    {
      id: "3",
      title: `Result for "${query.split("\n")[0]}" #3`,
      description:
        "This is the third search result description with relevant details for the user.",
      tags: ["Guide", "Tutorial"],
    },
  ];
};

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [expandedSearch, setExpandedSearch] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Validation rules
  const minLength = 3;
  const maxLength = 10000; // Increased max length for job descriptions
  const isValid =
    query.trim().length >= minLength && query.trim().length <= maxLength;
  const showError = isTouched && !isValid && query.trim() !== "";
  const hasResults = results.length > 0;

  // Handle search submission
  const handleSearch = async () => {
    if (!isValid) return;

    setIsLoading(true);
    setError(null);

    try {
      const searchResults = await mockSearchApi(query);
      setResults(searchResults);
      if (searchResults.length > 0) {
        setExpandedSearch(false);
      }
    } catch (err) {
      console.log(err);

      setError("An error occurred while searching. Please try again.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear search results
  const handleClearSearch = () => {
    setQuery("");
    setResults([]);
    setExpandedSearch(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  // Toggle expanded search mode
  const toggleExpandedSearch = () => {
    setExpandedSearch(!expandedSearch);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  // Handle key press in textarea
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Only trigger search when Ctrl+Enter or Command+Enter is pressed
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  // Adjust textarea height based on content
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Debounced validation effect
  useEffect(() => {
    if (query.trim() !== "") {
      setIsTouched(true);
    }
    adjustTextareaHeight();
  }, [query]);

  // Initial state setting
  useEffect(() => {
    setExpandedSearch(true);
  }, []);

  return (
    <div className="w-full mx-auto">
      <div className="relative">
        {/* Search Input Area */}
        <div
          className={`transition-all duration-300 ${
            hasResults && !expandedSearch ? "mb-6" : "mb-0"
          }`}
        >
          <Card
            className={`overflow-hidden shadow-lg border-0 ${
              hasResults && !expandedSearch ? "bg-indigo-50" : "bg-white"
            }`}
          >
            <CardContent
              className={`p-2 transition-all duration-300 ${
                expandedSearch ? "pb-6" : "py-2"
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <div className="flex">
                    <div className="relative flex-grow">
                      {hasResults && !expandedSearch ? (
                        <div className="pt-9 px-6 w-188 text-lg text-black truncate font-sans font-semibold">
                          {query}{" "}
                        </div>
                      ) : (
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400 pointer-events-none" />
                          <Textarea
                            ref={textareaRef}
                            placeholder="Paste job description here"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className={`min-h-[400px] py-3 pl-12 pr-10 text-lg border-0 shadow-none bg-transparent resize-none ${
                              hasResults && !expandedSearch
                                ? "text-indigo-700 font-medium"
                                : ""
                            }`}
                            maxLength={maxLength}
                            style={{ height: "auto", overflow: "hidden" }}
                          />
                          {query.length > 0 && (
                            <button
                              onClick={() => setQuery("")}
                              className="absolute right-3 top-4 text-slate-400 hover:text-slate-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    {hasResults && !expandedSearch ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={toggleExpandedSearch}
                              className="translate-y-[-2rem] rounded-full hover:bg-indigo-100 pb-0"
                            >
                              <ArrowUp className="h-6 w-6" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Expand JD</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Button
                        onClick={handleSearch}
                        disabled={!isValid || isLoading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-4 mt-4 px-6"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Searching
                          </>
                        ) : (
                          <>Search</>
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedSearch && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-1 px-3">
                        {showError && (
                          <p className="text-sm text-red-500 mb-1">
                            {query.trim().length < minLength
                              ? `Job description must be at least ${minLength} characters`
                              : `Job description cannot exceed ${maxLength} characters`}
                          </p>
                        )}

                        <div className="text-xs text-muted-foreground text-right flex justify-between">
                          <span className="text-indigo-600">
                            Tip: Press Ctrl+Enter to search
                          </span>
                          <span>
                            {query.length}/{maxLength} characters
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Results */}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-indigo-900">
                  Results{" "}
                  <span className="text-indigo-500">({results.length})</span>
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className="text-slate-500 hover:text-slate-700"
                >
                  Clear results
                </Button>
              </div>

              <div className="space-y-3">
                {results.map((result) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="group"
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all border-slate-200 group-hover:border-indigo-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-lg text-indigo-900 group-hover:text-indigo-700">
                              {result.title}
                            </h3>
                            <p className="text-slate-600 mt-1">
                              {result.description}
                            </p>

                            {result.tags && result.tags.length > 0 && (
                              <div className="flex gap-2 mt-3">
                                {result.tags.map((tag, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                                  >
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results Message */}
        <AnimatePresence>
          {isTouched &&
            results.length === 0 &&
            !isLoading &&
            !error &&
            query.trim() !== "" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10"
              >
                <p className="text-slate-500">
                  No candidates found against your job description.
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  Try using different keywords or phrases.
                </p>
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}
