import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Image from 'next/image'

function patient() {
  const [search, setSearch] = useState('')
  const patients = [
    {
      name: 'Oreo Negrete',
      contact: '9564638238',
      address: '3112 Servando St. Mapulang Lupa, Valenzuela City',
    },
    {
      name: 'Huba Negrete',
      contact: '9564638238',
      address: '3112 Servando St. Mapulang Lupa, Valenzuela City',
    },
    {
      name: 'Carrot Negrete',
      contact: '9564638238',
      address: '3112 Servando St. Mapulang Lupa, Valenzuela City',
    },
    {
      name: 'Killua Negrete',
      contact: '9564638238',
      address: '3112 Servando St. Mapulang Lupa, Valenzuela City',
    },
    {
      name: 'Gon Negrete',
      contact: '9564638238',
      address: '3112 Servando St. Mapulang Lupa, Valenzuela City',
    },
    {
      name: 'Marshie Negrete',
      contact: '9564638238',
      address: '3112 Servando St. Mapulang Lupa, Valenzuela City',
    },
    {
      name: 'Calcifer Negrete',
      contact: '9564638238',
      address: '3112 Servando St. Mapulang Lupa, Valenzuela City',
    },
  ]
  const searchPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <Layout title="Patients">
      <div>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          id="fname"
          placeholder="Search Patient #ID or by Name"
          className="mt-2 block w-full rounded-md border border-inputBorder px-4 py-2"
        />
        {search.trim().length > 0 && (
          <>
            <p className="py-4 text-lg text-secondaryText">
              Search result for "{search}"
            </p>
            <div className="mt-4">
              {searchPatients &&
                searchPatients.map(({ name, contact, address }, index) => (
                  <div
                    className="mb-4 flex items-start rounded-lg border border-inputBorder p-6"
                    key={index}
                  >
                    <Image
                      src={require('../../components/assets/luffy.jpg')}
                      className="rounded-md object-cover"
                      height="90px"
                      width="90px"
                    />
                    <div className="px-4">
                      <p className="text-lg">Name: {name}</p>
                      <p className="text-lg">Contact No#: (+63) {contact}</p>
                      <p className="text-lg">Address: {address}</p>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default patient
