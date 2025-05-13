"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Briefcase, ExternalLink, Gauge, Mail } from "lucide-react";

interface Candidate {
  file_id?: string;
  name: string;
  file_path?: string;
  skills?: string[];
  properties?: any;
  metadata?: any;
}

interface SearchResultsProps {
  results: Candidate[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  // Get initials from name
  const getInitials = (name: string) => name[0]?.toUpperCase() || "?";

  // Get avatar color based on index
  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-amber-100 text-amber-800",
      "bg-rose-100 text-rose-800",
      "bg-indigo-100 text-indigo-800",
    ];
    return colors[index % colors.length];
  };

  // Handle resume link click
  const openResumeUrl = (url?: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (url)
      window.open(
        process.env.NEXT_PUBLIC_BASE_URL + url,
        "_blank",
        "noopener,noreferrer"
      );
  };

  return (
    <div className="space-y-2">
      {results.map((candidate, index) => {
        const initials = getInitials(
          candidate.name || candidate?.properties?.title || "?"
        );
        const avatarColor = getAvatarColor(index);
        const displayName =
          candidate?.properties?.title || candidate.name || "N/A";

        return (
          <motion.div
            key={candidate.file_id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
          >
            <Card
              className="border-slate-200 hover:border-indigo-200 hover:shadow-sm transition-all duration-200 cursor-pointer"
              // onClick={() => openResumeUrl(candidate.properties?.file_path)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between relative">
                  <div className="flex items-center gap-3">
                    <Avatar className={`h-9 w-9 shrink-0 ${avatarColor}`}>
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <h2
                        className="font-medium text-indigo-900 truncate flex items-center gap-1"
                        title={displayName}
                      >
                        {displayName}
                        {/* {candidate.properties?.file_path && (
                          <ExternalLink className="h-3 w-3 text-indigo-400 inline-flex shrink-0" />
                        )} */}
                      </h2>

                      <div className="flex items-center gap-4">
                        {candidate?.properties?.company && (
                          <div className="flex items-center text-slate-600 text-xs">
                            <Briefcase className="h-3 w-3 mr-1 shrink-0" />
                            <span className="truncate">
                              {candidate.properties.company}
                            </span>
                          </div>
                        )}

                        {candidate?.metadata?.distance && (
                          <div className="hidden sm:flex items-center text-slate-600 text-xs">
                            <Gauge className="h-3 w-3 mr-1 shrink-0" />
                            <span className="truncate">
                              {candidate?.metadata?.distance.toFixed(2)}
                            </span>
                          </div>
                        )}

                        {candidate?.properties?.email && (
                          <div className="hidden md:flex items-center text-slate-600 text-xs">
                            <Mail className="h-3 w-3 mr-1 shrink-0" />
                            <span className="truncate">
                              {candidate.properties.email}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {candidate.properties?.file_path && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 ml-2 p-2 h-8"
                      onClick={(e) =>
                        openResumeUrl(candidate.properties?.file_path, e)
                      }
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-1 text-xs">
                        Resume
                      </span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
