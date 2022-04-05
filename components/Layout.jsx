import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Head from 'next/head'
import { BellSvg, MenuSvg } from './Svg'

const Layout = ({children,title}) => {
  const [sidebarModal, setSidebarModal] = useState(false)
  const [notifModal, setNotifModal] = useState(false)
  const notifications = [
    "Carrot Negrete Scheule for April 08, 2022 have been confirmed",
    "Oreo Negrete Scheule for April 08, 2022 have been confirmed"
  ]
  return (
    <div className='flex'>
        <Head>
            <title>Prolife +</title>
            <link rel="icon" href="/favicon.ico" />
            <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap"
            />
        </Head>
        <Sidebar active={title} modal={sidebarModal} setModal={setSidebarModal}/>
        <div className='w-full md:px-10 px-5'  >
          <div className='py-5 md:py-10 md:pb-5  sticky top-0 bg-white z-10 flex items-center justify-between'>
            <div className='flex'>
              <span className='md:hidden' onClick={()=>setSidebarModal(!sidebarModal)}><MenuSvg/></span>
              <h3 className='text-xl font-semibold px-4 text-secondaryText'>{title}</h3>  
            </div>
            <div className='relative'>
            <button className='cursor-pointer' onClick={()=>setNotifModal(!notifModal)}><BellSvg/></button>
            {
              notifModal && (
                <div className='max-w-xs md:max-w-none right-0 w-96 top-10 absolute border bg-white drop-shadow-md rounded-lg p-5'>
                <p className='p-2 font-semibold text-secondaryText'>Notification's</p>  
                <ul>
                  {notifications &&  notifications.map((item,index)=>(
                    <li className='p-2 cursor-pointer' key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              )
            }
            </div>
          </div>
          <div className='px-4'>
            {children}
          </div>
        </div>
    </div>
  )
}

export default Layout