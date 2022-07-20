import styles from './ContactList.module.css';
import Contact from '../Contact/Contact';
import PropTypes from 'prop-types';

function ContactList({ onDelete, onFilter }) {
  return (
    <div>
      <ul className={styles.contacts}>
        {onFilter().map(contact => {
          const { id, number, name } = contact;
          return (
            <Contact
              onDelete={onDelete}
              key={id}
              number={number}
              name={name}
              id={id}
            />
          );
        })}
      </ul>
    </div>
  );
}

ContactList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default ContactList;
