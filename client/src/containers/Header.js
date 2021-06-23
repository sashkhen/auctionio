import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { IconButton, MenuIcon, CrossIcon } from 'evergreen-ui';
import { useRef, useState } from 'react';
import useClickOutside from '../utils/useClickOutside';
import useResize from '../utils/useResize';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 0 24px;
  border-bottom: 1px solid #edeff5;
`;

const StyledLogo = styled.h2`
  align-self: center;
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: stretch;

  button {
    align-self: center;
  }

  .inline {
    margin: 18px 0;
    text-align: center;
  }

  .mobile {
    @media (min-width: 769px) {
      display: none;
    }
  }

  ul {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: auto;
    align-content: stretch;

    @media (max-width: 768px) {
      position: absolute;
      z-index: 1;
      grid-auto-flow: row;
      align-content: start;
      background-color: #ffffff;
      right: 0;
      border-left: 1px solid #edeff5;
      transition: transform 0.2s ease-out;

      &:not(.opened) {
        transform: translate(100%, 0);
      }
    }

    > button {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    li {
      display: inline-block;

      @media (max-width: 768px) {
        padding: 0;
      }
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  border-style: solid;
  border-color: transparent;
  border-width: 0;
  border-bottom-width: 1px;
  transition: all 0.2s ease-out;
  text-transform: lowercase;

  @media (max-width: 768px) {
    border-bottom-width: 0;
    border-left-width: 1px;
    padding: 16px 32px;
  }

  &:hover {
    background-color: #f3f6ff;
    color: #2952cc;
  }

  &.active {
    border-color: #2952cc;
    background-color: #f3f6ff;
    color: #2952cc;
  }
`;

export default function Header() {
  const [isOpened, setOpened] = useState(false);
  const navRef = useRef(null);

  useClickOutside(navRef, () => isOpened && setOpened(false));
  useResize((isMobile) => !isMobile && isOpened && setOpened(false));

  return (
    <StyledHeader>
      <NavLink to="/">
        <StyledLogo>auctionion</StyledLogo>
      </NavLink>
      <StyledNav>
        <IconButton
          icon={MenuIcon}
          appearance="minimal"
          className="mobile"
          onClick={() => setOpened(true)}
        />
        <ul className={isOpened ? 'opened' : ''} ref={navRef}>
          <li className="inline mobile">
            <IconButton
              icon={CrossIcon}
              appearance="minimal"
              onClick={() => setOpened(false)}
            />
          </li>
          <li>
            <StyledNavLink to="/" exact onClick={() => setOpened(false)}>
              Home
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/auctions" onClick={() => setOpened(false)}>
              Auctions
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/assets" onClick={() => setOpened(false)}>
              Assets
            </StyledNavLink>
          </li>
        </ul>
      </StyledNav>
    </StyledHeader>
  );
}
