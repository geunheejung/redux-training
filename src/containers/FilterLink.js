import React from 'react';
import * as Actions from '../actions';
import { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '../components/Link';

class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
    return (
      <Link
        active={
          props.filter ===
          state.visibilityFilter
        }
        onClick={(e) => {
          console.log(props.filter);
          e.preventDefault();
          store.dispatch(Actions.setVisibility(props.filter))
        }}
      >
        {props.children}
      </Link>
    );
  }
}

FilterLink.contextTypes = {
  store: PropTypes.object
}

export default FilterLink;