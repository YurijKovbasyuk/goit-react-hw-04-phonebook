import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contactForm/contactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from 'components/App.module.css';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
const App = () => {
  const [contacts, setContacts] = useState(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    console.log(parsedContacts);
    return parsedContacts ?? initialState;
  });

  const [filterContact, setFilterContact] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (name, number) => {
    let loginInputId = nanoid();

    const normalizedName = name.toLowerCase();
    const checkedForName = contacts.some(
      contact => normalizedName === contact.name.toLowerCase()
    );

    if (checkedForName) {
      return alert(`${name} is already in contacts`);
    }
    setContacts(prevState => [
      ...prevState,
      { id: loginInputId, name: name, number: number },
    ]);
  };

  const handleChange = e => {
    setFilterContact(e.target.value);
  };

  const handleDelete = itemId => {
    setContacts(contacts.filter(el => el.id !== itemId));
  };

  const handleFilter = e => {
    return contacts.filter(contact =>
      contact.name
        .toLocaleLowerCase()
        .includes(filterContact.toLocaleLowerCase())
    );
  };

  return (
    <div className={styles.app}>
      <h2>Phonebook</h2>
      <ContactForm contacts={contacts} onSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <Filter onFilter={handleChange} filter={filterContact} />

      <ContactList onDelete={handleDelete} onFilter={handleFilter} />
    </div>
  );
};

export default App;
