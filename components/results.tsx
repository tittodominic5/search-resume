"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText, Tag } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  pdfUrl?: string;
  tags?: string[];
}

interface SearchResultsProps {
  results: SearchResult[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  return (
    <>
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
                  <div className="w-full">
                    <Link href={`${result.pdfUrl}`} target="_blank">
                      <span>
                        <h3
                          className={`font-medium text-lg text-indigo-900 group-hover:text-indigo-700 ${
                            result.pdfUrl
                              ? "cursor-pointer hover:underline flex items-center"
                              : ""
                          }`}
                        >
                          {result.pdfUrl && (
                            <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                          )}
                          {result.title}
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </h3>
                      </span>
                    </Link>
                    <p className="text-slate-600 mt-1">{result.description}</p>
                    {result.tags && result.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
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
    </>
  );
}
