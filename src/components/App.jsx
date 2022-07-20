import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contactForm/contactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from 'components/App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts =
      JSON.parse(localStorage.getItem('contacts')) ?? this.state.contacts;
    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleSubmit = ({ name, number }) => {
    const { contacts } = this.state;
    let loginInputId = nanoid();

    const normalizedName = name.toLowerCase();
    const checkedForName = contacts.some(
      contact => normalizedName === contact.name.toLowerCase()
    );

    if (checkedForName) {
      return alert(`${name} is already in contacts`);
    }

    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { id: loginInputId, name: name, number: number },
      ],
    }));
  };

  handleChange = e => {
    this.setState({ filter: e.target.value });
  };

  handleDelete = itemId => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== itemId),
    }));
  };

  handleFilter = () => {
    return this.state.contacts.filter(contact =>
      contact.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase())
    );
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div className={styles.app}>
        <h2>Phonebook</h2>
        <ContactForm contacts={contacts} onSubmit={this.handleSubmit} />

        <h2>Contacts</h2>
        <Filter onFilter={this.handleChange} filter={filter} />

        <ContactList
          onDelete={this.handleDelete}
          onFilter={this.handleFilter}
        />
      </div>
    );
  }
}
export default App;
