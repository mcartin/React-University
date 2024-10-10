import { useState, useEffect } from 'react';

function NewCohorts() {
  const [year, setYear] = useState(1);
  const [degree, setDegree] = useState(null);
  const [degrees, setDegrees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/degree/')
      .then(response => response.json())
      .then(data => setDegrees(data))
      .catch(error => console.error(error));
  }, []);

  const handleCreateCohort = () => {
    if (!degree) {
      setError('Please select a degree');
      return;
    }

    const cohort = { year, degree: degree.shortcode };
    fetch('http://127.0.0.1:8000/api/cohort/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cohort)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create cohort');
        }
        setYear(1);
        setDegree(null);
        setError(null);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to create cohort');
      });
  };

  return (
    <div>
      <h1>Create New Cohort</h1>
      <form onSubmit={e => e.preventDefault()}>
        <label htmlFor="year">Year:</label>
        <input type="number" min="1" max="4" id="year" value={year} onChange={e => setYear(e.target.value)} />
        <br />
        <label htmlFor="degree">Degree:</label>
        <select id="degree" value={degree?.shortcode} onChange={e => setDegree(degrees.find(d => d.shortcode === e.target.value))}>
          <option value="">--Select--</option>
          {degrees.map(d => (
            <option value={d.shortcode} key={d.shortcode}>
              {d.full_name}
            </option>
          ))}
        </select>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleCreateCohort}>Create Cohort</button>
      </form>
    </div>
  );
}

export default NewCohorts;
