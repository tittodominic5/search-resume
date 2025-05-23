"use client";

import { liveSearchAction } from "@/app/actions/search";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  Loader2,
  RotateCcw,
  Search,
  Text,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SearchResults from "./results";

type SearchResult = {
  id: string;
  name: string;
  resumeUrl: string;
  skills: string[];
  matchScore: number;
  properties?: any;
};

const liveSearchApi = async (query: string): Promise<SearchResult[]> => {
  if (!query.trim()) return [];
  const response = await liveSearchAction(query);
  return response; // Adjust based on actual API shape
};

const analyzeJobDescription = (text: string) => {
  // In a real implementation, this would use NLP to extract key requirements
  const keywords = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "API",
    "Frontend",
    "Backend",
    "Node.js",
    "CSS",
    "HTML",
    "Performance",
    "SEO",
    "node",
    "js",
    "Webpack",
    "Vite",
    "ESLint",
    "Prettier",
    "Tailwind",
    "SASS",
    "SCSS",
    "REST",
    "GraphQL",
    "WebSockets",
    "JWT",
    "OAuth",
    "CI/CD",
    "Docker",
    "Kubernetes",
    "Microservices",
    "Monorepo",
    "Vercel",
    "Netlify",
    "Serverless",
    "Redis",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "Supabase",
    "Firebase",
    "Zod",
    "Jest",
    "Cypress",
    "Playwright",
    "Stripe",
    "Twilio",
    "Auth0",
    "React Query",
    "TanStack",
    "Redux",
    "Zustand",
    "Hooks",
    "Responsive",
    "Accessibility",
    "i18n",
    "SSR",
    "ISR",
    "CSR",
    "SWR",
    "Linting",
    "Testing",
    "DevOps",
  ];

  const foundKeywords = keywords.filter((kw) =>
    text.toLowerCase().includes(kw.toLowerCase())
  );

  return foundKeywords.slice(0, 5); // Return top 5 keywords
};

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [expandedSearch, setExpandedSearch] = useState(false);
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false);
  const [keyRequirements, setKeyRequirements] = useState<string[]>([]);
  const [animateInput, setAnimateInput] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [resume1, setResume1] = useState<string>("");
  const [resume2, setResume2] = useState<string>("");

  // Validation rules
  const minLength = 3;
  const maxLength = 10000;
  const isValid =
    query.trim().length >= minLength && query.trim().length <= maxLength;
  const showError = isTouched && !isValid && query.trim() !== "";
  const hasResults = results && results.length > 0;

  // Handle search submission
  const handleSearch = async () => {
    if (!isValid) return;

    setIsLoading(true);
    setError(null);
    triggerInputAnimation();

    // Extract key requirements on search
    const requirements = analyzeJobDescription(query);
    setKeyRequirements(requirements);

    try {
      const searchResults = await liveSearchApi(query);
      setResults(searchResults);
      setIsLoading(false);
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
    setResults(null);
    setKeyRequirements([]);
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

  const handleCompare = () => {};

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

  // Trigger input animation effect
  const triggerInputAnimation = () => {
    setAnimateInput(true);
    setTimeout(() => setAnimateInput(false), 800);
  };

  // Card background animation
  const cardVariants = {
    idle: {
      background: "linear-gradient(135deg, #f7f9fc 0%, #ffffff 100%)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
    },
    active: {
      background: "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)",
      boxShadow: "0 4px 20px rgba(79, 70, 229, 0.15)",
    },
    loading: {
      background: "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)",
      boxShadow: "0 4px 20px rgba(79, 70, 229, 0.15)",
      transition: { duration: 0.5 },
    },
    results: {
      background: "linear-gradient(135deg, #eef5ff 0%, #f0f7ff 100%)",
      boxShadow: "0 8px 30px rgba(59, 130, 246, 0.12)",
      transition: { duration: 0.5 },
    },
  };

  const cardState = isLoading
    ? "loading"
    : hasResults && !expandedSearch
    ? "results"
    : "idle";

  return (
    <>
      <div className="w-full mx-auto">
        <div className="relative">
          {/* Search Header with Compare Resumes Button */}
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-md font-semibold text-slate-800 flex items-center ml-1">
              <Text className="mr-2 h-4 w-4 text-indigo-600" />
              Enter Job Description
            </h4>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  disabled={!results?.length}
                  className="gap-2 bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                >
                  <FileText className="h-4 w-4" />
                  Submit Evaluation
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Submit Evaluation</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="resume1" className="text-sm font-medium">
                      Best Match
                    </label>
                    <Select value={resume1} onValueChange={setResume1}>
                      <SelectTrigger id="resume1">
                        <SelectValue placeholder="Select a resume" />
                      </SelectTrigger>
                      <SelectContent>
                        {results &&
                          results.map((resume) => (
                            <SelectItem
                              key={resume.properties?.title}
                              value={resume.properties.file_id}
                            >
                              {resume.properties?.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="resume2" className="text-sm font-medium">
                      Worst Match
                    </label>
                    <Select value={resume2} onValueChange={setResume2}>
                      <SelectTrigger id="resume2">
                        <SelectValue placeholder="Select a resume" />
                      </SelectTrigger>
                      <SelectContent>
                        {results &&
                          results.map((resume) => (
                            <SelectItem
                              key={resume.properties?.title}
                              value={resume.properties.file_id}
                            >
                              {resume.properties?.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button
                      onClick={handleCompare}
                      disabled={!results}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search Input Area */}
          <div
            className={`transition-all duration-300 ${
              hasResults && !expandedSearch ? "mb-6" : "mb-0"
            }`}
          >
            <motion.div
              variants={cardVariants}
              initial="idle"
              animate={cardState}
              className="rounded-xl overflow-hidden"
            >
              <Card className="overflow-hidden border-0">
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
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className={`py-9 px-6 mt-0 transition-all duration-300 cursor-pointer ${
                                      query.trim()
                                        ? "w-full"
                                        : "w-1/2 overflow-hidden whitespace-nowrap text-ellipsis"
                                    } text-lg text-gray-700 font-semibold`}
                                    onClick={() => {
                                      toggleExpandedSearch();
                                      setResults(null);
                                      setKeyRequirements([]);
                                    }}
                                  >
                                    {query.trim() ? (
                                      <div className="line-clamp-3 break-words">
                                        {query}
                                      </div>
                                    ) : (
                                      <div>{query}</div>
                                    )}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Click to edit job description</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <div className="relative">
                              <Search
                                className={`absolute left-3 top-3 h-5 w-5 pointer-events-none transition-all ${
                                  animateInput
                                    ? "text-indigo-500"
                                    : "text-slate-400"
                                }`}
                              />
                              <Textarea
                                ref={textareaRef}
                                placeholder="Paste job description here..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className={`min-h-[200px] py-3 pl-12 pr-10 text-lg border-0 shadow-none bg-transparent resize-none transition-all ${
                                  hasResults && !expandedSearch
                                    ? "text-indigo-700 font-medium"
                                    : "text-slate-800"
                                } ${animateInput ? "bg-indigo-50/50" : ""}`}
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

                      {/* Key Requirements Tags */}
                      {keyRequirements.length > 0 && !expandedSearch && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex flex-wrap gap-2 px-6 mt-1 mb-2"
                        >
                          <span className="text-xs text-indigo-700 font-medium">
                            Key requirements:
                          </span>
                          {keyRequirements.map((req, idx) => (
                            <span
                              key={idx}
                              className="px-2 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                            >
                              {req}
                            </span>
                          ))}
                        </motion.div>
                      )}

                      <div className="flex justify-end">
                        {hasResults && !expandedSearch ? (
                          <></>
                        ) : (
                          <Button
                            onClick={handleSearch}
                            disabled={!isValid || isLoading}
                            className="py-4 mt-4 px-6 text-white transition-all bg-gradient-to-r from-blue-600 to-blue-900 hover:from-blue-700 hover:to-blue-700 rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/20 duration-200"
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Searching...
                              </>
                            ) : (
                              <>
                                <Zap className="mr-0 h-4 w-4" />
                                Find Talent
                              </>
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
                              <span className="text-blue-600 flex items-center">
                                <Zap className="h-3 w-3 mr-1" />
                                Tip: Press Ctrl+Enter to search
                              </span>
                              <span className="flex items-center">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: (query.length / maxLength) * 100,
                                  }}
                                  className="h-1 bg-indigo-200 rounded-full mr-2 w-20"
                                >
                                  <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{
                                      width: `${
                                        (query.length / maxLength) * 100
                                      }%`,
                                    }}
                                    className="h-full bg-indigo-500 rounded-full"
                                  />
                                </motion.div>
                                <span>
                                  {query.length}/{maxLength}
                                </span>
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Error Alert */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert
                  variant="destructive"
                  className="mb-4 mt-2 mx-auto w-full py-10"
                >
                  <AlertDescription className="text-center mx-auto font-semibold">
                    {error}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Results */}
          <AnimatePresence>
            {results && results.length > 0 && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium text-indigo-900 flex items-center">
                      Top Matches
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="ml-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 text-sm rounded-full flex items-center mt-2"
                      >
                        <span>{results.length}</span>
                        <span className="hidden sm:inline ml-1">
                          candidates
                        </span>
                      </motion.div>
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearSearch}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Clear results
                  </Button>
                </div>

                <SearchResults results={results} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Results Message */}
          <AnimatePresence>
            {results && results.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-slate-700 font-medium text-lg">
                  No matching candidates found
                </p>
                <div className="flex flex-col items-center gap-3 mt-4 max-w-md mx-auto ">
                  <Button
                    onClick={handleClearSearch}
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    <RotateCcw className="h-3 w-3 mr-2" />
                    Start over with new search
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
