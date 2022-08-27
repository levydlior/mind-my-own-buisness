import React, { useEffect, useState } from 'react'

function MainContent() {

  const [businesses, setBusinesses] = useState()

  useEffect(()=> {
      fetch('/businesses')
        .then(r => r.json())
        .then(arrayOfBusinesses => setBusinesses(arrayOfBusinesses))
  },[])

  console.log(businesses)

  return (
    <div>MainContent</div>
  )
}

export default MainContent