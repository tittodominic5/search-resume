"use server";

type SearchResult = any;

export async function liveSearchAction(query: string): Promise<SearchResult[]> {
  if (!query?.trim()) {
    return [];
  }

  try {
    const response = await fetch(`${process.env.API_ENDPOINT}/?limit=10`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: query,
        collection_name: process.env.API_COLLECTION_NAME,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results.objects as SearchResult[];
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
}
