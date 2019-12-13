import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import logo from '../../assets/Images/LogoHorizontal.svg';

import { Container, Content, Profile, NavLinks, NavLink } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

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
              <button type="button" onClick={handleSignOut}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
