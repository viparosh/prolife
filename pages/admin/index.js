import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AppointmentCard from '../../components/AppointmentCard'
function Appointment() {
  // const { schedules, monthYear } = appointment
  const data = {
    monthYear: 'April-2022',
    schedules: [
      {
        day: '04',
        schedule: [
          {
            firstName: 'Oreo',
            lastName: 'Negrete',
            contact: 9564638238,
            address: 'asd',
            concern: 'asd',
            time: '1pm - 2pm',
            date: '2022-04-18T00:00:00.000Z',
            monthYear: 'April-2022',
            status: 'pending',
          },
          {
            firstName: 'Carrot',
            lastName: 'Negrete',
            contact: 9564638238,
            address: 'asd',
            concern: 'asd',
            time: '1pm - 2pm',
            date: '2022-04-18T00:00:00.000Z',
            monthYear: 'April-2022',
            status: 'pending',
          },
        ],
      },
      {
        day: '18',
        schedule: [
          {
            firstName: 'Huba',
            lastName: 'Negrete',
            contact: 9564638238,
            address: 'asd',
            concern: 'asd',
            time: '1pm - 2pm',
            date: '2022-04-04T00:00:00.000Z',
            monthYear: 'April-2022',
            status: 'pending',
          },
        ],
      },
      {
        day: '26',
        schedule: [
          {
            firstName: 'Oreo',
            lastName: 'Negrete',
            contact: 9564638238,
            address: 'asd',
            concern: 'asd',
            time: '1pm - 2pm',
            date: '2022-04-18T00:00:00.000Z',
            monthYear: 'April-2022',
            status: 'pending',
          },
          {
            firstName: 'Carrot',
            lastName: 'Negrete',
            contact: 9564638238,
            address: 'asd',
            concern: 'asd',
            time: '1pm - 2pm',
            date: '2022-04-18T00:00:00.000Z',
            monthYear: 'April-2022',
            status: 'pending',
          },
        ],
      },
      {
        day: '27',
        schedule: [
          {
            firstName: 'Oreo',
            lastName: 'Negrete',
            contact: 9564638238,
            address: 'asd',
            concern: 'asd',
            time: '1pm - 2pm',
            date: '2022-04-18T00:00:00.000Z',
            monthYear: 'April-2022',
            status: 'pending',
          },
          {
            firstName: 'Carrot',
            lastName: 'Negrete',
            contact: 9564638238,
            address: 'asd',
            concern: 'asd',
            time: '1pm - 2pm',
            date: '2022-04-18T00:00:00.000Z',
            monthYear: 'April-2022',
            status: 'pending',
          },
        ],
      },
      {
        day: '29',
        schedule: [
          {
            firstName: 'Oreo',
            lastName: 'Negrete',
            contact: 9564638238,
            address: 'asd',
            concern: 'asd',
            time: '1pm - 2pm',
            date: '2022-04-18T00:00:00.000Z',
            monthYear: 'April-2022',
            status: 'pending',
          },
          {
            firstName: 'Carrot',
            lastName: 'Negrete',
            contact: 9564638238,
            address: 'asd',
            concern: 'asd',
            time: '1pm - 2pm',
            date: '2022-04-18T00:00:00.000Z',
            monthYear: 'April-2022',
            status: 'pending',
          },
        ],
      },
      {
        day: '30',
        schedule: [
          {
            firstName: 'Oreo',
            lastName: 'Negrete',
            contact: 9564638238,
            address: 'asd',
            concern: 'asd',
            time: '1pm - 2pm',
            date: '2022-04-18T00:00:00.000Z',
            monthYear: 'April-2022',
            status: 'pending',
          },
          {
            firstName: 'Carrot',
            lastName: 'Negrete',
            contact: 9564638238,
            address: 'asd',
            concern: 'asd',
            time: '1pm - 2pm',
            date: '2022-04-18T00:00:00.000Z',
            monthYear: 'April-2022',
            status: 'pending',
          },
        ],
      },
    ],
  }
  const [selectedData, setSelectedData] = useState(data.schedules[0])
  const currentMonth = data.monthYear.split('-')[0]
  const currentYear = data.monthYear.split('-')[1]
  return (
    <Layout title="Appointment">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="p-2 text-2xl font-semibold text-primary">
            {currentMonth}
          </p>
          <p className="p-2 text-xl font-semibold text-secondaryText">
            {currentYear}
          </p>
        </div>
        <div className="flex">
          <div>
            {data.schedules.map((item, index) => (
              <p
                className={`mb-4 flex h-20 w-20 cursor-pointer flex-col items-center rounded-3xl ${
                  item.day == selectedData.day
                    ? 'bg-primary text-white'
                    : 'bg-lightGray text-secondaryText'
                } p-4 text-2xl `}
                onClick={() => setSelectedData(item)}
                key={index}
              >
                <span className="text-sm">Tue</span>
                {item.day}
              </p>
            ))}
          </div>
          <AppointmentCard
            schedules={selectedData}
            setSelected={setSelectedData}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Appointment

// Appointment.getInitialProps = async () => {
//   const res = await fetch('http://localhost:3000/api/schedule')
//   const { data } = await res.json()
//   console.log(data)
//   return { appointment: data }
// }
