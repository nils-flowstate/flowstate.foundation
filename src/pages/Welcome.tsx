import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { track } from '../lib/analytics'

const lines = [
  'Ich freue mich auf Deine Einzigartigkeit.',
  'Lass uns gemeinsam diesen Planeten ein fünkchen harmonischer gestalten.',
  'Willkommen',
]

export function Welcome() {
  const navigate = useNavigate()
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    track('business_card_scan')
    const timer = setTimeout(() => setLeaving(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="min-h-screen bg-navy flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, filter: 'blur(0px)' }}
        animate={
          leaving
            ? { opacity: 0, filter: 'blur(24px)' }
            : { opacity: 1, filter: 'blur(0px)' }
        }
        transition={leaving ? { duration: 0.8 } : { duration: 0.6 }}
        onAnimationComplete={() => { if (leaving) navigate('/') }}
        className="text-center space-y-6 max-w-lg"
      >
        {lines.map((line, i) => (
          <p
            key={i}
            className={`font-accent text-white leading-relaxed ${
              i === lines.length - 1
                ? 'text-4xl sm:text-5xl font-semibold mt-8'
                : 'text-2xl sm:text-3xl'
            }`}
          >
            {line}
          </p>
        ))}
      </motion.div>
    </section>
  )
}
