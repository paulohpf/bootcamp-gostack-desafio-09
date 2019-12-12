import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../../assets/Images/LogoHorizontal.svg';

import { Container, Content, Profile, NavLinks, NavLink } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
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
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/">sair do sistema</Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
