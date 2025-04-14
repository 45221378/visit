
import LangAudio from '/src/assets/video/lang.mp3'
import './index.scss'
import { useGlobalContext } from '/src/context/globalContext'
const MyAudio = ()=>{
  const {audioRef} = useGlobalContext()
  return (
    <div className='myaudio'>
      <audio src={LangAudio} ref={audioRef} >
        
      </audio>
    </div>
  )
}

export default MyAudio