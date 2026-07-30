import { useEffect } from "react";

const usePageTitle = (title: string) => {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} — Nest` : "Nest — Onlayn oziq-ovqat do'koni";
    return () => {
      document.title = previous;
    };
  }, [title]);
};

export default usePageTitle;
