import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Music2, ExternalLink, Play, Pause, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PhoneInput } from '../components/ui/PhoneInput'
import { WhatsAppButton } from '../components/ui/WhatsAppButton'
import { EventsList } from '../components/ui/EventsList'

const quotes = [
  { textKey: 'quotes.q1text', authorKey: 'quotes.q1author' },
  { textKey: 'quotes.q2text', authorKey: 'quotes.q2author' },
  { textKey: 'quotes.q3text', authorKey: 'quotes.q3author' },
  { textKey: 'quotes.q4text', authorKey: 'quotes.q4author' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const igProfiles = [
  { handle: 'nils.back.to.nature', url: 'https://instagram.com/nils.back.to.nature' },
  { handle: 'Nils | Light.Child', url: 'https://instagram.com' },
  { handle: 'flowstate.foundation', url: 'https://instagram.com/flowstate.foundation' },
  { handle: 'flowstate.express', url: 'https://instagram.com/flowstate.express' },
]

const playlists = [
  { name: 'Radio Sigma', url: 'https://open.spotify.com/playlist/18lmDNZmx6KI0rgI6czS55?si=628c97b1d28744b2' },
  { name: 'Manifesting High Energy', url: 'https://open.spotify.com/playlist/4Y0jmSHY0wJseCRXuFnR47?si=25fb48d765f84627' },
  { name: 'Rave Sing Feel', url: 'https://open.spotify.com/playlist/5U1aAH34kLuqzDqx1qKBMM?si=2e4b34f95a974e09' },
]

const galleryImages = Array.from({ length: 9 }, (_, i) =>
  `/assets/about-us/gallery/gal-0${i + 1}.jpg`
)

const GALLERY_COUNT = galleryImages.length

export function AboutUs() {
  const { t } = useTranslation()
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(i => (i + 1) % quotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      else if (e.key === 'ArrowRight') setLightboxIndex(i => i !== null ? (i + 1) % GALLERY_COUNT : null)
      else if (e.key === 'ArrowLeft') setLightboxIndex(i => i !== null ? (i + GALLERY_COUNT - 1) % GALLERY_COUNT : null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) audioRef.current.pause()
    else audioRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    if (audioRef.current) audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  const handleEnded = () => setIsPlaying(false)

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-28 pb-16 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl sm:text-4xl font-bold text-white"
        >
          {t('about.whoAmI')}
        </motion.h1>
      </section>

      {/* Bio */}
      <section className="bg-white py-20 px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start"
        >
          <motion.div variants={fadeUp}>
            <img
              src="/assets/nils.webp"
              alt="Nils Tenkotte"
              className="w-full max-w-sm mx-auto rounded-2xl shadow-lg object-cover aspect-[3/4]"
              loading="lazy"
            />
          </motion.div>
          <motion.div variants={stagger} className="space-y-4 pt-4">
            <motion.h2 variants={fadeUp} className="font-display text-2xl font-bold text-navy">
              {t('about.greeting')}
            </motion.h2>
            {['fullBio1', 'fullBio2', 'fullBio3', 'fullBio4'].map(key => (
              <motion.p key={key} variants={fadeUp} className="font-sans text-text leading-relaxed">
                {t(`about.${key}`)}
              </motion.p>
            ))}
            <motion.div variants={fadeUp} className="pt-4 space-y-3">
              <p className="font-sans font-semibold text-navy">{t('about.interest')}</p>
              <PhoneInput source="about" />
              <WhatsAppButton className="w-full sm:w-auto" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Rotating quotes */}
      <section className="bg-surface py-16 px-4">
        <div className="max-w-2xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <blockquote className="font-display text-xl sm:text-2xl text-navy italic mb-3">
                "{t(quotes[quoteIndex].textKey)}"
              </blockquote>
              <cite className="font-sans text-sm text-muted not-italic">
                — {t(quotes[quoteIndex].authorKey)}
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Herzensprojekte */}
      <section className="bg-surface py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-bold text-navy text-center mb-12"
          >
            {t('herzensprojekte.title')}
          </motion.h2>

          {/* Music Preview */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-sm mb-8"
          >
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-muted mb-4">
              {t('herzensprojekte.trackPreviewTitle')}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center shrink-0">
                <Music2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-sans font-semibold text-navy leading-snug">Nordic Thunder (Original Mix)</p>
                <p className="font-sans text-sm text-muted">W4mBo</p>
              </div>
            </div>

            <audio
              ref={audioRef}
              src="/assets/about-us/audio/nordic-thunder.mp4"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
            />

            <div className="flex items-center gap-3 mb-5">
              <button
                onClick={togglePlay}
                className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white shrink-0 hover:opacity-80 transition-opacity"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying
                  ? <Pause className="w-4 h-4" />
                  : <Play className="w-4 h-4 ml-0.5" />
                }
              </button>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1.5 accent-navy cursor-pointer"
              />
              <span className="font-sans text-xs text-muted tabular-nums shrink-0 w-20 text-right">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <a
              href="https://open.spotify.com/intl-de/artist/1lS5n7US8saqwJGqJW89Ke?si=DkNDHlehSVGlvCMyVOwz6A"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1DB954] text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t('herzensprojekte.spotifyArtist')}
            </a>
          </motion.div>

          {/* Gallery 3×3 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="font-sans font-semibold text-navy mb-4">{t('herzensprojekte.galleryTitle')}</h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {galleryImages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className="aspect-square overflow-hidden rounded-xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                  aria-label={`Bild ${i + 1} öffnen`}
                >
                  <img
                    src={src}
                    alt={`Galerie ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Row 1: Playlists + Instagram */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Playlists */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="font-sans font-semibold text-navy mb-1">{t('herzensprojekte.musicTitle')}</h3>
              <p className="font-sans text-sm text-muted mb-5">{t('herzensprojekte.musicDesc')}</p>
              <div className="space-y-3">
                {playlists.map(p => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface hover:bg-[#1DB954]/10 text-text hover:text-[#1DB954] transition-colors group"
                  >
                    <Music2 className="w-4 h-4 shrink-0 text-[#1DB954]" />
                    <span className="font-sans text-sm font-medium">{p.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Instagram */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="font-sans font-semibold text-navy mb-5">{t('herzensprojekte.socialTitle')}</h3>
              <div className="space-y-3">
                {igProfiles.map(profile => (
                  <a
                    key={profile.handle}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-sans text-sm text-ocean hover:text-navy transition-colors"
                  >
                    <Instagram className="w-4 h-4 shrink-0" />
                    @{profile.handle}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Events */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl font-bold text-navy text-center mb-10">
              {t('events.title')}
            </h3>
            <EventsList />
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? (i + GALLERY_COUNT - 1) % GALLERY_COUNT : null) }}
              className="absolute left-4 sm:left-6 text-white p-2.5 rounded-full bg-white/10 hover:bg-white/25 transition-colors"
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>


            <button
              onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? (i + 1) % GALLERY_COUNT : null) }}
              className="absolute right-4 sm:right-6 text-white p-2.5 rounded-full bg-white/10 hover:bg-white/25 transition-colors"
              aria-label="Nächstes Bild"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/25 transition-colors"
              aria-label="Schließen"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="absolute bottom-5 font-sans text-white/50 text-sm tabular-nums">
              {lightboxIndex + 1} / {GALLERY_COUNT}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
