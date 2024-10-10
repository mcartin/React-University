import { useState, useEffect } from 'react';

function AllCohorts() {
  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cohort/')
      .then(response => response.json())
      .then(data => setCohorts(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedCohort) {
      fetch(`http://127.0.0.1:8000/api/student/?cohort=${selectedCohort.id}`)
        .then(response => response.json())
        .then(data => setStudents(data))
        .catch(error => console.error(error));
    }
  }, [selectedCohort]);

  return (
    <div>
      <h1>All Cohorts</h1>
      {selectedCohort ? (
        <div>
          <h2>{selectedCohort.name}</h2>
          <button onClick={() => setSelectedCohort(null)}>Return to All Cohorts</button>
          <h3>All Students within Cohort</h3>
          <ul>
            {students.map(student => (
              <li key={student.id}>
                {student.student_id} - {student.first_name} {student.last_name} - {student.email}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul>
          {cohorts.map(cohort => (
            <li key={cohort.id}>
              {cohort.name} <button onClick={() => setSelectedCohort(cohort)}>View Students Invovled</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllCohorts;