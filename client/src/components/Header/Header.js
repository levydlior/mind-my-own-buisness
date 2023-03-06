import Logo from "./Logo";
import { Link, NavLink } from "react-router-dom";
import { HeaderDiv } from "./Header.styles";

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
