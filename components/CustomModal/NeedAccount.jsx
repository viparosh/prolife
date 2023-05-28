import React , { useEffect } from 'react'

const NeedAccount = ({setModal}) => {
  return (
    <div className="fixed top-0 left-0 z-30 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="w-full flex items-center flex-col max-w-selectedDate rounded-md bg-white p-4">
        <p className="text-themeViolet font-semibold mt-2 mb-3">Advice</p>
        <p className="text-justify text-sm mb-6">If you don't have an account please communicate with the clinic administrator to process your request.</p>
        <button className="border px-5 py-1" onClick={() => setModal(false)}> Close</button>
      </div>
    </div>
  )
}

export default NeedAccount
