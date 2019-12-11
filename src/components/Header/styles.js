import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  background: #ffffff;
  border: #dddddd;
  justify-content: space-between;
  align-items: center;
  padding: 16px 30px;

  .nav {
    display: flex;
  }
`;

export const NavLinks = styled.ul`
  display: flex;
  border-left: 1px solid #ddd;
  margin: 0 15px;
  padding: 0 15px;

  li {
    padding: 0 15px;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
`;

export const NavLink = styled(Link)`
  font-size: 15px;
  font-weight: bold;
  color: #999999;

  &:hover {
    color: #444444;
  }
`;
