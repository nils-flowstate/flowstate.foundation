import { useEffect, useState } from 'react'

interface QuoteRotatorProps {
  quotes: { text: string; author: string }[]
}

export default function QuoteRotator({ quotes }: QuoteRotatorProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setIndex(i => (i + 1) % quotes.length), 6000)
    return () => clearInterval(interval)
  }, [quotes.length])

  const quote = quotes[index]

  return (
    <div key={index} className="enter" style={{ ['--y' as string]: '10px', ['--dur' as string]: '0.4s' }}>
      <blockquote className="font-display text-xl sm:text-2xl text-navy italic mb-3">
        "{quote.text}"
      </blockquote>
      <cite className="font-sans text-sm text-muted not-italic">— {quote.author}</cite>
    </div>
  )
}
