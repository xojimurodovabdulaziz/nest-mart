import { useEffect, useState } from "react";

export interface BlogComment {
  id: string;
  name: string;
  text: string;
  date: string;
}

const STORAGE_KEY = "blog_comments";

function readAll(): Record<string, BlogComment[]> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function useBlogComments(slug: string) {
  const [comments, setComments] = useState<BlogComment[]>([]);

  useEffect(() => {
    const all = readAll();
    setComments(all[slug] || []);
  }, [slug]);

  const addComment = (name: string, text: string) => {
    const all = readAll();
    const newComment: BlogComment = {
      id: `${Date.now()}`,
      name,
      text,
      date: new Date().toLocaleDateString("uz-UZ"),
    };
    const updated = [...(all[slug] || []), newComment];
    all[slug] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    setComments(updated);
  };

  return { comments, addComment };
}
