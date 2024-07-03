import { access } from 'fs';
import React from 'react'

const menusList = [
  {
    label: 'Dashboard',
    icon: '',
    route: "/dashboard",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin'],
  },
  {
    label: 'Athlete',
    icon: '',
    route: "/athlete/list",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin'],
  },
  {
    label: 'Team',
    icon: '',
    route: "/team/list",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin'],
  },
  {
    label: 'Brand',
    icon: '',
    route: "/brand/list",
    access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin'],
  }
]

// submenus: [
//   {
//     label: 'Team',
//     icon: '',
//     route: "/team/list",
//     access: ['adminLogin', 'athleteLogin', 'teamLogin', 'brandLogin'],
//   },
// ]

function SideMenu() {
  return (
    <div className='bg-black text-white'>
      <div>
        <div><span>ELUCID</span></div>
      </div>
    </div>
  )
}

export default SideMenu;