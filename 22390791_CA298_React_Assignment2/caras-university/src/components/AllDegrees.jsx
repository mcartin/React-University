import { useState, useEffect } from 'react';
function AllDegrees() {
  const [degrees, setDegrees] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState(null);

  useEffect(() => {
    let url = 'http://127.0.0.1:8000/api/degree/';
    if (selectedDegree) {
      url += `?shortcode=${selectedDegree}`;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => setDegrees(data))
      .catch(error => console.error(error));
  }, [selectedDegree]);

  return (
    <div>
      <h1>All Degrees</h1>
      {selectedDegree ? (
        <div>
          <h2>{selectedDegree}</h2>
          <button onClick={() => setSelectedDegree(null)}>Return to All Degrees</button>
        </div>
      ) : (
        <ul>
          {degrees.map(degree => (
            <li key={degree.shortcode}>
              {degree.full_name}{' '}
              <button onClick={() => setSelectedDegree(degree.shortcode)}>View This Degree</button>
            </li>
          ))}
        </ul>
      )}
      <p></p>
    </div>
  );
}

export default AllDegrees;