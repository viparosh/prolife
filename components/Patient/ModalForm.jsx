import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { addNewPatient, updatePatient } from '../../services/patient.services'
import moment from 'moment'
const ModalForm = ({ mode, closeModal, data, setData }) => {
  const [errors, setErrors] = useState()
  const fnameRef = useRef()
  const lnameRef = useRef()
  const contactRef = useRef()
  const birthDateRef = useRef()
  const statusRef = useRef()
  const birthPlaceRef = useRef()
  const religionRef = useRef()
  const nationalityRef = useRef()
  const occupationRef = useRef()
  const addressRef = useRef()

  const spouse_fnameRef = useRef()
  const spouse_lnameRef = useRef()
  const spouse_birthDateRef = useRef()
  const spouse_religionRef = useRef()
  const spouse_occupationRef = useRef()

  const no_previousPregnanciesRef = useRef()
  const previousCaesareansRef = useRef()
  const consecutiveMiscarriagesRef = useRef()
  const postpartumHemorrhageRef = useRef()

  const emergencyFnameRef = useRef()
  const emergencyLnameRef = useRef()
  const emergencyContactRef = useRef()
  const emergencyAddressRef = useRef()

  const fieldText = (newError, label, id, ref, defaultValue, type = 'text') => {
    return (
      <div className="mt-4 w-full lg:mr-4">
        <span className="text-sm text-red-600">{newError}</span>
        <label htmlFor={id} className="block text-secondaryText">
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          defaultValue={defaultValue}
          id={id}
          className="mt-2 block w-full rounded-md border border-inputBorder px-3 py-2"
        />
      </div>
    )
  }
  const fieldSelect = (newError, label, id, ref, obj, defaultValue) => {
    return (
      <div className="mt-4 w-full lg:mr-4">
        <span className="text-sm text-red-600">{newError}</span>
        <label htmlFor={id} className="block text-secondaryText">
          {label}
        </label>
        <select
          ref={ref}
          defaultValue={defaultValue}
          id={id}
          className="mt-2 block w-full rounded-md border border-inputBorder px-3 py-2"
        >
          {obj.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
    )
  }
  const fieldTextarea = (newError, label, id, ref, defaultValue) => {
    return (
      <div className="mt-4 w-full lg:mr-4">
        <span className="text-sm text-red-600">{newError}</span>
        <label htmlFor={id} className="block text-secondaryText">
          {label}
        </label>
        <textarea
          ref={ref}
          id={id}
          defaultValue={defaultValue}
          className="mt-2 block w-full rounded-md border border-inputBorder px-3 py-2"
        />
      </div>
    )
  }
  const saveHandler = async () => {
    const newData = {
      fname: fnameRef.current?.value.toLowerCase(),
      lname: lnameRef.current?.value.toLowerCase(),
      contact: contactRef.current?.value,
      birthDate: birthDateRef.current?.value,
      birthPlace: birthPlaceRef.current?.value,
      religion: religionRef.current?.value,
      nationality: nationalityRef.current?.value,
      occupation: occupationRef.current?.value,
      address: addressRef.current?.value,
      spouse_fname: spouse_fnameRef.current?.value,
      spouse_lname: spouse_lnameRef.current?.value,
      spouse_birthDate: spouse_birthDateRef.current?.value,
      spouse_occupation: spouse_occupationRef.current?.value,
      spouse_religion: spouse_religionRef.current?.value,
      no_previousPregnancies: no_previousPregnanciesRef.current.value,
      previousCaesareans: previousCaesareansRef.current.value,
      consecutiveMiscarriages: consecutiveMiscarriagesRef.current.value,
      postpartumHemorrhage: postpartumHemorrhageRef.current.value,
      emergencyFname: emergencyFnameRef.current.value,
      emergencyLname: emergencyLnameRef.current.value,
      emergencyContact: emergencyContactRef.current.value,
      emergencyAddress: emergencyAddressRef.current.value,
    }
    if (data) {
      const res_update = await updatePatient(data._id, newData)
      if (res_update) {
        closeModal('')
        setData({ _id: data._id, ...newData })
      }
      setErrors(res_update.error)
    } else {
      const res_add = await addNewPatient(newData)
      if (res_add.success) {
        closeModal('')
      }
      setErrors(res_add.error)
    }
  }
  return (
    <div className="fixed top-0 left-0 z-30 flex h-screen w-screen items-center justify-center bg-black/50 bg-white">
      <div className="mx-4 max-h-patientModal overflow-auto rounded-md bg-white">
        <div className="sticky left-0 top-0 bg-white py-6 px-4">
          <p className="px-4 text-xl">
            {mode == 'add' ? 'Add new patient' : 'Update patient record'}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-3">
          <div className="p-4">
            <p>Personal Information</p>
            {fieldText(
              errors?.fnameErr,
              'First name:',
              'fname',
              fnameRef,
              data?.fname
            )}
            {fieldText(
              errors?.lnameErr,
              'Last name:',
              'lname',
              lnameRef,
              data?.lname
            )}
            {fieldText(
              errors?.contactErr,
              'Contact#: ',
              'contact',
              contactRef,
              data?.contact,
              'number'
            )}
            {fieldText(
              errors?.birthDateErr,
              'Birth Date: ',
              'birthdate',
              birthDateRef,
              data?.birthDate && moment(data?.birthDate).format('YYYY-MM-DD'),
              'date'
            )}
            {fieldText(
              errors?.birthPlaceErr,
              'Birth Place: ',
              'birthplace',
              birthPlaceRef,
              data?.birthPlace
            )}
            {fieldText(
              errors?.religionErr,
              'Religion: ',
              'religion',
              religionRef,
              data?.religion
            )}
            {fieldText(
              errors?.nationalityErr,
              'Nationality: ',
              'nationality',
              nationalityRef,
              data?.nationality
            )}
            {fieldText(
              errors?.occupationErr,
              'Occupation: ',
              'occupation',
              occupationRef,
              data?.occupation
            )}
            {fieldTextarea(
              errors?.addressErr,
              'Address: ',
              'address',
              addressRef,
              data?.address
            )}
          </div>

          <div className="p-4">
            <p>Spouse Information</p>
            {fieldText(
              errors?.spouse_fnameErr,
              'First name:',
              'spouse_fname',
              spouse_fnameRef,
              data?.spouse_fname
            )}
            {fieldText(
              errors?.spouse_lnameErr,
              'Last name:',
              'spouse_lname',
              spouse_lnameRef,
              data?.spouse_lname
            )}
            {fieldText(
              errors?.spouse_birthDateErr,
              'Birth Date: ',
              'spouse_birthdate',
              spouse_birthDateRef,
              data?.spouse_birthDate &&
                moment(data?.spouse_birthDate).format('YYYY-MM-DD'),

              'date'
            )}
            {fieldText(
              errors?.spouse_religionErr,
              'Religion: ',
              'spouse_religion',
              spouse_religionRef,
              data?.spouse_religion
            )}
            {fieldText(
              errors?.spouse_occupationErr,
              'Occupation: ',
              'spouse_occupation',
              spouse_occupationRef,
              data?.spouse_occupation
            )}
          </div>
          <div className="p-4">
            <p>Obstetrical History</p>
            {fieldText(
              errors?.no_previousPregnanciesErr,
              'No# of Previous Pregnancies:',
              'no_previousPregnancies',
              no_previousPregnanciesRef,
              data?.no_previousPregnancies,
              'number'
            )}
            {fieldText(
              errors?.previousCaesareansErr,
              'Previous Caesareans:',
              'previousCaesareans',
              previousCaesareansRef,
              data?.previousCaesareans,
              'number'
            )}
            {fieldSelect(
              errors?.consecutiveMiscarriagesErr,
              'Consecutive Miscarriages:',
              'consecutiveMiscarriages',
              consecutiveMiscarriagesRef,
              [
                { name: 'Yes', value: 'yes' },
                { name: 'No', value: 'no' },
              ],

              data?.consecutiveMiscarriages
            )}
            {fieldSelect(
              errors?.postpartumHemorrhageErr,
              'Postpartum Hemorrhage:',
              'postpartumHemorrhage',
              postpartumHemorrhageRef,
              [
                { name: 'Yes', value: 'yes' },
                { name: 'No', value: 'no' },
              ],
              data?.postpartumHemorrhage
            )}
            <p className="mt-10">Emergency Details</p>
            {fieldText(
              errors?.emergencyFnameErr,
              'First name:',
              'emergencyFname',
              emergencyFnameRef,
              data?.emergencyFname
            )}
            {fieldText(
              errors?.emergencyLnameErr,
              'Last name:',
              'emergencyLname',
              emergencyLnameRef,
              data?.emergencyLname
            )}
            {fieldText(
              errors?.emergencyContactErr,
              'Contact #:',
              'emergencyContact',
              emergencyContactRef,
              data?.emergencyContact,
              'number'
            )}
            {fieldTextarea(
              errors?.emergencyAddressErr,
              'Address:',
              'emergencyAddress',
              emergencyAddressRef,
              data?.emergencyAddress
            )}
          </div>
          <div className="col-span-1 row-span-1 px-4 py-4">
            <p className="pb-2 text-lg font-semibold text-gray-800 ">
              Upload Photo
            </p>
            <div className="my-2">
              <Image
                src={require('../assets/avatar.jpg')}
                className="m-auto  border-2 border-dashed px-2 py-2 "
                height="120px"
                width="120px"
              />
            </div>
            <input
              type="file"
              className="w-full rounded-lg border px-5 py-2 focus:border-blue-400 focus:outline-none"
            />
          </div>
        </div>
        <div className="sticky left-0 bottom-0 flex justify-end gap-4 bg-white py-6 px-4">
          <button
            onClick={() => closeModal('')}
            className="rounded-md bg-slate-100 px-4 py-3"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              saveHandler()
            }}
            className="rounded-md bg-primary px-4 py-3 text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalForm
