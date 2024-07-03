import React from 'react'
import { DataTable } from '../../components/data-table/DataTable';

function AthleteList() {
  return (
    <div className='border rounded-md w-full p-2'>
      <div>Athlete List</div>
      <DataTable />
    </div>
  )
}

export default AthleteList;