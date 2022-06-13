import React, { useEffect, useState } from 'react';
import './AddForm.css'
import axios from 'axios';
import { URL } from '../config/Path';
function AddForm({ isSubmited }) {
    const [name, setName] = useState('');
    async function handleSubmit(event) {
        event.preventDefault();

        if (name !== '') {
            await axios.post(URL, { name: name })
                .then((res) => {
                    isSubmited();
                    setName('');
                })
                .catch(err => console.log(err));
        }
        document.querySelector('.form-popup').style.display = 'none';
    }

    function handleCancel() {
        document.querySelector('.form-popup').style.display = 'none';
    }
    function handleInput(event) {
        setName(event.target.value);
    }

    return (
        <div className='form-popup'>

            <form onSubmit={handleSubmit}>
                <label for='name'>Nhập tên</label>
                <input type='text' placeholder='Nhập họ tên' id='name' value={name} onChange={handleInput}></input>
                <div className='buttons'>
                    <button className='button-cancel' type='button' onClick={handleCancel}>Hủy</button>
                    <button className='button-add' type='submit'>Thêm</button>
                </div>
            </form>
            <div className='back'></div>
        </div>
    );
}
export default AddForm;