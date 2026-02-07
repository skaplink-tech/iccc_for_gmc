import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css'
import Login_Component from './Login_Component/Login_Component';

function App() {

  const Routes = createBrowserRouter([
    { path: '/', element: <> <Login_Component /> </> }
  ])

  return (
    <React.Fragment>
      <RouterProvider router={Routes} />
    </React.Fragment>
  )
}

export default App;