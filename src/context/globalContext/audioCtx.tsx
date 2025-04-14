import { useState, useCallback, useRef, useEffect } from 'react'

export default function useAudioCtx() {
  const audioRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState<Boolean>(false)

  const doPlayAudioToggle = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true)
      } else {
        audioRef.current.pause();
        setIsPlaying(false)
      }
    }
  }

  useEffect(()=>{
    if(audioRef.current){
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false)
      })
    }
  },[audioRef])

  return {
    audioRef,
    doPlayAudioToggle,
    isPlaying, 
    setIsPlaying
  }
}
