import React, { useRef, useState, useEffect } from 'react'
import Head from 'next/head'
import moment from 'moment'
import { Calendar } from '../components'
import { dateScheduleFilter } from '../services/calendar.services'
import {
  addAppointment,
  checkExpiration,
  checkVerificationCode,
  idChecker,
  updateSchedule,
} from '../services/appointment.services'

function appointment() {
  const mode = ['midwife', 'obgyn']
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const contactRef = useRef()
  const codeRef = useRef()
  const addressRef = useRef()
  const concernRef = useRef()
  const timeRef = useRef('none')
  const dateRef = useRef()
  const [dates, setDates] = useState([])
  const [consultation, setConsultation] = useState(mode[0])
  const [fetchData, setFetchData] = useState()
  const [errors, setErrors] = useState({})
  const [submitOnProgress, setSubmitOnProgress] = useState(false)
  const [success, setSuccess] = useState(false)
  const [timer, setTimer] = useState({ active: false, value: 0 })
  const mounted = useRef()
  const prevStateDates = useRef()
  const prevStateConsultation = useRef()
  const timeRange = useRef([])

  const codeHandler = async () => {
    if (
      contactRef.current.value.length != 10 ||
      contactRef.current.value[0] != 9
    ) {
      setErrors({ ...errors, contactError: 'Invalid mobile number' })
    } else {
      setErrors({ ...errors, contactError: '' })
      if (!timer.active) {
        const expiration = await checkExpiration(contactRef.current.value)
        if (expiration !== false) {
          console.log(expiration)
          setTimer({ active: true, value: expiration })
        }
      }
    }
  }

  const updateTime = () => {
    let index = timeRef.current?.value
    let reference = timeRange.current?.value

    let new_value = reference[index]
    new_value.status = false

    reference[index] = new_value
    let final_value = {}
    if (consultation == 'midwife') {
      final_value.midWife_schedule = reference
    } else {
      final_value.obgyn_schedule = reference
    }
    return final_value
  }

  useEffect(() => {
    if (timer.active) {
      setTimeout(async () => {
        if (timer.value != 0) {
          setTimer({ active: true, value: timer.value - 1 })
        } else {
          setTimer({ active: false, value: 0 })
        }
      }, 1000)
    }
    const load = async () => {
      // console.log('dates', dates)
      // console.log('prevDate', prevStateDates.current)
      if (
        dates != prevStateDates.current ||
        consultation != prevStateConsultation.current
      ) {
        const response = await dateScheduleFilter(dates)
        if (consultation == mode[0]) {
          timeRange.current.value = response[0]?.data?.midWife_schedule || []
        } else {
          timeRange.current.value = response[0]?.data?.obgyn_schedule || []
        }
        if (response[0]?.data !== null) {
          dateRef.current = response[0]?.data.date
        } else {
          dateRef.current = undefined
        }
        setFetchData(response)
      }
    }
    load()
    mounted.current = true
    prevStateDates.current = dates
    prevStateConsultation.current = consultation
  }, [timer, errors, dates, consultation])

  const submitHandler = async () => {
    let extraError = {}

    // verification code value
    const code = codeRef.current.value

    // gather all fields value
    const newData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      contact: contactRef.current.value,
      address: addressRef.current.value,
      concern: concernRef.current.value,
      time: timeRange.current.value
        ? timeRange.current.value[timeRef.current.value]
        : undefined,
      date: dateRef.current,
      consultation: consultation,
      monthYear: moment().format('MMMM-YYYY'),
    }

    // check verification code
    const code_result = await checkVerificationCode(newData.contact, code)

    // doing validation for contact and verification
    if (code.length == 0) {
      extraError.codeError = 'Please fill this field'
    } else if (!code_result) {
      extraError.codeError = 'Wrong Verification Code !'
    }
    if (newData.contact.length != 10 || newData.contact[0] != 9) {
      extraError.contactError = 'Invalid mobile number'
    }
    if (newData.time == undefined) {
      extraError.timeError = 'Please Input fields'
    }
    if (newData.date == undefined) {
      extraError.dateError = 'Please Input fields'
    }

    //check if error has no value ? save : display error
    const isEmpty = Object.keys(extraError).length === 0
    if (isEmpty) {
      setSubmitOnProgress(true)
      setTimeout(async () => {
        let time_result = false
        const time_checker = await dateScheduleFilter(dates)

        // validation if time is available or not
        if (consultation == mode[0]) {
          time_result = idChecker(
            time_checker[0].data.midWife_schedule,
            newData.time._id
          )
        } else {
          time_result = idChecker(
            time_checker[0].data.obgyn_schedule,
            newData.time._id
          )
        }
        if (time_result) {
          const add_response = await addAppointment(newData)
          console.log(add_response)
          if (add_response.data) {
            const update_response = await updateSchedule(
              fetchData[0].date,
              updateTime()
            )
            if (update_response) {
              setSuccess(true)
            } else {
              setSuccess(false)
            }
          } else {
            setErrors({ ...add_response.error })
          }
        } else {
          extraError.dateError = 'Please choose another date'
        }
        setSubmitOnProgress(false)
        setErrors(extraError)
      }, 2000)
    } else {
      setErrors(extraError)
    }
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
                <div className="flex flex-col items-end lg:flex-row">
                  <div className="mt-4 w-full lg:mr-4">
                    <span className="text-sm text-red-600">
                      {errors?.firstNameError}
                    </span>
                    <label htmlFor="fname" className="block text-secondaryText">
                      First Name
                    </label>
                    <input
                      required
                      ref={firstNameRef}
                      type="text"
                      id="fname"
                      className="mt-2 block w-full rounded-md border border-inputBorder px-3 py-2"
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <span className="text-sm text-red-600">
                      {errors?.lastNameError}
                    </span>
                    <label htmlFor="lname" className="block text-secondaryText">
                      Last Name
                    </label>
                    <input
                      required
                      ref={lastNameRef}
                      type="text"
                      id="lname"
                      className="mt-2 block w-full rounded-md border border-inputBorder px-3 py-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-end lg:flex-row">
                  <div className="mt-4 w-full">
                    <span className="text-sm text-red-600">
                      {errors?.contactError}
                    </span>
                    <label
                      htmlFor="contact"
                      className="block text-secondaryText"
                    >
                      Contact Number
                    </label>
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
                    <span className="text-sm text-red-600">
                      {errors?.codeError}
                    </span>
                    <label htmlFor="code" className="block text-secondaryText">
                      Verification Code
                    </label>
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
                        className="mt-2 min-w-requestBtn rounded-md  rounded-l-none border border-primaryBtnBorder bg-primaryBtn px-4 py-2 text-white "
                      >
                        {timer.active ? '[ ' + timer.value + "'s ]" : 'Request'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 w-full">
                  <span className="text-sm text-red-600">
                    {errors?.addressError}
                  </span>
                  <label htmlFor="address" className="block text-secondaryText">
                    Address
                  </label>
                  <textarea
                    required
                    ref={addressRef}
                    type="text"
                    id="address"
                    rows={3}
                    className="mt-2 block w-full rounded-md border border-inputBorder px-3 py-2"
                  />
                </div>
                <div className="mt-4 w-full">
                  <span className="text-sm text-red-600">
                    {errors?.concernError}
                  </span>
                  <label htmlFor="concern" className="block text-secondaryText">
                    Concern
                  </label>
                  <textarea
                    required
                    ref={concernRef}
                    type="text"
                    id="concern"
                    rows={3}
                    className="mt-2 block w-full rounded-md border border-inputBorder px-3 py-2"
                  />
                </div>
              </div>
              <div className=" border-inputBorder lg:border-l lg:pl-10">
                <div className="mb-4">
                  <label
                    htmlFor="consultation"
                    className="block text-secondaryText"
                  >
                    Consultation Type
                  </label>
                  <select
                    onChange={(e) => {
                      setConsultation(e.target.value)
                    }}
                    id="consultation"
                    className="mt-2 block w-full rounded-md border border-inputBorder bg-white px-3 py-2"
                  >
                    <option value={mode[0]}>MidWife</option>
                    <option value={mode[1]}>OBGYN</option>
                  </select>
                </div>
                <span className="text-sm text-red-600">
                  {errors?.dateError}
                </span>
                <label
                  htmlFor="fname"
                  className="mb-2 block text-secondaryText"
                >
                  Date
                </label>
                <Calendar setDates={setDates} dates={dates} />
                <div className="mt-4 mr-4 w-full">
                  <span className="text-sm text-red-600">
                    {errors?.timeError}
                  </span>
                  <label htmlFor="fname" className="block text-secondaryText">
                    Time
                  </label>
                  <select
                    defaultValue={timeRef.current.value}
                    ref={timeRef}
                    className="mt-2 block w-full rounded-md border border-inputBorder bg-white px-3 py-2"
                  >
                    <option value="none" disabled>
                      -- Select Time --
                    </option>
                    {timeRange.current.value?.map(
                      (item, index) =>
                        item.status && (
                          <option value={index} key={index}>
                            {moment(item.from).format('hh:mm A')} -{' '}
                            {moment(item.to).format('hh:mm A')}
                          </option>
                        )
                    )}
                  </select>
                </div>
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
