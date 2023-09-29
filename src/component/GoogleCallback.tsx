import axios from 'axios';
import style from '../style/login.module.css';
import { adminState } from '../atom/AdminAtom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userType } from '../type/cserType';


const GetAuthCodeAndSendToSpring = () => {

  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(adminState);
  user

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code')
    googleLogin(code)
  }, [])

  async function googleLogin(code:string | null) {
    const url = import.meta.env.VITE_SERVER + "/api/login/google";
    const infoUrl = import.meta.env.VITE_SERVER + "/api/user";
    const data = { 
      code: code,
      redirect: import.meta.env.VITE_CLIENT + "/google/callback", 
    }
    const config:any = { 'Content-Type': 'application/json' };
    await axios.post(url, data, config)
    .then((result) => {
      const accessToken = result.data.data.accessToken
      const configInfo = {
        headers: {
          'Authorization': "Bearer " + accessToken,
        }
      }
      axios.get(infoUrl, configInfo)
      .then((result) => {
        const info = result.data.data;
        const newUser:userType  = {
          userId: info.userId,
          email: info.email,
          nickname: info.nickname,
          accessToken: accessToken,
          profileImg: info.profileImg
        }
        setUser(newUser);
        navigate("/main");
      })
      .catch((err) => {
        console.log(err)
      })
      
    })
    .catch((err) => {
      if (err.response.status == 400) {
        alert(err.response.data);
      }
      navigate("/");
    })
  }

  return(
    <>
      <div className={style.bg}>
        <video muted autoPlay loop>
          <source src="https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/bg.mp4" type="video/mp4"></source>
        </video>
      </div>
    </>
  )
}

export default GetAuthCodeAndSendToSpring;