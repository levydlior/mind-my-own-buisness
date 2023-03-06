import { useState } from "react";
import { Route, useRouteMatch } from "react-router";
import BusinessList from "../BusinessList/BusinessList";
import Receipts from "../Receipts/Receipts";
import { MainContentDiv } from "./MainContent.styles";

const MainContent = ({ loggedUser }) => {
  const match = useRouteMatch();
  const [createReceiptsActive, setCreateReceiptsActive] = useState(false);
  const [newReceipt, setNewReceipt] = useState(null);

  const handleLinkClick = (value) => {
    setCreateReceiptsActive(value);
  };

  const handleNewReceipts = (receipt) => {
    setNewReceipt(receipt);
  };

  return (
    <MainContentDiv>
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
    </MainContentDiv>
  );
};

export default MainContent;
