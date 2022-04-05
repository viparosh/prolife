import React, { useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import moment from 'moment'
import Calendar from '../components/Calendar'

function appointment() {
  const router = useRouter()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const contactRef = useRef()
  const codeRef = useRef()
  const addressRef = useRef()
  const concernRef = useRef()
  const timeRef = useRef()
  const dateRef = useRef()
  // const [selectedDate, setSelectedDate] = useState()
  const [errors, setErrors] = useState({})
  const [submitOnProgress, setSubmitOnProgress] = useState(false)
  const [success, setSuccess] = useState(false)
  const codeHandler = () => {
    console.log('sms')
  }
  const submitHandler = async () => {
    const newData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      contact: contactRef.current.value,
      code: codeRef.current.value,
      address: addressRef.current.value,
      concern: concernRef.current.value,
      time: timeRef.current.value,
      date: dateRef.current,
      monthYear: moment().format('MMMM-YYYY'),
    }
    console.log(newData)
    setSubmitOnProgress(true)
    setTimeout(async () => {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      })
      const { data, error } = await res.json()
      if (data) {
        setSuccess(true)
      } else {
        setErrors(error)
        setSubmitOnProgress(false)
      }
    }, 2000)
  }
  return (
    <div>
      <Head>
        <title>Appointment</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap"
        />
      </Head>
      {success ? (
        <div className="m-auto min-h-screen lg:flex lg:items-center lg:justify-center">
          <div className="rounded-md bg-white p-6 text-center drop-shadow-2xl lg:p-16">
            <h3 className="py-3 text-3xl font-semibold">
              Appointment Form Submitted!
            </h3>
            <p className="mb-5 text-secondaryText">
              Please expect a message from us and visit the link for
              confirmation.
            </p>
          </div>
        </div>
      ) : (
        <div className="m-auto min-h-screen lg:flex lg:items-center lg:justify-center">
          <div className="rounded-md bg-white p-6 drop-shadow-2xl lg:p-16">
            <h3 className="py-3 text-3xl font-semibold">Appointment Form</h3>
            <p className="mb-5 text-secondaryText">
              Note: Failure to reply in text as a confirmation will invalidate
              your appointment
            </p>
            <div className="grid gap-5 lg:auto-cols-max lg:grid-flow-col lg:gap-10">
              <div>
                <div className="flex flex-col lg:flex-row">
                  <div className="mr-4 mt-4 w-full">
                    <label htmlFor="fname" className="block text-secondaryText">
                      First Name
                    </label>
                    <span className="text-sm text-red-600">
                      {errors?.firstNameError}
                    </span>
                    <input
                      required
                      ref={firstNameRef}
                      type="text"
                      id="fname"
                      className="mt-2 block w-full rounded-md border border-inputBorder px-3 py-2"
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <label htmlFor="lname" className="block text-secondaryText">
                      Last Name
                    </label>
                    <span className="text-sm text-red-600">
                      {errors?.lastNameError}
                    </span>
                    <input
                      required
                      ref={lastNameRef}
                      type="text"
                      id="lname"
                      className="mt-2 block w-full rounded-md border border-inputBorder px-3 py-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row">
                  <div className="mt-4 w-full">
                    <label
                      htmlFor="contact"
                      className="block text-secondaryText"
                    >
                      Contact Number
                    </label>
                    <span className="text-sm text-red-600">
                      {errors?.contactError}
                    </span>
                    <div className="relative ">
                      <span className="absolute top-contactFix  left-4 block text-slate-400">
                        +63
                      </span>
                      <input
                        required
                        ref={contactRef}
                        type="number"
                        id="contact"
                        className="mt-2 w-full rounded-md border border-inputBorder px-3 py-2 pl-12"
                      />
                    </div>
                  </div>
                  <div className="mt-4 w-full lg:ml-4">
                    <label htmlFor="code" className="block text-secondaryText">
                      Verification Code
                    </label>
                    <span className="text-sm text-red-600">
                      {/* {errors?.contactError} */}
                    </span>
                    <div className="flex items-center">
                      <input
                        required
                        ref={codeRef}
                        type="number"
                        id="code"
                        className="mt-2 w-full rounded-md rounded-r-none border border-inputBorder px-3 py-2"
                      />
                      <button
                        onClick={codeHandler}
                        className="mt-2 rounded-md  rounded-l-none border border-primaryBtnBorder bg-primaryBtn px-4 py-2 text-white "
                      >
                        Request
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 w-full">
                  <label htmlFor="fname" className="block text-secondaryText">
                    Address
                  </label>
                  <span className="text-sm text-red-600">
                    {errors?.addressError}
                  </span>
                  <textarea
                    required
                    ref={addressRef}
                    type="text"
                    id="fname"
                    rows={3}
                    className="mt-2 block w-full rounded-md border border-inputBorder px-3 py-2"
                  />
                </div>
                <div className="mt-4 w-full">
                  <label htmlFor="fname" className="block text-secondaryText">
                    Concern
                  </label>
                  <span className="text-sm text-red-600">
                    {errors?.concernError}
                  </span>
                  <textarea
                    required
                    ref={concernRef}
                    type="text"
                    id="fname"
                    rows={3}
                    className="mt-2 block w-full rounded-md border border-inputBorder px-3 py-2"
                  />
                </div>
              </div>
              <div className=" border-inputBorder lg:border-l lg:pl-10">
                <Calendar time={timeRef} date={dateRef} />
              </div>
            </div>

            <div className="mt-10 flex items-center justify-end">
              {submitOnProgress ? (
                <p className="ml-4 rounded-md  bg-white px-4 py-2 text-secondaryText ">
                  &nbsp; Submitting...
                </p>
              ) : (
                <button
                  onClick={submitHandler}
                  className="ml-4 rounded-md  bg-primaryBtn px-4 py-2 text-white "
                >
                  Submit Form
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default appointment
