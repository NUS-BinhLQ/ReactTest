import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Button.css'
const URL = "http://localhost:3000/api/v1/persons";

function Person({ person, persons, index, getPersons }) {

    const [isEdit, setEdit] = useState(true);
    const [name, setName] = useState(person.name);

    function handleSetName(event) {
        setName(event.target.value);
    }

    async function edit() {
        if (!isEdit) {
            await axios.patch(`${URL}/${person.id}`, { name: name })
                .catch(err => console.log(err));
        }
        setEdit(!isEdit);

    }
    async function moveUp() {

        const i = persons.indexOf(person);
        await axios.patch(`${URL}/${person.id}`, { name: persons[i - 1].name })
            .catch(err => console.log(err));
        await axios.patch(`${URL}/${persons[i - 1].id}`, { name: person.name })
            .then(() => getPersons())
            .catch(err => console.log(err));
    }

    async function moveDown() {
        const i = persons.indexOf(person);
        await axios.patch(`${URL}/${person.id}`, { name: persons[i + 1].name })
            .catch(err => console.log(err));
        await axios.patch(`${URL}/${persons[i + 1].id}`, { name: person.name })
            .then(() => getPersons())
            .catch(err => console.log(err));
    }

    async function remove(e) {
        await axios.delete(`${URL}/${person.id}`)
            .then(() => getPersons())
            .catch(err => console.log(err));


    }

    return (
        <div className='person'>
            <div class="id"><span>{index}</span></div>
            <div class="name">
                {isEdit && <span >{person.name}</span>}
                {!isEdit && <input value={name} onChange={handleSetName} />}
            </div>


            {isEdit && <div className="button">
                <i className='far fa-edit edit' onClick={edit}></i>
            </div>}
            {!isEdit && <div className="button">
                {<i className='fas fa-check edit' onClick={edit}></i>}
            </div>}

            <div className="button">
                {persons.indexOf(person) >= 1 && <i className="fas fa-angle-up arrow" onClick={moveUp}></i>}
            </div>

            <div className="button">
                {persons.indexOf(person) < persons.length - 1 && <i className="fas fa-angle-down arrow" onClick={moveDown}></i>}
            </div>

            <div className="button">
                <i className="far fa-trash-alt delete" onClick={remove}></i>
            </div>

        </div>
    );
}
export default Person;