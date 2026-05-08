import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Globe, Workflow, Video } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { WhatsAppButton } from './WhatsAppButton'

type DrawerId = 'website' | 'workflow' | 'social-media'

interface ServiceDrawerProps {
  id: DrawerId | null
  onClose: () => void
}

export function ServiceDrawer({ id, onClose }: ServiceDrawerProps) {
  const { t } = useTranslation()

  useEffect(() => {
    if (id) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [id])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const icons: Record<DrawerId, React.ReactNode> = {
    website: <Globe className="w-8 h-8 text-navy" />,
    workflow: <Workflow className="w-8 h-8 text-orange" />,
    'social-media': <Video className="w-8 h-8 text-ocean" />,
  }

  return (
    <AnimatePresence>
      {id && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl overflow-y-auto"
          >
            <div className="p-6 md:p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-surface transition-colors"
                aria-label={t('services.drawerClose')}
              >
                <X className="w-6 h-6 text-muted" />
              </button>

              <div className="pt-8">
                <div className="mb-4">{icons[id]}</div>

                {id === 'website' && <WebsiteContent t={t} />}
                {id === 'workflow' && <WorkflowContent t={t} />}
                {id === 'social-media' && <SocialContent t={t} />}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function WebsiteContent({ t }: { t: (key: string) => string }) {
  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl font-bold text-navy">{t('services.websiteDrawer.title')}</h2>
      <p className="font-sans text-text leading-relaxed">{t('services.websiteDrawer.body')}</p>
      <div className="bg-surface rounded-xl p-4 space-y-2">
        <p className="font-sans font-semibold text-navy text-sm uppercase tracking-wide">{t('services.websiteDrawer.process')}</p>
        <ul className="space-y-1">
          {['step1', 'step2', 'step3'].map(step => (
            <li key={step} className="flex items-start gap-2 font-sans text-text">
              <span className="text-orange mt-1">→</span>
              {t(`services.websiteDrawer.${step}`)}
            </li>
          ))}
        </ul>
      </div>
      <p className="font-sans text-muted italic">{t('services.websiteDrawer.pricing')}</p>
      <div className="space-y-3 pt-2">
        <WhatsAppButton label={t('services.websiteDrawer.ctaLabel')} className="w-full" />
        <a
          href="mailto:nils@flowstate.foundation"
          className="block text-center font-sans text-sm text-ocean hover:underline"
        >
          nils@flowstate.foundation
        </a>
      </div>
    </div>
  )
}

function WorkflowContent({ t }: { t: (key: string) => string }) {
  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl font-bold text-navy">{t('services.workflowDrawer.title')}</h2>
      <p className="font-sans text-text leading-relaxed">{t('services.workflowDrawer.body')}</p>
      <p className="font-sans text-text leading-relaxed">{t('services.workflowDrawer.body2')}</p>
      <span className="inline-block bg-orange/10 text-orange font-sans font-semibold px-4 py-1.5 rounded-full text-sm">
        {t('services.workflowDrawer.comingSoon')}
      </span>
      <div className="pt-2">
        <WhatsAppButton label={t('services.workflowDrawer.ctaLabel')} className="w-full" />
      </div>
    </div>
  )
}

function SocialContent({ t }: { t: (key: string) => string }) {
  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl font-bold text-navy">{t('services.socialDrawer.title')}</h2>
      <div className="bg-surface rounded-xl p-4 space-y-2">
        <p className="font-sans font-semibold text-navy text-sm uppercase tracking-wide">{t('services.socialDrawer.cutOnly')}</p>
        <p className="font-sans text-text">{t('services.socialDrawer.cut5')}</p>
        <p className="font-sans text-text">{t('services.socialDrawer.cut10')}</p>
      </div>
      <div className="bg-surface rounded-xl p-4 space-y-2">
        <p className="font-sans font-semibold text-navy text-sm uppercase tracking-wide">{t('services.socialDrawer.full')}</p>
        <p className="font-sans text-text">{t('services.socialDrawer.full5')}</p>
        <p className="font-sans text-text">{t('services.socialDrawer.full10')}</p>
      </div>
      <p className="font-sans text-ocean font-semibold">{t('services.socialDrawer.promise')}</p>
      <p className="font-sans text-muted text-sm">{t('services.socialDrawer.free')}</p>
      <div className="pt-2">
        <WhatsAppButton label={t('services.socialDrawer.ctaLabel')} className="w-full" />
      </div>
    </div>
  )
}
