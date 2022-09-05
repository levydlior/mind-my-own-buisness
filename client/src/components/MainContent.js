import React, { useState } from "react";
import { Route, useRouteMatch } from "react-router";
import BusinessList from "./BusinessList";
import Receipts from "./Receipts";

function MainContent({loggedUser}) {
  const match = useRouteMatch();
  const [createReceiptsActive, setCreateReceiptsActive] = useState(false)

  function handleLinkClick(value){
    setCreateReceiptsActive(value)
  }

  return (
    <div>
      <BusinessList loggedUser={loggedUser} onLinkClick={handleLinkClick} />
      <Route path={`${match.url}/:businessId`}>
        <Receipts createReceiptsActive={createReceiptsActive} onCreateReceipts={handleLinkClick} />
      </Route>
    </div>
  );
}

export default MainContent;
