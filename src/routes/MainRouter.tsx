import React from 'react'
import { RouterProvider } from 'react-router-dom';
import routes from './Routes';

function MainRouter() {
  return (
    <RouterProvider router={routes()} />
  )
}

export default MainRouter;