import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContacts,
  addContact,
  deleteContact,
  setFilter,
} from '../redux/contactsSlice';

function App() {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(state => state.contacts);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [filter, setFilterValue] = useState('');

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = () => {
    const contact = { name, phone };
    dispatch(addContact(contact));
    setName('');
    setPhone('');
  };

  const filteredContacts = items.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Contact Book</h1>

      {}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <button onClick={handleAddContact}>Add Contact</button>

      {}
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={e => {
          setFilterValue(e.target.value);
          dispatch(setFilter(e.target.value));
        }}
      />

      {}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.phone}
            <button onClick={() => dispatch(deleteContact(contact.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
