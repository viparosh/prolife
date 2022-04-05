import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import {AppointmentSvg,BalanceSvg,SettingSvg,PatientSvg, LogoutSvg, CloseSvg} from './Svg'
const Sidebar = ({active,modal,setModal}) => {
    const links = [
        {
            icon:<AppointmentSvg/>,
            name:"Appointment",
            link:"/admin"
        },
        {
            icon:<PatientSvg/>,
            name:"Patients",
            link:"/admin/patient"
        },
        {
            icon:<BalanceSvg/>,
            name:"Balances",
            link:"/admin/balance"
        },
        {
            icon:<SettingSvg/>,
            name:"Settings",
            link:"/admin/setting"
        }
    ]
  return (
    <div className={`${modal ? 'translate-x-0' : '-translate-x-full' } md:translate-x-0 fixed md:block min-w-full md:min-w-sideBar h-screen px-14 bg-darkBlue z-20 md:sticky top-0`}>
        <div className='py-10 flex items-center justify-between'>
            <span className='text-white font-black text-2xl text-center'>ProLife +</span>
            <span onClick={()=>setModal(!modal)} className='md:hidden text-white font-black text-2xl text-center'><CloseSvg/></span>
        </div>
        <div className='flex items-center mb-7'>
            <Image src={require('../components/assets/avatar.jpg')} className="rounded-md" height="60px" width="60px"/>
            <div className='ml-4 text-white'>
                <p className='text-xl'>John Doe</p>
                <span className='text-slate-400'>Mid Wife</span>
            </div>
        </div>
        <div>
            <ul>
                {links.map(({icon,name,link},index)=>(
                    <li key={index} className="cursor-pointer hover:text-primary text-secondaryText">
                        <Link href={link}>
                            <div className={`p-4 mb-2 flex items-center ${active == name && 'bg-primary'} rounded-lg`}>
                                <span className='mr-2'>{icon}</span>
                                <p className='text-lg text-slate-200'>{name}</p>
                            </div>
                        </Link>
                    </li>
                ))}
                <li className="mt-10 cursor-pointer hover:text-primary text-secondaryText">
                        <div>
                            <div className={`p-4 mb-2 flex items-center rounded-lg`}>
                                <span className='mr-2'>{<LogoutSvg/>}</span>
                                <p className='text-lg text-slate-200'>Logout</p>
                            </div>
                        </div>
                    </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar