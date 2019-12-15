import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Input } from '@rocketseat/unform';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { Container, EditForm } from './styles';

export default function PlanEdit({ match, history }) {
  const schema = Yup.object().shape({
    title: Yup.string().required('O Titulo é obrigatório'),
    duration: Yup.number()
      .required('A duração é obrigatória')
      .typeError('A duração deve ser um número'),
    mensalPrice: Yup.number()
      .required('O preço mensal é obrigatório')
      .typeError('O preço mensal deve ser um número'),
  });

  const { params } = match;
  const { push } = history;

  const [plan, setPlan] = useState({});

  useEffect(() => {
    if (params.id) {
      const getPlans = async () => {
        const response = await api.get(`plan/${params.id}`);

        setPlan(response.data);
      };

      getPlans();
    }
  }, [params.id]);

  const handleSubmit = data => {
    if (params.id) {
      api
        .put(`students`, { id: params.id, ...data })
        .then(() => {
          toast.success('Salvo com sucesso');
          push('/students');
        })
        .catch(() => {
          toast.error('Ocorreu um erro');
        });
    } else {
      api
        .post(`students`, { ...data })
        .then(() => {
          push('/students');
        })
        .catch(() => {
          toast.error('Ocorreu um erro');
        });
    }
  };

  return (
    <Container>
      <header>
        <h2>{params.id ? 'Edição de plano' : 'Cadastro de plano'}</h2>

        <div>
          <Link to="/plans">
            <MdKeyboardArrowLeft size={16} />
            Voltar
          </Link>
          <button form="form" type="submit">
            <MdCheck size={16} /> Salvar
          </button>
        </div>
      </header>

      <EditForm
        id="form"
        initialData={plan}
        schema={schema}
        onSubmit={handleSubmit}
      >
        <span htmlFor="title">
          TÍTULO DO PLANO
          <Input name="title" />
        </span>
        <div>
          <span htmlFor="duration">
            DURAÇÃO (em meses)
            <Input name="duration" />
          </span>
          <span htmlFor="mensalPrice">
            PREÇO MENSAL
            <Input name="mensalPrice" />
          </span>
          <span htmlFor="totalPrice">
            PREÇO TOTAL
            <Input name="totalPrice" disabled />
          </span>
        </div>
      </EditForm>
    </Container>
  );
}

PlanEdit.defaultProps = {
  match: {},
};

PlanEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
