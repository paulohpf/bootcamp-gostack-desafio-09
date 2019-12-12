import React from 'react';
import api from '~/services/api';

export default function Students() {
  api.get('users');

  return <h1>Teste</h1>;
}
