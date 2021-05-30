import React, { useState, useEffect } from 'react'
import InputField from './InputField'
import validateInfo from './validateInfo'
import styled from 'styled-components'
import { FormButton } from '../Button'
import axios from 'axios'
import { FaTimes } from 'react-icons/fa'

const DefaultValues = {
    text: "",
    number: 0,
    checkbox: false,
    "select-one": null,
    "select-multiple": null,
}

const FormTitles = {
    add: "Add",
    edit: "Edit",
    "add-subject": "Register to subject",
    "mark-subject-as-finished": "Finish subject",
    "set-subject-to-teacher": "Set subject",
}

const FormWrapper = styled.div`
display:flex;
position:fixed;
z-index:999;
width:100%;
height:100%;
background-color:#1e9080f5;
align-items:center;
top:0;
left:0;
transition: 0.3s ease-in-out;
margin:auto;
`

const Icon = styled.div`
position:absolute;
top:1.2rem;
right:1.5rem;
background:transparent;
font-size:2rem;
cursor: pointer;
outline:none;
`
const FormDesctioption = styled.div`
padding-bottom:30px;
text-align: center;
text-transform:uppercase;
text-decoration: underline;
font-weight:bold;
font-size:2rem;
`
const CloseIcon = styled(FaTimes)`
color:#000d1a;
`

const FormContainer = styled.div`
    width:300px;
    height:500px;
	position: fixed;
	top:0;
	bottom: 0;
	left: 0;
	right: 0;

	margin: auto;
`

const ErrorWrapper = styled.div`
    padding:0;
    text-align: justify;
    margin-bottom: 1rem;
    color: red;
    font-weight: bold;
`

const ListItem = styled.li`
    padding-left:20%; 
    list-style-type: none;
    font-size:1.5rem;
    border-bottom: 1px solid #000000;

&:last-child {
  border: none;
}

&:hover {
    transform:translateY(-2px);
}
`

const DropdownItem = styled.option`
    display:block;
    width:100%;
    padding:12px;
    border:2px solid #dddddd;
    border-radius:5px;
    margin:auto;
    color: black;

    &:hover {
        background-color: gray;
    }
`
const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 300px;
    max-height:200px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    overflow: auto;
`
const DropdownButton = styled.select`
    background-color: darkgray;
    width:300px;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
`

const Dropdown = styled.div`
    position: relative;
    display: inline-block;

    &:hover ${DropdownContent}{
        display:block
    }

    &:hover ${DropdownButton}{
        background-color: #3e8e41;
    }
