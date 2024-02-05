import React from 'react'
import './Login.css'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate()
    const GoToLogin=()=>{
        navigate('mainpage')
    }

  return (
    <div className='LoginMainCont'>
        <div className='LoginCont'>
            <div className='LoginHeaderCont'>
            <Icon icon="gg:profile"  color='white' className='LoginIcon'/>

            </div>
            <div className='LoginInputCont'>
                
                <input type='text' placeholder='Username'/>
                <input type='password' placeholder='password'/>
                <div className='LoginBtn' onClick={GoToLogin}>Login</div>

            </div>
            


        </div>
    </div>
  )
}

export default Login