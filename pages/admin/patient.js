import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import Image from 'next/image'
import { ModalForm, Search, ViewPatient } from '../../components'
import { SearchSvg } from '../../components/Svg'

const patient = () => {
  const mode = ['new', 'edit']
  const [modalMode, setModalMode] = useState('')
  const [fetchData, setFetchData] = useState()
  const [searchMode, setSearchMode] = useState(false)
  useEffect(() => {
    console.log('loaded')
  })
  return (
    <Layout title="Patients">
      <div>
        {modalMode == 'add' && (
          <ModalForm mode={modalMode} closeModal={setModalMode} />
        )}
        {modalMode == 'update' && (
          <ModalForm
            mode={modalMode}
            closeModal={setModalMode}
            data={fetchData}
            setData={setFetchData}
          />
        )}
        {searchMode && (
          <Search setSearchMode={setSearchMode} setFetchData={setFetchData} />
        )}
        <div className="flex justify-between gap-4">
          <button
            onClick={() => setSearchMode(true)}
            className="  cursor-pointer rounded-md border border-inputBorder px-3 py-3"
          >
            <SearchSvg />
          </button>
          <button
            onClick={() => {
              setModalMode('add')
            }}
            className="mx-2 ml-0 flex-shrink-0 rounded-md border bg-primary px-4 py-1 text-white"
          >
            New Patient
          </button>
        </div>
        {/* display search results  */}
        <div>
          <ViewPatient data={fetchData} closeModal={setModalMode} />
        </div>
      </div>
    </Layout>
  )
}

export default patient
