import React from 'react'
import Image from 'next/image'
import moment from 'moment'
import { EditSvg } from '../Svg'
const ViewPatient = ({ data, closeModal }) => {
  return (
    <div className="py-5">
      <p className="text-dark py-4 text-xl font-semibold">
        View Patient Record
      </p>
      <div className="flex w-full flex-col gap-4 py-5 xl:flex-row xl:items-start">
        <div className="shrink-0">
          <Image
            src={require('../assets/avatar.jpg')}
            alt={require('../assets/avatar.jpg')}
            className="rounded-md object-cover"
            height="120px"
            width="120px"
          />
        </div>
        <div className="flex w-full justify-between">
          <div className="leading-7">
            <div className="mb-2 xl:flex">
              <span className="font-semibold">Name:&nbsp;</span>
              <p className="capitalize">
                {data?.fname} {data?.lname}
              </p>
            </div>
            <div className="mb-2 xl:flex">
              <span className="font-semibold">ID:&nbsp;</span>
              <p>{data?._id}</p>
            </div>
            <div className="mb-2 xl:flex">
              <span className="font-semibold">Contact No#:&nbsp;</span>
              <p>(+63) {data?.contact}</p>
            </div>
            <div className="mb-2 xl:flex">
              <span className="font-semibold">Address:&nbsp;</span>
              <p>{data?.address}</p>
            </div>
          </div>
          {data?.fname && (
            <p>
              <button
                onClick={() => closeModal('update')}
                className="mx-2 ml-0 flex-shrink-0 rounded-md border bg-slate-100 px-2 py-2 "
              >
                <EditSvg />
              </button>
            </p>
          )}
        </div>
      </div>
      <div className="grid gap-10 xl:grid-cols-3">
        {/* first column  */}
        <div>
          <div className="mt-2 border-b-2 border-dashed border-slate-400 pb-4">
            <p className="py-4 text-lg font-semibold text-darkBlue">
              Patient Information
            </p>
            <p className="my-2">
              <span>Birth Date: </span>
              {data?.birthDate &&
                moment(data?.birthDate).format('MMM DD ,YYYY')}
            </p>
            <p className="my-2">
              <span>Birth Place: </span>
              {data?.birthPlace}
            </p>
            <p className="my-2 capitalize">
              <span>Religion: </span>
              {data?.religion}
            </p>
            <p className="my-2">
              <span>Nationality: </span>
              {data?.nationality}
            </p>
            <p className="my-2">
              <span>Occupation: </span>
              {data?.occupation}
            </p>
          </div>
          <div className="mt-2 border-b-2 border-dashed border-slate-400 pb-4">
            <p className="py-4 text-lg font-semibold text-darkBlue">
              Spouse Information
            </p>
            <p className="my-2 capitalize">
              <span>Name: </span>
              {data?.spouse_fname} {data?.spouse_lname}
            </p>
            <p className="my-2">
              <span>Birth Date: </span>
              {data?.spouse_birthDate &&
                moment(data?.spouse_birthDate).format('MMM DD ,YYYY')}
            </p>
            <p className="my-2 capitalize">
              <span>Religion: </span>
              {data?.spouse_religion}
            </p>
            <p className="my-2">
              <span>Age: </span>
              {data?.spouse_age}
            </p>
            <p className="my-2 capitalize">
              <span>Occupation: </span>
              {data?.spouse_occupation}
            </p>
          </div>
        </div>
        {/* second column  */}
        <div>
          <div className="mt-2 border-b-2 border-dashed border-slate-400 pb-4">
            <p className="py-4 text-lg font-semibold text-darkBlue">
              Obstetrical History
            </p>
            <p className="my-2">
              <span>No. of previous pregnancies: </span>
              {data?.no_previousPregnancies}
            </p>
            <p className="my-2">
              <span>Previous Caesarians: </span>
              {data?.previousCaesareans}
            </p>
            <p className="my-2">
              <span>3 Consecutive Miscarriages: </span>
              {data?.consecutiveMiscarriages}
            </p>
            <p className="my-2">
              <span>Postpartum Hemorrhage: </span>
              {data?.postpartumHemorrhage}
            </p>
          </div>
          <div className="mt-2 border-b-2 border-dashed border-slate-400 pb-4">
            <p className="py-4 text-lg font-semibold text-darkBlue">
              Emergency Details
            </p>
            <p className="my-2 capitalize">
              <span>Name: </span>
              {data?.emergencyFname} {data?.emergencyLname}
            </p>
            <p className="my-2">
              <span>Contact #: </span>
              {data?.emergencyContact}
            </p>
            <p className="my-2">
              <span>Address: </span>
              {data?.emergencyAddress}
            </p>
          </div>
        </div>
        {/* third column  */}
        <div>
          <div className="mt-2 border-b-2 border-dashed border-slate-400 pb-4">
            <p className="py-4 text-lg font-semibold text-darkBlue">
              Session History
            </p>
            {data?.sessionHistory?.map(({ date }, index) => (
              <div className="my-2" key={index}>
                <p>Session #{index + 1}</p>
                <p>{date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPatient
