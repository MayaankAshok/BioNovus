import {FaBars} from 'react-icons/fa';
import {NavLink as Link} from 'react-router-dom';
import styled from 'styled-components';

export const Nav=styled.nav`
    background:#2b2e2a;
    height:85px;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem calc((100vw - 1000px) / 2);
    z-index: 12;    
    `;
export const NavLink=styled(Link)`
    color:white;
    display:flex;
    align-items: center;
    text-decoration: none;
    padding: 0 0.3rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: black;
    }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: black;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 40px) {
    display: none;
  }
`;
