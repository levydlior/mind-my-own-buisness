import React from "react";
import { Route, useRouteMatch } from "react-router";
import BusinessList from "./BusinessList";
import Receipts from "./Business";

function MainContent({loggedUser}) {
  const match = useRouteMatch();

  return (
    <div>
      <BusinessList loggedUser={loggedUser} />
      <Route path={`${match.url}/:businessId`}>
        <Receipts  />
      </Route>
    </div>
  );
}

export default MainContent;
