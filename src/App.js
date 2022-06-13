import React, { useEffect, useState } from 'react';
import './App.css';

import AddForm from './AddForm.js';
import Person from './Person.js'
import axios from 'axios';
const URL = "http://localhost:3000/api/v1/persons";
function App() {
  const [persons, setPersons] = useState([]);
  function add() {
    document.querySelector('.form-popup').style.display = 'block';
  }
  async function getPersons() {
    await axios.get(URL)
      .then((result) => {
        setPersons(result.data.data.persons);

      })
      .catch(err => {
        console.log(err);
      });

  }
  useEffect(() => {
    getPersons()
  }, []);

  return (
    <div className='app-react'>
      <div className='table'>
        <div className='persons-table'>
          <div class="fields">
            <span>STT</span>
            <span>Họ tên</span>

          </div>
          <div className='list'>
            {
              persons && persons.map((person, index) => (<Person key={index} persons={persons} person={person} index={index + 1} getPersons={getPersons} />))
            }
          </div>
          <div className='bottom'>
            <div className="button">
              <i className="fas fa-plus-circle add" onClick={add}></i>
            </div>

          </div>
        </div>
        <AddForm url={URL} isSubmited={getPersons} />
      </div>

    </div >
  );
}




export default App;
