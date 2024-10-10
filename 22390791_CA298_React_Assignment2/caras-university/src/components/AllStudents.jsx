import React, { useEffect, useState } from 'react';

function AllStudents() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentGrades, setStudentGrades] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/student/')
      .then(response => response.json())
      .then(data => {
        // Fetch the related cohort for each student and update the state
        Promise.all(data.map(student =>
          fetch(student.cohort)
            .then(response => response.json())
            .then(cohort => ({ ...student, cohort }))
        ))
        .then(updatedStudents => setStudents(updatedStudents))
        .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }, []);

  const handleShowDetails = (student) => {
    setSelectedStudent(student);

    fetch(`http://127.0.0.1:8000/api/grade/?student=${student.student_id}`)
      .then(response => response.json())
      .then(data => {
        const grades = data.map(grade => ({
          subject: grade.module.split('/').reverse()[1],
          grade: grade.total_grade
        }));
        setStudentGrades(grades);
      })
      .catch(error => console.error(error));

    window.history.pushState(null, '', `/students/${student.student_id}`);
  };

  const handleGoBack = () => {
    setSelectedStudent(null);
    setStudentGrades([]);
    window.history.back();
  };

  return (
    <div>
      <h2>All Students</h2>
      {selectedStudent ? (
        <div>
          <h3>Name: {selectedStudent.first_name} {selectedStudent.last_name}</h3>
          <p>Student ID: {selectedStudent.student_id}</p>
          <p>Cohort: {selectedStudent.cohort.name}</p>
          {studentGrades.map(grade => (
            <p key={grade.subject}>Subject: {grade.subject}<br></br>Grade: {grade.grade}%</p>
          ))}
          <button onClick={handleGoBack}>Return</button>
        </div>
      ) : (
        <ul>
          {students.map(student => (
            <li key={student.student_id}>
              <p>Name: {student.first_name} {student.last_name}</p>
              <p>Student ID: {student.student_id}</p>
              <button onClick={() => handleShowDetails(student)}>Show Details</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllStudents;
