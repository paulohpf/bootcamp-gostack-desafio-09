import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { debounce } from 'lodash';
import api from '~/services/api';

import { Container, List } from './styles';

const debouncedGetSupports = debounce(async setSupports => {
  const response = await api.get('help-orders/notanswered');

  setSupports(response.data);
}, 300);

export default function Supports() {
  const [supports, setSupports] = useState([]);

  useEffect(() => {
    console.tron.log(supports);
  }, [supports]);

  useEffect(() => {
    debouncedGetSupports(setSupports);
  }, []);

  return (
    <Container>
      <header>
        <h2>Pedidos de auxílio</h2>
      </header>

      <List>
        <table>
          <thead>
            <tr>
              <th>
                <strong>Aluno</strong>
              </th>
            </tr>
          </thead>

          <tbody>
            {supports.map(support => (
              <tr key={support.id}>
                <td>{support.student.name}</td>
                <td className="actions">
                  <Link
                    className="answer"
                    to={`/support/${support.id}/answer/`}
                  >
                    responder
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
