import React from 'react'
import Home from '../../pages/homePage/Home'


function Content({userRole, token}) {
  return (
    <div>
        <Home userRole = {userRole} token = {token} />
    </div>
  )
}

export default Content