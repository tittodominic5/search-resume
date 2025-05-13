"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Key, useEffect, useState } from "react";
import SearchComponent from "./search";

export default function HomePage() {
  const [showSearch, setShowSearch] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; duration: number }[]
  >([]);

  // Handle mouse movement for interactive background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate random particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  const handleGetStarted = () => {
    setShowSearch(true);
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Interactive gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-green-800 via-blue-600 to-slate-900 transition-all duration-700 ease-in-out"
        style={{
          backgroundPosition: `${mousePosition.x * 100}% ${
            mousePosition.y * 100
          }%`,
          backgroundSize: "200% 200%",
        }}
      />

      {/* Background pattern with animated overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:50px_50px]" />
      <div className="absolute inset-0 bg-black opacity-20 mix-blend-overlay" />

      {/* Floating particles */}
      {particles.map(
        (particle: {
          id: Key | null | undefined;
          x: any;
          y: any;
          size: any;
          duration: any;
        }) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white opacity-70 mix-blend-screen"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s infinite ease-in-out`,
            }}
          />
        )
      )}

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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              className="text-white mx-auto mb-6 hover:scale-110 transition-all duration-300 ease-in-out"
              src="/logo.png"
              alt="Logo"
              width={160}
              height={160}
            />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Top Talents
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
              Our intelligent platform connects you with the best-fit candidates
              for your roles.
            </p>

            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-white text-blue-800 hover:bg-white/90 hover:text-blue-600 font-medium px-8 py-6 text-lg rounded-full shadow-lg transition-all"
            >
              Find Candidates
            </Button>

            {/* Animated accent blurs */}
            <div className="absolute -top-12 -right-12 w-42 h-42 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-30" />
            <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-gradient-to-br from-pink-400 to-red-500 rounded-full blur-2xl opacity-30" />
            <div className="absolute -bottom-66 left-94 w-52 h-52 bg-gradient-to-br from-white-400 to-pink-500 rounded-full blur-2xl opacity-30" />
            <div className="absolute -top-80 left-1/2 w-60 h-60 bg-gradient-to-tr from-amber-300 to-yellow-500 rounded-full blur-3xl opacity-20" />
          </motion.div>
        ) : (
          /* Search component */
          <motion.div
            className="relative z-10 w-full max-w-4xl px-4 py-8"
            key="search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: isHovering
                ? `perspective(1000px) rotateX(${
                    (mousePosition.y - 0.5) * -5
                  }deg) rotateY(${(mousePosition.x - 0.5) * 5}deg)`
                : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="backdrop-blur-md bg-white/95 rounded-xl shadow-2xl p-6 border border-white/20">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-blue-700 flex items-center">
                  <Image
                    className="text-white mx-auto mb-0 mr-2 shadow-2xl hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer"
                    src="/logo.png"
                    alt="Logo"
                    width={40}
                    height={160}
                    onClick={() => setShowSearch(false)}
                  />
                  Search Candidates
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowSearch(false)}
                  className="text-blue-700 hover:text-blue-900 hover:bg-blue-100"
                >
                  Back to Home
                </Button>
              </div>
              <SearchComponent />
            </div>

            {/* Animated accent blurs for search panel */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full blur-xl opacity-30" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-xl opacity-30" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />

      {/* Global animation for floating particles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
}
