import React from 'react';

import logo from '../../assets/Images/LogoHorizontal.svg';

import { Container, NavLinks, NavLink } from './styles';

export default function Header() {
  return (
    <Container>
      <div className="nav">
        <img src={logo} alt="Gympoint" />

        <NavLinks>
          <li>
            <div>
              <NavLink to="">Alunos</NavLink>
            </div>
          </li>
          <li>
            <div>
              <NavLink to="">Planos</NavLink>
            </div>
          </li>
          <li>
            <div>
              <NavLink to="">Matriculas</NavLink>
            </div>
          </li>
          <li>
            <div>
              <NavLink to="">Pedidos de Auxílio</NavLink>
            </div>
          </li>
        </NavLinks>
      </div>
    </Container>
  );
}
