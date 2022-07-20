import styles from './Contact.module.css';
import PropTypes from 'prop-types';

function Contact({ id, number, name, onDelete }) {
  return (
    <li className={styles.li}>
      {name + ': ' + number}
      <button
        className={styles.button}
        onClick={() => {
          onDelete(id);
        }}
      >
        Delete
      </button>
    </li>
  );
}

Contact.propTypes = {
  onDelete: PropTypes.func.isRequired,
  number: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
export default Contact;
