import styled from "@emotion/styled";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const HeaderDiv = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 46px;
`;

function Header({ loggedUser, onLogOut }) {
  return (
    <HeaderDiv>
      {loggedUser ? (
        <>
          <Logo />
          <Link to="/" onClick={(e) => onLogOut(e)}>
            Log out
          </Link>
        </>
      ) : (
        <Logo />
      )}
    </HeaderDiv>
  );
}

export default Header;
