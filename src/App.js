import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';

function Person({ name, index }) {

  return (
    <div className='person'>
      <div class="id"><span>{index}</span></div>
      <div class="name">
        <span >{name}</span>
      </div>

      <i class="far fa-edit"></i>
      <i class="fas fa-angle-up"></i>
      <i class="fas fa-angle-down"></i>
      <i class="far fa-trash-alt"></i>
    </div>
  );
}


function App() {
  const URL = "http://localhost:3000/api/v1/persons";
  const [persons, setPersons] = useState([]);
  function getPersons() {
    fetch(URL)
      .then(res => res.json())
      .then(result => setPersons(result.data.persons))
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    getPersons(URL);
  }, []);


  return (
    <div className='app-react'>
      <div className='persons-table'>
        {
          persons.map((person, index) => (<Person name={person.name} index={person.id} />))
        }
      </div>
    </div>
  );
}




export default App;
