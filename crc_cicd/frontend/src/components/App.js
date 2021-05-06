import React, { Component } from "react";
import { render } from "react-dom";
import './App.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
    }

    componentDidMount() {
        fetch("api/message")
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data => {
                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
            });
    }

    render() {
        return (
            <div>
                {this.state.data.map(message => {
                    return (
                        <div className="container">
                            <p className="index">{message.id}</p>
                            <h1>Title: {message.title}</h1>
                            <h2>Name: {message.name}</h2>
                            <p>{message.message}</p>
                        </div>

                    );
                })}
            </div>
        );
    }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);