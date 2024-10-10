import { useState } from 'react';

function NewModule() {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const module = { code: code, name: name, description: description };
    fetch('http://127.0.0.1:8000/api/module/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(module)
    })
      .then(response => {
        if (response.ok) {
          console.log('Module created successfully');
          setCode('');
          setName('');
          setDescription('');
        } else {
          console.error('Module creation failed');
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>New Module</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={event => setCode(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={event => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={event => setDescription(event.target.value)}
            required
          />
        </div>
        <button type="submit">Create Module</button>
      </form>
    </div>
  );
}

export default NewModule;