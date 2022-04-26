export const addNewPatient = async (newData) => {
  const response = await fetch(`/api/patient/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
  return await response.json()
}

export const updatePatient = async (id, newData) => {
  const response = await fetch(`/api/patient/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
  const { success } = await response.json()
  return success
}

export const findPatient = async (user) => {
  const response = await fetch(`/api/patient/${user}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const { data } = await response.json()
  return data
}
