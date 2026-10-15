import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryLightboxProps {
  images: string[]
  labels: { open: string; image: string; prev: string; next: string; close: string }
}

export default function GalleryLightbox({ images, labels }: GalleryLightboxProps) {
  const [index, setIndex] = useState<number | null>(null)
  const count = images.length

  const prev = () => setIndex(i => (i !== null ? (i + count - 1) % count : null))
  const next = () => setIndex(i => (i !== null ? (i + 1) % count : null))

  useEffect(() => {
    if (index === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null)
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [index])

  return (
    <>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            className="aspect-square overflow-hidden rounded-xl group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-navy"
            aria-label={`${labels.open} ${i + 1}`}
          >
            <img
              src={src}
              alt={`${labels.image} ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          className="enter fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          style={{ ['--y' as string]: '0px', ['--dur' as string]: '0.2s' }}
          onClick={() => setIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={e => { e.stopPropagation(); prev() }}
            className="absolute left-4 sm:left-6 text-white p-2.5 rounded-full bg-white/10 hover:bg-white/25 transition-colors"
            aria-label={labels.prev}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={e => { e.stopPropagation(); next() }}
            className="absolute right-4 sm:right-6 text-white p-2.5 rounded-full bg-white/10 hover:bg-white/25 transition-colors"
            aria-label={labels.next}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() => setIndex(null)}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/25 transition-colors"
            aria-label={labels.close}
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={images[index]}
            alt={`${labels.image} ${index + 1}`}
            onClick={e => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          />

          <p className="absolute bottom-5 font-sans text-white/50 text-sm tabular-nums">
            {index + 1} / {count}
          </p>
        </div>
      )}
    </>
  )
}
