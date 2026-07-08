import { useEffect, useState } from 'react';

export function usePathname() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  return [pathname, setPathname] as const;
}

export function useClientRouting(setPathname: (path: string) => void) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor || anchor.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey) return;

      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      const samePath = url.pathname === window.location.pathname;
      if (samePath && url.hash) {
        event.preventDefault();
        document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      event.preventDefault();
      window.history.pushState({}, '', url.pathname + url.search + url.hash);
      setPathname(url.pathname);
      window.scrollTo(0, 0);

      if (url.hash) {
        requestAnimationFrame(() => {
          document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
        });
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [setPathname]);
}
