import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { track } from '../../lib/analytics'

type Variant = 'primary' | 'outline' | 'ghost'

interface WhatsAppButtonProps {
  label?: string
  variant?: Variant
  className?: string
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-green text-white hover:bg-green/90',
  outline: 'border-2 border-green text-green hover:bg-green/10',
  ghost: 'text-green hover:bg-green/10',
}

export function WhatsAppButton({ label, variant = 'primary', className = '' }: WhatsAppButtonProps) {
  const { t } = useTranslation()
  const displayLabel = label || t('whatsapp.defaultLabel')

  const handleClick = () => {
    track('cta_click', { element: 'whatsapp_button' })
    window.open(import.meta.env.VITE_WA_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.button
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-sans font-semibold transition-colors ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <MessageCircle className="w-5 h-5" />
      {displayLabel}
    </motion.button>
  )
}
