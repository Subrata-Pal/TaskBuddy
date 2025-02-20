import React from 'react'
import mobile_bg from '../assets/mobile_bg_onboard.png'
import logo from '../assets/logo.png'
import google from '../assets/google.png'
import {signInWithPopup} from 'firebase/auth'
import {auth, googleAuthProvider} from '../firebase'
import {useNavigate} from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();

  async function handleSignInWithGoogle(){
    try{
        const result = await signInWithPopup(auth, googleAuthProvider);
        localStorage.setItem("token", result.user.accessToken);
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/')
    }
    catch(err)
    {
      console.log(err);
    }
  }
  return (
    <div>
        <div className='h-screen w-full'>
              <img className='w-full' src={mobile_bg} alt="sss" />
        </div>

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-auto w-full'>

            <div className='flex flex-col items-center w-[85%] mx-auto'>
              <div><img src={logo} alt="" /></div>
              <div className='text-center text-xs'>Streamline your workflow and track progress effortlessly with our all-in-one task management app</div>
              <div onClick={() => handleSignInWithGoogle()} className='flex items-center justify-center bg-[#292929] text-white px-6 py-2 rounded-xl gap-2 mt-6'>
                  <div><img src={google} alt="" /></div>
                  <div>Continue with Google</div>
              </div>
            </div>

        </div>
    </div>
  )
}

export default Login