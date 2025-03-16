
import { useRef, useState } from 'react';
import './Home.scope.scss'
import { Title } from './Title';
import ImgOne from '/src/assets/images/img-one.png'
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const videoRef:any = useRef(null)
  const navigate = useNavigate()
  const playVideoHandle = () => {
    setIsPlay(true)
    
    setTimeout(()=>{
      console.log(videoRef)
      videoRef.current.play()
    },10)
  }
  return <div className="home">
    <div className="home-top">
      <div className="top-box">
        {/* <img src="/src/assets/tke.png" alt="" className="left-icon" /> */}
        <div className="left-icon"></div>
        <div className="right-icon">
          <img src="/src/assets/play-dis.png" alt="" className="icon" />
        </div>
      </div>
      <div className="top-text">

      </div>
    </div>

    <div className="home-box">
      <div className="home-one ">
          <Title text='进入厂区前准备'></Title>
          <div className="home-one-text">
            <p className='one-text'>请提前与蒂升工作人员取得联系
            </p>
            <p className='one-text'>
              并在其陪同下完成入场准备
            </p>
          </div>
          <div className="home-one-imgs">
            <img src={ImgOne} className="one-left-img" />
            <div className="right-boxs">
              <img src="/src/assets/images/imgtwo.png" className="one-right-img" />
              <img src="/src/assets/images/img-3.png" className="two-right-img" />
            </div>
          </div>
      </div>

      <div className="home-two">
        <Title text='参观前的个人防护'></Title>
        <div className="home-one-text">
            <p className='one-text'>进入生产区域参观前
            </p>
            <p className='one-text'>
            请佩戴好个人防护用品
            </p>
          </div>

        <div className="two-box">
          <div className="two-box-left">
            <div className='item'>
                <img src="/src/assets/images/img-6.png" alt="" className='item-img' />
                <div className='item-text'>
                  护目镜
                </div>
            </div>
            <div className='item'>
                <img src="/src/assets/images/img-7.png" alt="" className='item-img' />
                <div className='item-text'>
                  耳塞
                </div>
            </div>
            <div className='item'>
                <img src="/src/assets/images/img-4.png" alt="" className='item-img' />
                <div className='item-text'>
                  安全鞋
                </div>
            </div>
            <div className='item'>
                <img src="/src/assets/images/img-5.png" alt="" className='item-img' />
                <div className='item-text'>
                  安全帽
                </div>
            </div>
          </div>
          <div className="two-right-img">
              <img src="/src/assets/images/img-9.png" alt="" />
          </div>
        </div>
      </div>

      <div className="home-three">
        <Title text='TKE中国区工厂参观安全指引'></Title>
        <div className="videx-box">
            {
              isPlay &&<video controls ref={videoRef} className='video' src="/src/assets/video/video.mp4" ></video>
            }
            {!isPlay && <img src="/src/assets/images/img-10.png" alt="" className='poster'  />}
           { !isPlay &&  <img src="/src/assets/images/play.png" alt="" className='play' onClick={playVideoHandle} />}
        </div>
        <div className="comment-box">
           <div className="box-one"></div>
           <div className="box-two">
           如有疑问，请随时向陪同工作人员寻求帮助
           </div>
           <img src="/src/assets/images/img-8.png" alt="" className='people'  />
        </div>
      </div>

      <div className="home-four">
        <Title text='风险提示'></Title>
        <img src="/src/assets/images/img-12.png" alt="" className='safe'  />
        <div className="four-box">
          防止滑倒和绊倒、防止被物体撞击或挤压、防止被车辆撞击、防止触电、防止吊物风险
        </div>
      </div>

      <div className="complete-btn" onClick={()=>navigate('/welcome')}  >
          点击完成
        </div>
    </div>
  </div>
};


export default HomePage
 