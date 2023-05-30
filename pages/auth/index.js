import React, { useState, useRef } from 'react'
import NoLayout from '../../components/NoLayout'
import { useRouter } from 'next/router'
import { login } from '../../services/user.services'
import { uploadLog } from '../../services/log.services'
import moment from 'moment'
import NeedAccount from '../../components/CustomModal/NeedAccount'


const Login = () => {
  const [error, setError] = useState()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const router = useRouter()

  const [needModal,setNeedModal] = useState(false)
  const [showPassword,setShowPassword] = useState(false)

  const submitHandler = async () => {

    const credentials = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    }

    const result = await login(credentials)

    if (result.data && result.data.role != "patient") {
      
      await uploadLog(
        { 
          username_FK: usernameRef.current.value,
          content: `${result.data.name} (@${usernameRef.current.value}) has logged in`,
          category:"Staff - Login",
          role:result.data.role,
          date:moment(Date.now()).format("MMMM DD, YYYY"),
          time:moment(Date.now()).format("h:mm a")
        }
      )

      router.push(`/${result.data.role}`)

      setError('')
    } else {
      setError('Login failed, credentials are incorrect')
    }
  }

  return (
    <NoLayout>
      <div className="flex h-full w-full items-center justify-center">
        {needModal ? <NeedAccount setModal={setNeedModal}/> : <></>}
        <div className="md:flex p-7 flex-col h-full w-[70rem]">
          <p className="lg:block hidden font-semibold text-sm text-gray-700">
            Blessed Hope Maternity and Lying-in Clinic  | Information System
          </p>
          <div className="md:mt-[6rem] mt-[8rem] w-full lg:p-12 p-5  lg:flex-shrink flex flex-col gap-4 rounded-md">
            <p className="text-4xl font-bold text-[#625B7D]">
              Log in to your <br/>ProLife+ account
            </p>
            <p className="my-2 text-sm text-gray-600">Make sure that your credentials are correct, don’t forget to smile while working ;-)</p>
            {error && <p className="w-full font-semibold text-sm py-1 text-red-600">{error}</p>}
            <input
              ref={usernameRef}
              className="mt-2 block w-full rounded-md border border-inputBorder px-3 py-3"
              type="text"
              placeholder="Username"
            />
            <div className="flex mt-1 w-full rounded-md border border-slate-300">
              <input
                className="rounded-md w-full px-3 py-3"
                type={showPassword ? "text" : "password"}
                ref={passwordRef}
                placeholder="Password"
              />
              <button onClick={() => {
                setShowPassword(!showPassword)
              }} className="hover:bg-gray-400 hover:border-gray-400 text-sm border-2 border-gray-700 bg-gray-700 text-white px-2 w-16">
                Show
              </button>
            </div>
            <div className="flex flex-col gap-2 lg:flex-row">
              <button onClick={() => submitHandler()} className="w-full cursor-pointer text-sm rounded-full bg-[#8D5A63] py-3  px-4 text-white">
                Sign in
              </button>
              <button onClick={() => setNeedModal(true)} className="w-full cursor-pointer rounded-full text-sm bg-[#0F1815] py-3  px-4 text-white">
                Need an account ?
              </button>
            </div>
          </div>
        </div>
        <div className="lg:flex flex-shrink w-full px-20 py-7 hidden flex-col h-screen bg-[#625B7D]">
          <div className="flex justify-end flex-row">
            <p className="text-white font-semibold text-lg">ProLife+</p>
          </div>
          <p className="mt-28 text-white text-6xl font-extrabold">We value the life</p>
          <p className="mt-5 text-white text-6xl font-extrabold">very important</p>
          <hr className="mt-9"></hr>
          <div className="w-full flex justify-center items-center">
           <img
            className="hidden 2xl:block h-auto w-[33rem] my-[1rem]"
            src="https://firebasestorage.googleapis.com/v0/b/mtathos-a572c.appspot.com/o/utilityImages%2FPAPALIT%20KULAY%20NI%20ERNEST.png?alt=media&token=55a40833-3603-42c0-96cd-1f6dc8bd90af"
            /> 
          </div>
          <p className="lg:mt-2 md:block hidden text-white text-sm">
            ProLife+ digitalizes the process of BHLMC and at the same time , securing their data.
          </p>
        </div>
      </div>
    </NoLayout>
  )
}

export default Login
