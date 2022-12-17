import styled from "@emotion/styled";
import Logo from "./Logo";
import { Link, NavLink } from "react-router-dom";

const HeaderDiv = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 46px;
  padding-inline: 4.5rem;
  padding-top: 2rem;
`;

function Header({ loggedUser, onLogOut }) {
  return (
    <HeaderDiv>
      {loggedUser ? (
        <>
          <NavLink to="/">
            <Logo />
          </NavLink>
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
