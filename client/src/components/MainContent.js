import React from "react";
import { Route, useRouteMatch } from "react-router";
import BusinessList from "./BusinessList";
import Business from "./Business";

function MainContent(loggedUser) {
  const match = useRouteMatch();

  return (
    <div>
      <BusinessList loggedUser={loggedUser} />
      <Route path={`${match.url}/:businessId`}>
        <Business  />
      </Route>
    </div>
  );
}

export default MainContent;
