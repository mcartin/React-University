import React, { useState } from 'react';
import AllDegrees from './components/AllDegrees';
import NewDegree from './components/NewDegree';
import AllCohorts from './components/AllCohorts';
import NewCohort from './components/NewCohort';
import ModulesInACohort from './components/ModulesInACohort';
import AllModules from './components/AllModules';
import NewModule from './components/NewModule';
import AllStudents from './components/AllStudents';



function App() {
  const [display, setDisplay] = useState('');
  const [selectedCohortCode, setSelectedCohortCode] = useState('');

  return (
    <div className='button-container'>
      <button onClick={() => setDisplay('alldegrees')}>All Degrees</button>
      <button onClick={() => setDisplay('newDegree')}>Create a New Degree</button>
      <button onClick={() => setDisplay('allcohorts')}>All Cohorts</button>
      <button onClick={() => setDisplay('newCohort')}>Create a New Cohort</button>
      <button onClick={() => setDisplay('newModule')}>Create a New Module</button>
      <button onClick={() => setDisplay('allmodules')}>All Modules</button>
      <button onClick={() => setDisplay('allstudents')}>All Students</button>

      {display === 'alldegrees' && <AllDegrees />}
      {display === 'newDegree' && <NewDegree />}
      {display === 'allcohorts' && <AllCohorts setSelectedCohortCode={setSelectedCohortCode} />}
      {display === 'newCohort' && <NewCohort />}
      {display === 'modulesInACohort' && <ModulesInACohort cohortCode={selectedCohortCode} />}
      {display === 'allmodules' && <AllModules />}
      {display === 'newModule' && <NewModule />}
      {display === 'allstudents' && <AllStudents />}
    </div>
  );
}

export default App;
