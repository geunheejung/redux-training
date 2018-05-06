import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import App from '../App';

const FilterLink = ({ filter, children }) => {
  return (
    <NavLink
      exact
      to={`/${filter}`}
      activeStyle={{
        textDecoration: 'none',
        color: 'black',
      }}
    >
      {children}
    </NavLink>
  );
}

export default FilterLink;