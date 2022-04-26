import React from 'react'
import { DeleteSvg } from '../Svg'
import moment from 'moment'
const TimeLayout = ({ data, actionButton, removeHandler, removeId }) => {
  return (
    <div className="my-2 flex items-center justify-between">
      <p>
        {moment(data.from).format('hh:mm A')} -{' '}
        {moment(data.to).format('hh:mm A')}
      </p>
      <div className=" flex justify-end">
        {actionButton && (
          <>
            <button
              onClick={() => removeHandler(removeId)}
              className=" mx-2 ml-0 rounded-md border p-1"
            >
              <DeleteSvg />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TimeLayout
