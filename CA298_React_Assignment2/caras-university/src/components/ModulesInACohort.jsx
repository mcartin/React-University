import { useState } from 'react';

function ModulesInACohort() {
  const [selectedCohort, setSelectedCohort] = useState('');
  const [modules, setModules] = useState([]);

  const handleButtonClick = () => {
    fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${selectedCohort}`)
      .then(response => response.json())
      .then(data => setModules(data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Modules In A Cohort</h2>
      <label htmlFor="cohort">Select a cohort:</label>
      <select id="cohort" value={selectedCohort} onChange={(e) => setSelectedCohort(e.target.value)}>
        <option value="">--Select a cohort--</option>
        <option value="COMSCI1">COMSCI1</option>
        <option value="COMSCI2">COMSCI2</option>
        <option value="COMSCI3">COMSCI3</option>
      </select>
      <button onClick={handleButtonClick}>View Modules</button>
      {modules.length > 0 && (
        <ul>
          {modules.map(module => (
            <li key={module.code}>
              {module.full_name}
            </li>
          ))}
        </ul> 
      )}
    </div>
  );
}

export default ModulesInACohort;
