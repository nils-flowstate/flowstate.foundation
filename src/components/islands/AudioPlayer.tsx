import { useRef, useState, type ChangeEvent } from 'react'
import { Play, Pause } from 'lucide-react'

interface AudioPlayerProps {
  src: string
}

function formatTime(s: number) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) audioRef.current.pause()
    else void audioRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    if (audioRef.current) audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-3 mb-5">
        <button
          type="button"
          onClick={togglePlay}
          className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white shrink-0 hover:opacity-80 transition-opacity"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          aria-label="Position"
          className="flex-1 h-1.5 accent-navy cursor-pointer"
        />
        <span className="font-sans text-xs text-muted tabular-nums shrink-0 w-20 text-right">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </>
  )
}
