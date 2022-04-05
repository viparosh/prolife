import React from 'react'
import Link from 'next/link'
import moment from 'moment'

const AppointmentCard = ({schedules,setSelected}) => {
  return (
    <div className='mx-4 flex flex-col w-full sticky top-0'>
        <div className='p-4 rounded-3xl drop-shadow-md w-full bg-white'>
        {schedules &&
          schedules.schedule.map((data, index) => (
           <div className='p-4 cursor-pointer'>
            <div key={index} className="border-b-2 border-dashed">
             <p className='pb-4 text-xl font-semibold text-primary'>{data.time}</p>
            <div className='px-4 pb-6'>
                  <p>Name: {data.firstName}, {data.lastName}</p>
                  <p>Contact No.#: (+63) {data.contact}</p>
              </div>
            </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default AppointmentCard