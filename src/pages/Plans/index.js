import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { debounce } from 'lodash';
import { AiOutlinePlus } from 'react-icons/ai';
import api from '~/services/api';

import { Container, List } from './styles';

const debouncedGetPlans = debounce(async setPlans => {
  const response = await api.get('plans');

  setPlans(response.data);
}, 300);

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    console.tron.log(plans);
  }, [plans]);

  useEffect(() => {
    debouncedGetPlans(setPlans);
  }, []);

  return (
    <Container>
      <header>
        <h2>Gerenciando planos</h2>

        <div>
          <button type="button">
            <AiOutlinePlus size={16} />
            Cadastrar
          </button>
        </div>
      </header>

      <List>
        <table>
          <thead>
            <tr>
              <th>
                <strong>Título</strong>
              </th>
              <th>
                <strong>Duração</strong>
              </th>
              <th>
                <strong>VALOR p/ MÊS</strong>
              </th>
            </tr>
          </thead>

          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>{plan.duration}</td>
                <td>{plan.price}</td>
                <td className="actions">
                  <Link className="edit" to={`/plan/edit/${plan.id}`}>
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
