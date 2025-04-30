"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SearchComponent from "./search";

export default function HomePage() {
  const [showSearch, setShowSearch] = useState(false);

  const handleGetStarted = () => {
    setShowSearch(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient - always visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-90" />

      {/* Background pattern - always visible */}
      <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:50px_50px]" />

      <AnimatePresence mode="wait">
        {!showSearch ? (
          /* Home content */
          <motion.div
            className="relative z-10 max-w-4xl w-full text-center px-4"
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find Exactly Who You Need
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
              Our search platform helps you discover the perfect candidates.
            </p>

            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-white text-indigo-700 hover:bg-white/90 hover:text-indigo-800 font-medium px-8 py-6 text-lg rounded-full shadow-lg transition-all"
            >
              Find Candidates
            </Button>
          </motion.div>
        ) : (
          /* Search component */
          <motion.div
            className="relative z-10 w-full max-w-4xl px-4 py-8"
            key="search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white/95 backdrop-blur rounded-xl shadow-2xl p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-indigo-700">
                  Search Candidates
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowSearch(false)}
                  className="text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100"
                >
                  Back to Home
                </Button>
              </div>
              <SearchComponent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}
