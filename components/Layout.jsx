import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Head from 'next/head'
import { BellSvg, MenuSvg } from './Svg'

const Layout = ({ children, title }) => {
  const [sidebarModal, setSidebarModal] = useState(false)
  const [notifModal, setNotifModal] = useState(false)
  const notifications = [
    'Carrot Negrete Scheule for April 08, 2022 have been confirmed',
    'Oreo Negrete Scheule for April 08, 2022 have been confirmed',
  ]
  return (
    <div className="flex">
      <Head>
        <title>Prolife +</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap"
        />
      </Head>
      <Sidebar active={title} modal={sidebarModal} setModal={setSidebarModal} />
      <div className="w-full px-5 md:px-10">
        <div className="sticky top-0 z-10  flex items-center justify-between bg-white py-5 md:py-10 md:pb-5">
          <div className="flex">
            <span
              className="cursor-pointer md:hidden"
              onClick={() => setSidebarModal(!sidebarModal)}
            >
              <MenuSvg />
            </span>
            <h3 className="px-4 text-xl font-semibold text-secondaryText">
              {title}
            </h3>
          </div>
          <div className="relative">
            <button
              className="cursor-pointer"
              onClick={() => setNotifModal(!notifModal)}
            >
              <BellSvg />
            </button>
            {notifModal && (
              <div className="absolute right-0 top-10 w-96 max-w-xs rounded-lg border bg-white p-5 drop-shadow-md md:max-w-none">
                <p className="p-2 font-semibold text-secondaryText">
                  Notification's
                </p>
                <ul>
                  {notifications &&
                    notifications.map((item, index) => (
                      <li className="cursor-pointer p-2" key={index}>
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="px-0 md:px-4">{children}</div>
      </div>
    </div>
  )
}

export default Layout
