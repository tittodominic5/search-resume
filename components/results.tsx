"use client";

import { motion } from "framer-motion";
import { Download, FileText, Tag, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

// Dynamically import the PDF viewer component with no SSR
// const PDFViewer = dynamic(() => import("./pdf-viewer"), {
//   ssr: false,
//   loading: () => (
//     <div className="w-full h-[70vh] flex items-center justify-center bg-slate-50">
//       <div className="text-center">
//         <FileText className="h-12 w-12 mx-auto text-slate-400" />
//         <p className="mt-2 text-slate-600">Loading PDF viewer...</p>
//       </div>
//     </div>
//   ),
// });

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
  const [selectedPdf, setSelectedPdf] = useState<SearchResult | null>(null);

  const handleTitleClick = (result: SearchResult) => {
    if (result.pdfUrl) {
      setSelectedPdf(result);
    }
  };

  const handleCloseModal = () => {
    setSelectedPdf(null);
  };

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
                    <h3
                      className={`font-medium text-lg text-indigo-900 group-hover:text-indigo-700 ${
                        result.pdfUrl
                          ? "cursor-pointer hover:underline flex items-center"
                          : ""
                      }`}
                      onClick={() => handleTitleClick(result)}
                    >
                      {result.pdfUrl && (
                        <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                      )}
                      {result.title}
                    </h3>
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

      <Dialog open={!!selectedPdf} onOpenChange={() => setSelectedPdf(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-indigo-600" />
                {selectedPdf?.title}
              </span>
              <div className="flex items-center space-x-2">
                {selectedPdf?.pdfUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(selectedPdf.pdfUrl, "_blank")}
                    className="text-xs"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                )}
                <button
                  onClick={handleCloseModal}
                  className="h-6 w-6 rounded-full bg-slate-100 hover:bg-slate-200 inline-flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="w-full h-[70vh] mt-4 border border-slate-200 rounded-md overflow-hidden">
            {/* {selectedPdf?.pdfUrl && (
              <PDFViewer url={selectedPdf.pdfUrl} title={selectedPdf.title} />
            )} */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
