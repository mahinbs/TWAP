import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { PageSeoOverride } from './PageSeo';

const SeoContext = createContext<{
  override?: PageSeoOverride;
  setOverride: (o?: PageSeoOverride) => void;
}>({ setOverride: () => {} });

export function SeoProvider({ children }: { children: ReactNode }) {
  const [override, setOverride] = useState<PageSeoOverride | undefined>();
  return (
    <SeoContext.Provider value={{ override, setOverride }}>
      {children}
    </SeoContext.Provider>
  );
}

export function useSeoOverride() {
  return useContext(SeoContext);
}

/** Call from detail pages to set per-entity SEO for the current route. */
export function usePageSeoOverride(override?: PageSeoOverride) {
  const { setOverride } = useSeoOverride();
  useEffect(() => {
    setOverride(override);
    return () => setOverride(undefined);
  }, [override?.title, override?.description, override?.image, override?.noindex, setOverride]);
}
