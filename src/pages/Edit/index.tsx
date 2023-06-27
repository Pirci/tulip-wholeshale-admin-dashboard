import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductEdit() {
  const { id } = useParams();

  return <div>This is edit page!</div>;
}
