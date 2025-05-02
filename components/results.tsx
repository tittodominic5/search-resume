"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText, Tag } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface Candidate {
  id: string;
  name: string;
  resumeUrl?: string;
  skills?: string[];
}

interface SearchResultsProps {
  results: Candidate[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="space-y-3">
      {results.map((candidate) => (
        <motion.div
          key={candidate.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="group"
        >
          <Card className="overflow-hidden hover:shadow-lg transition-all border-slate-200 group-hover:border-indigo-200 h-30">
            <CardContent className="px-5 py-0">
              <div className="flex items-start justify-between">
                <div className="w-full">
                  {candidate.resumeUrl ? (
                    <Link href={candidate.resumeUrl} target="_blank">
                      <h3 className="font-medium text-lg text-indigo-900 group-hover:text-indigo-700 cursor-pointer hover:underline flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                        {candidate.name}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </h3>
                    </Link>
                  ) : (
                    <h3 className="font-medium text-lg text-indigo-900">
                      {candidate.name}
                    </h3>
                  )}
                  {candidate.skills && candidate.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {candidate.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {skill}
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
  );
}
