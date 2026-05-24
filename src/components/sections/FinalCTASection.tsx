import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { WhatsAppButton } from '../ui/WhatsAppButton'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
}

export function FinalCTASection() {
  return (
    <section className="bg-hero-bg min-h-screen flex items-center justify-center px-4 py-24">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-2xl mx-auto text-center flex flex-col items-center gap-8"
      >
        <motion.p
          variants={fadeUp}
          className="font-sans text-xs tracking-[0.2em] uppercase text-green"
        >
          Bereit für den nächsten Schritt?
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
        >
          Lass uns gemeinsam{' '}
          <span className="text-orange">durchstarten!</span>
        </motion.p>

        <motion.div variants={fadeUp}>
          <WhatsAppButton
            label="Lass uns gemeinsam durchstarten!"
            message="Ich habe Bock loszulegen. Wie fang ich direkt an?"
            className="text-base sm:text-lg px-8 py-4"
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <Link
            to="/about-us"
            className="inline-flex items-center gap-2 font-sans font-semibold text-white/60 hover:text-white transition-colors group"
          >
            Erfahre mehr über meine Passion
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
