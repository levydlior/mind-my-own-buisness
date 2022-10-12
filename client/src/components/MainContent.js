import  { useState } from "react";
import { Route, useRouteMatch } from "react-router";
import BusinessList from "./BusinessList";
import Receipts from "./Receipts";

function MainContent({ loggedUser }) {
  const match = useRouteMatch();
  const [createReceiptsActive, setCreateReceiptsActive] = useState(false);
  const [newReceipt, setNewReceipt] = useState(null);

  function handleLinkClick(value) {
    setCreateReceiptsActive(value);
  }

  function handleNewReceipts(res) {
    setNewReceipt(res);
  }
  
  return (
    <div>
      <BusinessList
        loggedUser={loggedUser}
        onLinkClick={handleLinkClick}
        newReceipt={newReceipt}
      />
      <Route path={`${match.url}/:businessId`}>
        <Receipts
          createReceiptsActive={createReceiptsActive}
          onCreateReceipts={handleLinkClick}
          onNewReceipts={handleNewReceipts}
          loggedUser={loggedUser}
        />
      </Route>
    </div>
  );
}

export default MainContent;