`

function Form({ hideForm, formIsOpen, formOperation, entity, entityId, formData }) {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [url, setUrl] = useState("")
    const [fromSubmit, setFromSubmit] = useState(false)
    const [options, setOptions] = useState({})
    const [selectedListItemsId, setSelectedListItemsId] = useState([])
    const [dropdownSelectedItemIndex, setDropdownSelectedItemIndex] = useState("")

    useEffect(() => {
        if (formIsOpen) {
            let keys = Object.keys(formData);
            let data = {}
            let promises = {}

            keys.forEach(key => {
                if (["select-one", "select-multiple"].includes(formData[key].type)) {
                    promises[key] = (getSelectOptions(formData[key], key))
                }
            });

            let selectOptions = {}
            Promise.all(Object.values(promises))
                .then(data => Object.values(data).map((value, index) => selectOptions = { ...selectOptions, [Object.keys(promises)[index]]: value }))
                .then(() => {
                    let data = {}
                    if (formOperation === "edit") {
                        axios.get(`https://localhost:44379/${entity.toLowerCase()}/get-by-id/${entityId}`)
                            .then(res => res.data)
                            .then(resData => Object.keys(resData).map(key => {
                                if (resData[key] && ["select-one", "select-multiple"].includes(formData[key]?.type)) {
                                    // setDropdownSelectedItemIndex((options.indexOf(resData[key])).toString())
                                    let value = ((selectOptions[key][0].hasOwnProperty("id")
                                        ? selectOptions[key].indexOf(Object.values(selectOptions[key]).filter(x => x.id === resData[key])[0]).toString()
                                        : selectOptions[key].indexOf(resData[key])).toString())

                                    data[key] = value
                                }

                                data[key] = resData[key];
                            }))
                            .then(() => setValues({ ...values, ...data }))
                            .catch()
                    } else {
                        // keys.map(key => {
                        //     return data[key] = ["select-one", "select-multiple"].includes(formData[key].type)
                        //         ? selectOptions[key][0].hasOwnProperty("id")
                        //             ? selectOptions[key][0].id
                        //             : selectOptions[key][0]
                        //         : DefaultValues[formData[key].type]
                        // })
                        keys.map(key => data[key] = DefaultValues[formData[key].type])
                        setValues(data)

                    }
                })
                .then(() => setOptions(selectOptions))
            // .then(() => keys.map(key => data[key] = ["select-one", "select-multiple"].includes(formData[key].type)
            //     ? selectOptions[key][0].hasOwnProperty("id")
            //         ? selectOptions[key][0].id
            //         : selectOptions[key][0]
            //     : DefaultValues[formData[key].type]))

            // if (formOperation === "mark-subject-as-finished" || formOperation === "set-subject-to-teacher" || formOperation === "add-subject") {
            //     getSelectOptions(formData.subjectId.url)
            // } else if (["add", "edit"].includes(formOperation) && entity === "Subjects") {
            //     getSelectOptions(formData.teacherId.url)
            // } else if (["add", "edit"].includes(formOperation) && entity === "Teachers") {
            //     setOptions(formData.title.values)
            // } else if (["add", "edit"].includes(formOperation) && entity === "Students") {
            //     setOptions(formData.course.values)
            // }

            // keys.map(key => data[key] = ["select-one", "select-multiple"].includes(formData[key].type)
            //     ? selectOptions[key][0].hasOwnProperty("id")
            //         ? selectOptions[key][0].id
            //         : selectOptions[key][0]
            //     : DefaultValues[formData[key].type])
            // keys.map(key => data[key] = DefaultValues[formData[key].type])
            // setValues(data)
        }
    }, [formData])

    useEffect(() => {
        setErrors({})
        setUrl(`https://localhost:44379/${entity.toLowerCase()}/${formOperation}`)
    }, [formOperation])

    const handleChange = e => {
        const target = e.target;
        const name = target.name ? target.name : target.title;
        let value = target.selectedOptions
            ? target.type === "select-multiple"
                ? [...(target.selectedOptions)].map(x => parseInt(x.value))
                : name === "title"
                    ? target.selectedOptions[0].value
                    : parseInt(target.selectedOptions[0].value)
            : target.value;

        setValues({
            ...values,
            [name]: value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        setFromSubmit(true);
        if (formOperation === 'add' || formOperation === "edit") {
            setErrors(validateInfo(entity, values))
        }
    }

    const getSelectOptions = (fieldData, key) => {
        let hasUrl = fieldData.hasOwnProperty("url")
        let url = fieldData.url

        if ((formOperation === "mark-subject-as-finished" || formOperation === "add-subject") && hasUrl) {
            url += `/${entityId}`
        }

        if (hasUrl) {
            return axios.get(url)
                .then(res => res.data)
            // .then(data => setOptions({ ...options, [key]: data }))
        } else {
            // return Promise.resolve(setOptions({ ...options, [key]: fieldData.values }))
            return Promise.resolve(fieldData.values)
        }
    };

    // useEffect(() => {
    //     let data = {}
    //     if (options) {
    //         if (formOperation === "edit") {
    //             axios.get(`https://localhost:44379/${entity.toLowerCase()}/get-by-id/${entityId}`)
    //                 .then(res => res.data)
    //                 .then(resData => Object.keys(resData).map(key => {
    //                     if (resData[key] && ["select-one", "select-multiple"].includes(formData[key]?.type)) {
    //                         // setDropdownSelectedItemIndex((options.indexOf(resData[key])).toString())
    //                         let value = ((options[key][0].hasOwnProperty("id")
    //                             ? options[key].indexOf(Object.values(options[key]).filter(x => x.id === resData[key])[0]).toString()
    //                             : options[key].indexOf(resData[key])).toString())

    //                         setValues({ ...values, [key]: value })
    //                     }

    //                     data[key] = resData[key];
    //                 }))
    //                 .then(() => setValues(data))
    //                 .catch()
    //         } else {
    //             // options.map(({ subjectId }) => {
    //             //     data[subjectId] = false;
    //             // })

    //             // setSelectedListItemsId(data)
    //         }
    //     }
    // }, [options])

    useEffect(() => {
        if (fromSubmit) {
            if (!Object.keys(errors).length) {
                hideForm();

                if (formOperation === "mark-subject-as-finished" || formOperation === "add-subject") {
                    values.subjectId.map((item) => {
                        axios.post(url, {
                            studentId: entityId,
                            subjectId: parseInt(item)
                        })
                    })
                } else if (formOperation === "set-subject-to-teacher") {
                    values.subjectId.map((item) => {
                        axios.post(url, {
                            teacherId: entityId,
                            subjectId: parseInt(item)
                        })
                    })
                } else {
                    axios.post(url, { ...values })
                }

                setFromSubmit(false)
                setOptions({})
                setSelectedListItemsId([])
                setDropdownSelectedItemIndex("")
            } else {
                setFromSubmit(false)
            }
        }
    }, [fromSubmit, errors])

    return !formIsOpen
        ? null
        : <FormWrapper>
            <Icon onClick={(e) => { hideForm(); setOptions({}); setDropdownSelectedItemIndex(''); setSelectedListItemsId([]) }} >
                <CloseIcon />
            </Icon>
            <FormContainer>
                <FormDesctioption>{`${FormTitles[formOperation]} form`}</FormDesctioption>
                {<form onSubmit={handleSubmit} method="post">
                    {Object.keys(values).map((key) => (
                        <div>
                            {   formData[key] || formData[key] === '' ?
                                formData[key].type === "select" && options.length
                                    ? <ul>
                                        <label style={{ textDecoration: "underline", fontWeight: 'bold', fontSize: "20px" }} htmlFor={key}>{key}</label>
                                        {
                                            options.map(({ id, name }) => {
                                                return (
                                                    <ListItem>
                                                        <input
                                                            style={{ width: "24px", height: "24px" }}
                                                            type="checkbox"
                                                            onClick={(e) => handleChange(e)}
                                                            checked={selectedListItemsId[id]}
                                                            id={id}
                                                            name={id}
                                                        />
                                                        {name}
                                                    </ListItem>
                                                )
                                            })
                                        }
                                    </ul>
                                    : ["select-one", "select-multiple"].includes(formData[key].type) && options[key] && options[key].length
                                        ?
                                        < DropdownButton

                                            onChange={(e) => handleChange(e)}
                                            multiple={formData[key].type === "select-multiple"}
                                            name={key}
                                            defaultValue="select">
                                            <option value="select" disabled="disabled">Select {key.replace("Id", "")}</option>
                                            {options[key]?.map((element, index) => {
                                                // let { id, name } = element.hasOwnProperty("name") ? element : { id: key === "course" ? index + 1 : index, name: element }
                                                let { id, name } = element.hasOwnProperty("name") ? element : { id: element, name: element }
                                                return (
                                                    <DropdownItem
                                                        selected={formData[key].type === "select-multiple"
                                                            ? values[key]?.includes(id)
                                                            : values[key] === id}
                                                        value={id}>
                                                        {name}</DropdownItem>
                                                )
                                            })
                                            }
                                        </DropdownButton>
                                        : <InputField
                                            label={formData[key].hasOwnProperty("label") ? formData[key].label : key}
                                            type={formData[key].hasOwnProperty("type") ? formData[key].type : "text"}
                                            placeholder={formData[key].hasOwnProperty("label") ? formData[key].label : key}
                                            name={key}
                                            value={values[key]}
                                            handleChange={handleChange}
                                        />
                                : null
                            }
                            {errors[key] && <ErrorWrapper>{errors[key]}</ErrorWrapper>}
                        </div>
                    ))
                    }
                    {<FormButton primary="true" type="submit">
                        {formOperation === "edit" ? "Save changes" : "Submit"}
                    </FormButton>}
                </form>}
            </FormContainer>
        </FormWrapper >
}

export default Form;


// <select onChange={(e) => setDropdownSelecteItemId(e.target.value)}>
//     {options.map(({ subjectName, subjectId }) =>
//         <option selected={subjectName === dropdownSelecteItemId} >
//             {subjectName}
//         </option>)}
// </select>


// const handleClickOnCheckBox = (subjectId) => {
//     if (!selectedListItemsId.includes(subjectId)) {
//         selectedListItemsId.push(subjectId);
//     } else {
//         selectedListItemsId.splice(selectedListItemsId.indexOf(subjectId), 1);
//     }

//     setSelectedListItemsId(selectedListItemsId);
// };

// const handleChange = e => {
//     const target = e.target;
//     const name = e.target.name ? e.target.name : e.target.title;
//     if (target.type === 'checkbox') {
//         selectedListItemsId[name] = target.checked;
//     }

//     const value = target.type === 'checkbox'
//         ? target.checked
//         : name === "title"
//             ? target.dataset['value']
//             : name === "course"
//                 ? parseInt(target.dataset['value'])
//                 : target.id
//                     ? parseInt(target.id)
//                     : target.value             : target.value

//     setValues({
//         ...values,
//         [name]: value
//     });
// }




{/* <Dropdown>
    <label style={{ textDecoration: "underline", fontWeight: 'bold', fontSize: "20px" }} htmlFor={key}>{key}</label>
    <DropdownButton>
        {
            options[0]
                ? !dropdownSelectedItemIndex ? "Select"
                    : options[0].hasOwnProperty("name")
                        ? options[dropdownSelectedItemIndex].name
                        : options[dropdownSelectedItemIndex]
                : null
        }
    </DropdownButton>
    <select onChange={(e) => handleChange(e)} defaultChecked="asd" name="test1">
        <option value="asd">asd</option>
        <option value="asd2">asd2</option>
        <option value="asd3">asd3</option>
    </select>
    <select onChange={(e) => handleChange(e)} defaultChecked="asd" name="test4[]" multiple>
        <option value="asd">asd</option>
        <option value="asd2">asd2</option>
        <option value="asd3">asd3</option>
    </select>

    {/* <DropdownContent>
                                                {
                                                    options.map((x, index) => {
                                                        let { id, name } = x.hasOwnProperty("name") ? x : { id: index, name: x }
                                                        return (
                                                            <div>
                                                                <DropdownItem
                                                                    style={{ backgroundColor: index == dropdownSelectedItemIndex ? "gray" : "" }}
                                                                    data-value={name}
                                                                    id={id}
                                                                    name={key}
                                                                    title={key}
                                                                    onClick={(e) => { handleChange(e); setDropdownSelectedItemIndex(index.toString()); }}
                                                                >
                                                                    {name}
                                                                </DropdownItem>
                                                            </div>

                                                        )
                                                    })
                                                }
                                            </DropdownContent> */}
// </Dropdown >