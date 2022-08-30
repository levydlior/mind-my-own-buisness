import React from 'react'
import { Route, useRouteMatch } from 'react-router'
import BusinessList from './BusinessList'
import Business from './Business'

function MainContent() {

  const match = useRouteMatch()
console.log(match)
  return (
    <div>
      <BusinessList />
      
      <Route  path={`${match.url}/:businessId`}>
        <Business />
      </Route>
    </div>
  )
}

export default MainContent