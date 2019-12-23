import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { debounce } from 'lodash';

import { FiPlus } from 'react-icons/fi';
import api from '~/services/api';

import { Container, List } from './styles';

const debouncedGetStudents = debounce(async (setStudents, searchText) => {
  const response = await api.get('students', { params: { searchText } });

  setStudents(response.data);
}, 300);

export default function Students(props) {
  console.tron.log(props);

  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    console.tron.log(students);
  }, [students]);

  useEffect(() => {
    debouncedGetStudents(setStudents, searchText);
  }, [searchText]);

  const handleOnChange = e => {
    setSearchText(e.target.value);
  };

  return (
    <Container>
      <header>
        <h2>Gerenciando Alunos</h2>

        <div>
          <Link to="/student/add">
            <FiPlus size={16} />
            Cadastrar
          </Link>
          <input
            type="text"
            placeholder="Buscar aluno"
            value={searchText}
            onChange={handleOnChange}
          />
        </div>
      </header>

      <List>
        <table>
          <thead>
            <tr>
              <th>
                <strong>Nome</strong>
              </th>
              <th>
                <strong>E-mail</strong>
              </th>
              <th>
                <strong>Idade</strong>
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td className="actions">
                  <Link className="edit" to={`/student/edit/${student.id}`}>
                    editar
                  </Link>
                  {/* <Link className="delete" to="/#">
                    apagar
                  </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </List>
    </Container>
  );
}
