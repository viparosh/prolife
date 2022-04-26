import React from 'react'
import Link from 'next/link'
import moment from 'moment'

const AppointmentCard = ({ schedules, setSelected }) => {
  return (
    <div className="sticky top-0 mx-4 flex w-full flex-col">
      <div className="w-full rounded-3xl bg-white p-4 drop-shadow-md">
        {schedules &&
          schedules.schedule.map((data, index) => (
            <div className="cursor-pointer p-4" key={index}>
              <div key={index} className="border-b-2 border-dashed">
                <p className="pb-4 text-xl font-semibold text-primary">
                  {data.time}
                </p>
                <div className="px-4 pb-6">
                  <p>
                    Name: {data.firstName}, {data.lastName}
                  </p>
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
