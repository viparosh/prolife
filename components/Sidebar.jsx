import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import {
  AppointmentSvg,
  BalanceSvg,
  SettingSvg,
  PatientSvg,
  LogoutSvg,
  CloseSvg,
  CalendarSvg,
} from './Svg'
const Sidebar = ({ active, modal, setModal }) => {
  const links = [
    {
      icon: <AppointmentSvg />,
      name: 'Appointment',
      link: '/admin',
    },
    {
      icon: <PatientSvg />,
      name: 'Patients',
      link: '/admin/patient',
    },
    {
      icon: <BalanceSvg />,
      name: 'Balances',
      link: '/admin/balance',
    },
    {
      icon: <SettingSvg />,
      name: 'Account Settings',
      link: '/admin/setting',
    },
    {
      icon: <CalendarSvg />,
      name: 'Calendar Manager',
      link: '/admin/calendar',
    },
  ]
  return (
    <div
      className={`${
        modal ? 'translate-x-0' : '-translate-x-full'
      } fixed top-0 z-20 h-screen min-w-full bg-darkBlue px-14 md:sticky md:block md:min-w-sideBar md:translate-x-0`}
    >
      <div className="flex items-center justify-between py-10">
        <span className="text-center text-2xl font-black text-white">
          ProLife +
        </span>
        <span
          onClick={() => setModal(!modal)}
          className="cursor-pointer text-center text-2xl font-black text-white md:hidden"
        >
          <CloseSvg />
        </span>
      </div>
      <div className="mb-7 flex items-center">
        <Image
          src={require('../components/assets/avatar.jpg')}
          className="rounded-md"
          height="60px"
          width="60px"
        />
        <div className="ml-4 text-white">
          <p className="text-lg">John Doe</p>
          <span className="text-slate-400">Mid Wife</span>
        </div>
      </div>
      <div>
        <ul>
          {links.map(({ icon, name, link }, index) => (
            <li
              key={index}
              className="cursor-pointer text-secondaryText hover:text-primary"
            >
              <Link href={link}>
                <div
                  className={`mb-2 flex items-center p-4 ${
                    active == name && 'bg-primary'
                  } rounded-lg`}
                >
                  <span className="mr-2">{icon}</span>
                  <p className=" text-slate-200">{name}</p>
                </div>
              </Link>
            </li>
          ))}
          <li className="mt-10 cursor-pointer text-secondaryText hover:text-primary">
            <div>
              <div className={`mb-2 flex items-center rounded-lg p-4`}>
                <span className="mr-2">{<LogoutSvg />}</span>
                <p className=" text-slate-200">Logout</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
