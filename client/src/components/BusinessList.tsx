import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function MainContent() {

  const [businesses, setBusinesses] = useState(Array<{
    name: string,
    amount: number,
    id: number
  }>)

  useEffect(()=> {
      fetch('/businesses')
        .then(r => r.json())
        .then(arrayOfBusinesses => setBusinesses(arrayOfBusinesses))
  },[])

 const buisnessList = businesses.map(buisness => {
  return (
    <li key={buisness.id}>
      <Link to={`/businesses/${buisness.id}`}>{buisness.name}</Link>
    </li>
  )
 })
  return (
    <div>
      {buisnessList}
      </div>
  )
}

export default MainContent