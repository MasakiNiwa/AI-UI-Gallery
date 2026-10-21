import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { DemoRenderer } from '@/components/gallery/DemoRenderer';
import { getItem } from '@/gallery/registry';

/**
 * Bare page used by `npm run previews` to screenshot a demo for the static gallery thumbnails.
 * Not linked from the app. `?theme=dark|light` forces the theme.
 */
export function CapturePage() {
  const { id = '' } = useParams();
  const [params] = useSearchParams();
  const dark = params.get('theme') === 'dark';
  const item = getItem(id);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  if (!item) return null;
  return (
    <div className="@container h-dvh w-screen overflow-hidden bg-bg text-fg" data-capture-ready>
      <DemoRenderer item={item} mode="preview" />
    </div>
  );
}
