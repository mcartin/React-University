import { useState } from 'react';

function NewDegree() {
  const [fullName, setFullName] = useState('');
  const [shortCode, setShortCode] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const degree = { full_name: fullName, shortcode: shortCode };
    fetch('http://127.0.0.1:8000/api/degree/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(degree)
    })
      .then(response => {
        if (response.ok) {
          console.log('Degree created successfully');
          setFullName('');
          setShortCode('');
        } else {
          console.error('Degree creation failed');
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>New Degree</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="full-name">Full Name:</label>
          <input
            type="text"
            id="full-name"
            value={fullName}
            onChange={event => setFullName(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="shortcode">Shortcode:</label>
          <input
            type="text"
            id="shortcode"
            value={shortCode}
            onChange={event => setShortCode(event.target.value)}
            required
          />
        </div>
        <button type="submit">Create Degree</button>
      </form>
    </div>
  );
}

export default NewDegree;