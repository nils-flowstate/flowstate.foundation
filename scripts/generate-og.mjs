import { createCanvas, loadImage } from 'canvas'
import { writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function generateOGImage() {
  const canvas = createCanvas(1200, 630)
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createLinearGradient(0, 0, 1200, 630)
  gradient.addColorStop(0, '#0B1E38')
  gradient.addColorStop(1, '#1A3C6E')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 1200, 630)

  const glow = ctx.createRadialGradient(600, 240, 0, 600, 240, 180)
  glow.addColorStop(0, 'rgba(61, 170, 69, 0.25)')
  glow.addColorStop(1, 'rgba(61, 170, 69, 0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, 1200, 630)

  const logoPath = path.join(__dirname, '../public/assets/logo.webp')
  if (existsSync(logoPath)) {
    try {
      const logo = await loadImage(logoPath)
      const logoH = 160
      const logoW = (logo.width / logo.height) * logoH
      ctx.drawImage(logo, (1200 - logoW) / 2, 80, logoW, logoH)
    } catch {
      console.warn('Could not load logo, skipping')
    }
  }

  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 40px serif'
  ctx.textAlign = 'center'
  ctx.fillText('Turn Your Love Into a Passion', 600, 330)

  ctx.fillStyle = '#F07020'
  ctx.font = 'bold 44px serif'
  ctx.fillText('and Give it a solid digital Foundation', 600, 390)

  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.font = '26px sans-serif'
  ctx.fillText('flowstate.foundation', 600, 480)

  const lineGrad = ctx.createLinearGradient(100, 0, 1100, 0)
  lineGrad.addColorStop(0, '#2E6FBF')
  lineGrad.addColorStop(0.5, '#F07020')
  lineGrad.addColorStop(1, '#3DAA45')
  ctx.strokeStyle = lineGrad
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(100, 555)
  ctx.lineTo(1100, 555)
  ctx.stroke()

  const outPath = path.join(__dirname, '../public/assets/og-image.png')
  writeFileSync(outPath, canvas.toBuffer('image/png'))
  console.log('✅ og-image.png generated (1200×630)')
}

generateOGImage().catch(console.error)
