import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import ptBrLocale from 'date-fns/locale/pt-BR';

import { Link } from 'react-router-dom';

import { debounce } from 'lodash';
import { FiPlus } from 'react-icons/fi';
import api from '~/services/api';

import { Container, List } from './styles';

const debouncedGetEnrollments = debounce(async setEnrollments => {
  const response = await api.get('enroll');

  setEnrollments(response.data);
}, 300);

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    console.tron.log(enrollments);
  }, [enrollments]);

  useEffect(() => {
    debouncedGetEnrollments(setEnrollments);
  }, []);

  return (
    <Container>
      <header>
        <h2>Gerenciando matrículas</h2>

        <div>
          <Link to="/enrollment/add">
            <FiPlus size={16} />
            Cadastrar
          </Link>
        </div>
      </header>

      <List>
        <table>
          <thead>
            <tr>
              <th>
                <strong>Aluno</strong>
              </th>
              <th>
                <strong>Plano</strong>
              </th>
              <th>
                <strong>Início</strong>
              </th>
              <th>
                <strong>Término</strong>
              </th>
              <th>
                <strong>Ativa</strong>
              </th>
            </tr>
          </thead>

          <tbody>
            {enrollments.map(plan => (
              <tr key={plan.id}>
                <td>{plan.student.name}</td>
                <td>{plan.plan ? plan.plan.title : ''}</td>
                <td>
                  {format(new Date(plan.start_date), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBrLocale,
                  })}
                </td>
                <td>
                  {format(new Date(plan.end_date), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBrLocale,
                  })}
                </td>
                <td>{plan.active ? 'Ativo' : 'Não ativo'}</td>
                <td className="actions">
                  <Link className="edit" to={`/enrollment/edit/${plan.id}`}>
                    editar
                  </Link>
                  <Link className="delete" to="/#">
                    apagar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </List>
    </Container>
  );
}

Enrollments.defaultProps = {
  match: {},
};
