import React, { useEffect, useState } from 'react';

import api from '~/services/api';

import { Container, List } from './styles';
import ModalAnswer from './ModalAnswer/index';

export default function Supports() {
  const [supports, setSupports] = useState([]);

  const [supportId, setSupportId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const getData = async () => {
    const response = await api.get('help-orders/notanswered');

    setSupports(response.data);
  };

  const editAnswer = async ({ id = null, refresh = false }) => {
    setOpenModal(!openModal);

    setSupportId(id);

    if (refresh) {
      getData();
    }
  };

  useEffect(() => {
    console.tron.log(supports);
  }, [supports]);

  useEffect(() => {
    getData();
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
                  <button
                    type="button"
                    className="answer"
                    onClick={() => {
                      editAnswer({ id: support.id });
                    }}
                  >
                    responder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </List>
      <ModalAnswer
        id={supportId}
        openModal={openModal}
        onRequestClose={editAnswer}
      />
    </Container>
  );
}
