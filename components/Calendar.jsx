import React, { useState } from 'react'
import moment from 'moment'
const daysRange = (days) => {
  // 1 to 10
  const start = 1
  const end = days
  const range = [...Array(end - start + 1).keys()].map((x) => x + start)
  return range
}
const Calendar = ({time, date}) => {
  const weeks = [7, 14, 21, 28]
  const [day, setDay] = useState(null)
  const updateDay = (selectedDay) => {
    const newDay = selectedDay < 10 ?  `0${selectedDay}` : selectedDay
    date.current = `${moment().format("YYYY-MM")}-${newDay}`
    setDay(day)
  }
  const timeRange = ["9am - 10am","10am - 11am","11am - 12pm","1pm - 2pm","2pm - 3pm","3pm - 4pm","4pm - 5pm","5pm - 6pm"]
  const days = daysRange(moment().daysInMonth())
  return (
    <>
      <div className="mt-4 mr-4 w-full">
        <label htmlFor="fname" className="text-secondaryText">
          Time
        </label>
        <select 
          ref={time}
          className="mt-2 block w-full rounded-md border border-inputBorder px-3 py-2"
          >
            <option selected disabled>-- Select Time --</option>
          {timeRange.map((item,index)=> (
            <option value={item} key={index}>{item}</option>
          ))}
          </select>
      </div>
      <div className="mt-4 mr-4 w-full">
        <label htmlFor="fname" className="text-secondaryText">
          Color Indicators
        </label>
      </div>
      <div className="mt-2 grid grid-cols-2">
        <div className="flex items-center">
          <span className="mr-2 block h-3 w-4 bg-customRed drop-shadow-md"></span>
          <p className="text-secondaryText">Full</p>
        </div>
        <div className="mx-4 flex items-center">
          <span className="mr-2 block h-3 w-4 bg-white drop-shadow-md"></span>
          <p className="text-secondaryText">Available</p>
        </div>
        <div className="flex items-center">
          <span className="mr-2 block h-3 w-4 bg-customOrange drop-shadow-md"></span>
          <p className="text-secondaryText">No Service</p>
        </div>
      </div>
      <div className="flex items-center justify-between py-4">
        <p className="text-lg font-semibold">April</p>
        <p className="text-lg font-semibold">2022</p>
      </div>
      <div className="grid grid-cols-7">
        {days.map((day) => (
          <button
            key={day}
            className="inline-block cursor-pointer p-2 text-center text-secondaryText"
            onClick={() => {updateDay(day);}}
          >
            {day}
          </button>
        ))}
      </div>
    </>
  )
}

export default Calendar
