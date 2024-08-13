import React from 'react'

const WorkStatus = ({work}) => {
  return (
    <div className="flex flex-col items-center justify-center">
  <div className="w-full bg-gray-300 rounded-full h-3 mb-4">
    <div
      className={`h-3 rounded-full ${
        work.workStatus === 'pending'
          ? 'bg-blue-400'
          : work.workStatus === 'committed'
          ? 'bg-yellow-500'
          : work.workStatus === 'completed'
          ? 'bg-green-600'
          : 'bg-gray-300'
      }`}
      style={{
        width:
          work.workStatus === 'pending'
            ? '30%'
            : work.workStatus === 'committed'
            ? '70%'
            : work.workStatus === 'completed'
            ? '100%'
            : '0%',
      }}
    ></div>
  </div>
  <div className="flex justify-between w-full text-xs text-gray-600">
    <span
      className={`flex-1 text-center ${
        work.workStatus === 'pending' ? 'text-blue-600 font-bold' : ''
      }`}
    >
      Pending
    </span>
    <span
      className={`flex-1 text-center ${
        work.workStatus === 'commited' ? 'text-yellow-600 font-bold' : ''
      }`}
    >
      Committed
    </span>
    <span
      className={`flex-1 text-center ${
        work.workStatus === 'completed' ? 'text-green-600 font-bold' : ''
      }`}
    >
      Completed
    </span>
  </div>
</div>

  )
}

export default WorkStatus
