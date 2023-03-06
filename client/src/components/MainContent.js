import { useState } from "react";
import { Route, useRouteMatch } from "react-router";
import BusinessList from "./BusinessList/BusinessList";
import Receipts from "./Receipts/Receipts";
import styled from "@emotion/styled";

const MainContentDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 55px;
  padding-inline: 70px;
`;

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
}

export default MainContent;
