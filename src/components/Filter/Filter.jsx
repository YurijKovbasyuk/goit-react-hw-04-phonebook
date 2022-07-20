import { Fragment } from 'react';
import css from './Filter.module.css';
import PropTypes from 'prop-types';

function Filter(props) {
  const { filter } = props.filter;
  return (
    <Fragment>
      <p className={css.p}>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        value={filter}
        onChange={e => {
          props.onFilter(e);
        }}
      />
    </Fragment>
  );
}

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
export default Filter;
