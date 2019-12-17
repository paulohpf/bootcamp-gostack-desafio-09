import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Input, Select } from '@rocketseat/unform';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, addMonths } from 'date-fns';
import DatePicker from '~/components/DatePicker';
import api from '~/services/api';

import 'react-datepicker/dist/react-datepicker.css';

import { Container, EditForm } from './styles';

export default function EnrollmentEdit({ match, history }) {
  const schema = Yup.object().shape({
    student_id: Yup.string().required('O aluno é obrigatório'),
    plan_id: Yup.string().required('O plano é obrigatório'),
    start_date: Yup.string('Insira uma data')
      .required('A idade é obrigatória')
      .typeError('Insira uma data válida'),
  });

  const { params } = match;
  const { push } = history;

  const [enrollment, setEnrollment] = useState({
    start_date: new Date(),
  });
  const [studentOptions, setStudentOptions] = useState([]);
  const [planOptions, setPlanOptions] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [planDuration, setPlanDuration] = useState('');
  const [endDate, setEndDate] = useState('');

  // Campos Aluno/Plano
  useEffect(() => {
    const getStudents = async () => {
      const [students, plans] = await Promise.all([
        api.get(`students`),
        api.get(`plans`),
      ]);

      const _studentOptions = [];
      const _planOptions = [];

      students.data.forEach(student =>
        _studentOptions.push({
          id: student.id,
          title: student.name,
        })
      );

      setStudentOptions(_studentOptions);

      plans.data.forEach(plan =>
        _planOptions.push({
          id: plan.id,
          title: plan.title,
          price: plan.price,
          duration: plan.duration,
        })
      );

      setPlanOptions(_planOptions);
    };

    getStudents();
  }, []);

  const handleSubmit = data => {
    console.tron.log(data);
    if (params.id) {
      api
        .put(`enroll`, { id: params.id, ...data })
        .then(() => {
          toast.success('Salvo com sucesso');
          push('/enrollments');
        })
        .catch(() => {
          toast.error('Ocorreu um erro');
        });
    } else {
      api
        .post(`enroll`, { ...data })
        .then(() => {
          push('/enrollments');
        })
        .catch(() => {
          toast.error('Ocorreu um erro');
        });
    }
  };

  const onSelectPlan = value => {
    const { duration, price } = planOptions[value - 1];
    setTotalPrice(duration * price);
    setPlanDuration(duration);
    setEndDate(format(addMonths(startDate, duration), 'dd/MM/yyyy'));
  };

  const onSelectDate = value => {
    setStartDate(value);
    setEndDate(format(addMonths(value, planDuration), 'dd/MM/yyyy'));
  };

  return (
    <Container>
      <header>
        <h2>{params.id ? 'Edição de matrícula' : 'Cadastro de matrícula'}</h2>

        <div>
          <Link to="/enrollments">
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
        initialData={enrollment}
        schema={schema}
        onSubmit={handleSubmit}
      >
        <span htmlFor="student_id">
          ALUNO
          <Select
            name="student_id"
            options={studentOptions}
            placeholder="Buscar aluno"
          />
        </span>
        <div>
          <span htmlFor="plan_id">
            PLANO
            <Select
              name="plan_id"
              options={planOptions}
              placeholder="Selecione o plano"
              onChange={e => onSelectPlan(e.target.value)}
            />
          </span>
          <span htmlFor="start_date">
            DATA DE INÍCIO
            <DatePicker
              name="start_date"
              placeholder="Escolha a data"
              onChange={onSelectDate}
            />
          </span>
          <span htmlFor="end_date">
            DATA DE TÉRMINO
            <Input name="end_date" value={endDate} disabled />
          </span>
          <span htmlFor="totalPrice">
            VALOR FINAL
            <Input name="totalPrice" value={totalPrice} disabled />
          </span>
        </div>
      </EditForm>
    </Container>
  );
}

EnrollmentEdit.defaultProps = {
  match: {},
};

EnrollmentEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
