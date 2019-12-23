import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { Container, List } from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  const getData = async () => {
    const response = await api.get('plans');

    setPlans(response.data);
  };

  const handleDeletePlan = async id => {
    const toastId = 'handleDeletePlan';

    try {
      toast.info('Aguarde um momento', {
        autoClose: false,
        toastId,
      });

      await api.delete(`plans/${id}`);

      toast.dismiss(toastId);
      toast.success('Plano removido');

      getData(setPlans);
    } catch (err) {
      toast.error('Ocorreu um erro');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <header>
        <h2>Gerenciando planos</h2>

        <div>
          <Link to="/plan/add">
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
                  <div>
                    <Link className="edit" to={`/plan/edit/${plan.id}`}>
                      editar
                    </Link>
                    <button
                      type="button"
                      className="delete"
                      onClick={() => {
                        handleDeletePlan(plan.id);
                      }}
                    >
                      apagar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </List>
    </Container>
  );
}
