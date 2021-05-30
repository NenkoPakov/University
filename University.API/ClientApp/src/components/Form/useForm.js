import axios from 'axios';
import { useState } from 'react'

const useForm = validateInfo => {
    const [values, setValues] = useState({
        firstName: "",
        secondName: "",
        lastName: "",
        course: 0
    })

    const [errors, setErrors] = useState({})

    const handleChange = e => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validateInfo(values));

        if (Object.keys(errors).length === 0) {
            axios.post("https://localhost:44379/students/add", values)
        }
    };


    return { values, errors, handleChange, handleSubmit };
};

export default useForm