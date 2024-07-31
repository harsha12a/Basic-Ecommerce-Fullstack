import React from 'react'
import { useRouteError } from 'react-router-dom'
function RoutingError() {
    let er=useRouteError()
    console.log(er)
    return (
    <div className='p-5 m-5 text-danger text-center'>
        <h1 className='display-1 text-danger text-center mt-5'>{er.data}</h1>
        <h2 className="text-center display-3 text-warning">{er.status}-{er.statusText}</h2>
    </div>
  )
}

export default RoutingError