import React, {useState} from "react";
import './Form.css';

const Form = () => {
    const init = {name: "", title: "", message: ""};
    const [enteredValues, setEnteredValues] = useState(init);

    const nameInputChangeHandler = (event) => {
        setEnteredValues(
            {name: event.target.value,
                message: enteredValues.message,
                title: enteredValues.title
            }
        )
    }

    const titleInputChange = (event) =>{
        setEnteredValues(
            {title: event.target.value,
                message: enteredValues.message,
                name: enteredValues.name
            }
        )
    }

    const descriptionInputChange = (event) => {
        setEnteredValues({
            message: event.target.value,
            title: enteredValues.title,
            name: enteredValues.name
        })
    }

    const submitHandler = (event) => {
        // event.preventDefault()
        console.log(enteredValues)
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(enteredValues)
        }
        fetch("api/message", requestOptions)
            .then(response => console.log(response.json()))
            .catch(error => console.log(error))
    }

    return (
        <div className="containter">
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" onChange={nameInputChangeHandler}/>
                </div>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={titleInputChange}/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" onChange={descriptionInputChange}/>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default Form;