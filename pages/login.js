import React, { useState, useRef, useEffect } from 'react'
import NoLayout from '../components/NoLayout'
import { useRouter } from 'next/router'
import { uploadLog } from '../services/log.services'
import Link from 'next/link'
import moment from 'moment'
import { login } from '../services/user.services'

const Login = () => {
  const [error, setError] = useState()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const submitHandler = async () => {
    const credentials = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    }

    const result = await login(credentials)

    if (result.data && result.data.role == 'patient') {
      await uploadLog({
        username_FK: usernameRef.current.value,
        content: `${result.data.name} (${usernameRef.current.value}) has logged in`,
        category: 'Patient - Login',
        role: result.data.role,
        date: moment(Date.now()).format('MMMM DD, YYYY'),
        time: moment(Date.now()).format('h:mm a'),
      })

      router.push(`/patient/record`)
      setError('')
    } else {
      setError('Sorry , it seems that your credentials are incorrect.')
    }
  }

  return (
    <NoLayout>
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className='hidden w-2/3 min-h-screen bg-themeViolet items-center justify-center lg:flex'>
          <div className="flex gap-4 flex-col items-start justify-between p-16">
          <div className="flex w-full cursor-pointer flex-col">
            <p className="text-justify text-5xl text-white">
              Blessed Hope Maternity Lying-in Clinic
            </p>
            <p className="mt-4 indent-1 font-light text-white">
              461 Ilang-Ilang St Bancal, 3020 Meycauayan, Philippines.
            </p>
          </div>
          <div className="flex w-full  gap-4 flex-row items-center justify-center">
            <img
              className="w-[20rem] aspect-square"
              src={
                'https://firebasestorage.googleapis.com/v0/b/mtathos-a572c.appspot.com/o/utilityImages%2FhighlightA.png?alt=media&token=6ea15677-42cf-49ba-ae29-350d5386fa14'
              }
            />
            <div className="flex w-full flex-col items-center justify-center">
              <div className="flex w-full flex-col">
                <p className="my-6 font-semibold text-white ">Vision</p>
                <p className="text-sm text-justify indent-5 text-white">
                  To become one of the most reliable lying-in clinic in our
                  local area. We aim to help our patients have healthy and safe
                  pregnancies.
                </p>
              </div>
              <div className="flex w-full flex-col">
                <p className="my-6 font-semibold text-white ">Mission</p>
                <p className="text-sm text-justify indent-5 text-white">
                  At Blessed Hope Maternity Lying-in Clinic, our mission is to
                  provide fast, reliable and caring services to pregnant
                  patients and their babies.
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <p className="text-sm text-white">
              Email: blessedhopebancal@gmail.com
            </p>
            <p className="cursor-grab bg-gray-800 p-2 text-sm font-semibold text-white">
              Emergency Contact #: 0999161402
            </p>
          </div>
        </div>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center p-8 sm:p-16 lg:w-1/3">
          <div className="flex w-full flex-col gap-4">
            <p className="text-2xl font-semibold text-slate-600">
              Welcome to Patient Portal
            </p>
            {error && (
              <p className="w-full py-1 text-sm font-semibold text-red-600">
                {error}
              </p>
            )}
            <input
              ref={usernameRef}
              className="mt-2 block w-full rounded-md border border-inputBorder p-3"
              type="text"
              placeholder="Username (9XXXXXXXXX)"
            />
            <div className="mt-1 flex w-full border border-inputBorder">
              <input
                className="w-full rounded-md px-3 py-3"
                type={showPassword ? 'text' : 'password'}
                ref={passwordRef}
                placeholder="Password"
              />
              <button
                onClick={() => {
                  setShowPassword(!showPassword)
                }}
                className="w-16 bg-gray-700 px-2 text-sm text-white"
              >
                Show
              </button>
            </div>
            <button
              onClick={submitHandler}
              className="cursor-pointer rounded-md bg-primary p-3 text-sm text-white"
            >
              Login
            </button>
          </div>
          <div className="align my-3 flex w-full items-center">
            <div className="w-full border border-gray-300"></div>
            <p className="mx-3 text-sm">OR</p>
            <div className="w-full border border-gray-300"></div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <Link href="/appointment">
              <button className="w-full cursor-pointer rounded-md border border-gray-400 bg-white p-3 text-sm text-gray-900">
                Create Appointment
              </button>
            </Link>
            <Link href="/cancellation/">
              <button className="w-full cursor-pointer rounded-md border border-gray-400 bg-white p-3 text-sm text-gray-900">
                Cancel Appointment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </NoLayout>
  )
}

export default Login
