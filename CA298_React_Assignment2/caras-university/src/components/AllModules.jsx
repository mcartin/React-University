import React, { useState, useEffect } from 'react';

function AllModules() {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [cohorts, setCohorts] = useState([]);
  const [showCohorts, setShowCohorts] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/module/')
      .then(response => response.json())
      .then(data => setModules(data))
      .catch(error => console.error(error));
  }, []);

  const handleBackClick = () => {
    setSelectedModule(null);
    setShowCohorts(false);
    setCohorts([]);
  };

  const handleCohortsClick = (module) => {
    setSelectedModule(module);
    setShowCohorts(true);
    Promise.all(module.delivered_to.map(url =>
      fetch(url).then(response => response.json())
    )).then(data => setCohorts(data.flat()))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>All Modules</h1>
      {showCohorts ? (
        <div>
          <h2>{selectedModule.code}: {selectedModule.full_name}</h2>
          <ul>
            {cohorts.map(cohort => (
              <li key={cohort.code}>{cohort.name}</li>
            ))}
          </ul>
          <button onClick={handleBackClick}>Return to All Modules</button>
        </div>
      ) : selectedModule ? (
        <div>
          <h2>{selectedModule.code}: {selectedModule.full_name}</h2>
          <p>Continuous Assesment Allocation: {selectedModule.ca_split}%</p>
          <button onClick={() => handleCohortsClick(selectedModule)}>View Cohorts Associated</button>
          <button onClick={handleBackClick}>Return to All Modules</button>
        </div>
      ) : (
        <ul>
          {modules.map(module => (
            <li key={module.code}>
              {module.full_name}{' '}
              <button onClick={() => setSelectedModule(module)}>View This Module</button>
              {module === selectedModule ? (
                <div>
                  <p>Continuous Assesment Allocation: {module.ca_split}%</p>
                  <button onClick={() => handleCohortsClick(module)}>View Cohorts Associated</button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllModules; 
