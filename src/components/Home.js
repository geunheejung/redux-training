import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Root from './Root';

const Home = () => {
  return (
    <Redirect to="/all" />
  );
};

export default Home;
