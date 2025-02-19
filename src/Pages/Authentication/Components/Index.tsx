import React, { useState } from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'
import SignUp1Step from './SignUp1Step'
import SignUp2Step from './SignUp2Step'
import ForgotPassword from './ForgotPassword'
import { UserRegister } from '../../../Utils/Interface/register.interface'
import { UserLogin } from '../../../Utils/Interface/login.interface'
import BusinessSignUp1Step from './BusinessSignUp1Step'

const Index = ({ authenticationModal, setAuthenticationModal }: any) => {


  const [userRegisterData, setUserRegisterData] = useState<UserRegister>({
    email: "",
    role: "",
    password: "",
    firstname: "",
    lastname: "",
    dialCode: {
      code: "",
      dial_code: "",
      country: ""
    },
    businessName: "",
    businessAddress: "",
    city: "",
    postcode: "",
    country: "",
    businessEmailNote: "",
    businessEmailVerify: "",
    phone: "",
    referralCode: "",
    opted: false
  })

  const [userLoginData, setUserLoginData] = useState<UserLogin>({
    emailOrUsername: "",
    password: "",
  })

  return (
    <div>
      <SignUp setUserRegisterData={setUserRegisterData} userRegisterData={userRegisterData} authenticationModal={authenticationModal} setAuthenticationModal={setAuthenticationModal} />
      <SignIn setUserLoginData={setUserLoginData} userLoginData={userLoginData} authenticationModal={authenticationModal} setAuthenticationModal={setAuthenticationModal} />
      <SignUp1Step setUserRegisterData={setUserRegisterData} userRegisterData={userRegisterData} authenticationModal={authenticationModal} setAuthenticationModal={setAuthenticationModal} />
      <BusinessSignUp1Step setUserRegisterData={setUserRegisterData} userRegisterData={userRegisterData} authenticationModal={authenticationModal} setAuthenticationModal={setAuthenticationModal} />
      <SignUp2Step userLoginData={userLoginData} setUserRegisterData={setUserRegisterData} userRegisterData={userRegisterData} authenticationModal={authenticationModal} setAuthenticationModal={setAuthenticationModal} />
      <ForgotPassword authenticationModal={authenticationModal} setAuthenticationModal={setAuthenticationModal} />
    </div>
  )
}

export default Index