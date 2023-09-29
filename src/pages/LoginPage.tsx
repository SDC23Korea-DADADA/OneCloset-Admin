import style from '../style/login.module.css';

const LoginPage = () => {

  const googleLogin = () => {
    window.location.href = import.meta.env.VITE_GOOGLE_LOGIN;
  }

  return(
    <div className={style.bg}>
      <video muted autoPlay loop>
        <source src="https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/bg.mp4" type="video/mp4"></source>
      </video>
      <div className={style.text}>
        <img src='https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/google_login.png' className={style.login} onClick={() => { googleLogin() }}></img>
      </div>
    </div>
  )
}


export default LoginPage;