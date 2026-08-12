import { useEffect, useState } from 'react'
import ArchVisual from './visuals/ArchVisual'
import { unsplash, unsplashSrcSet } from '../lib/images'

/**
 * Photographic fill for cards, panels and the hero.
 *
 * The ArchVisual line-art sits underneath as a permanent backing layer, so the
 * pre-load window shows brand-coloured artwork rather than a grey hole, and a
 * blocked or failed CDN request degrades to that same artwork instead of a
 * broken-image icon.
 *
 * The photo is painted at full opacity from the start and simply appears as it
 * decodes. An earlier version faded it in on `onLoad`, but a load that lands
 * before React attaches the handler — a cached image, most often — left the
 * photo stuck at zero opacity. Nothing here now depends on event timing.
 */
export default function Photo({
  id,
  alt,
  className = '',
  imgClassName = '',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
  fallbackVariant = 0,
  position = 'center',
}) {
  const [failed, setFailed] = useState(false)

  // A new source deserves a fresh attempt, even if the previous one 404'd.
  useEffect(() => setFailed(false), [id])

  // Client photography lives under /public and is referenced by path
  // (e.g. "/projects/foo.jpg"), so it skips the Unsplash CDN transform.
  const isLocal = typeof id === 'string' && (id.startsWith('/') || /^https?:\/\//.test(id))

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <ArchVisual variant={fallbackVariant} className="absolute inset-0 h-full w-full" />

      {!failed && (
        <img
          src={isLocal ? id : unsplash(id, 1080)}
          srcSet={isLocal ? undefined : unsplashSrcSet(id)}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onError={() => setFailed(true)}
          style={{ objectPosition: position }}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </span>
  )
}
