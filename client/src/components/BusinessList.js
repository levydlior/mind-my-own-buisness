import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreateNewBusiness from './CreateNewBusiness'


function BusinessList(loggedUser) {

  const [businesses, setBusinesses] = useState([])

  useEffect(()=> {
      fetch('/businesses')
        .then(r => r.json())
        .then(arrayOfBusinesses => setBusinesses(arrayOfBusinesses))
  },[])

 const businessList = businesses.map(business => {
  return (
    <li key={business.id}>
      <Link to={`/businesses/${business.id}`}>{business.name}</Link>
    </li>
  )
 })
  return (
    <div>
      {businessList}
      <CreateNewBusiness loggedUser={loggedUser} />
      </div>
  )
}

export default BusinessList