import React, { Component } from "react";
import { render } from "react-dom";
import './App.css'
import packageVersion from '../../package.json'
import Form from './Form'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading",
            form: false
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
    onShowFormClick = () => {
        this.setState({form: !this.state.form,
            data: this.state.data,
            loaded: this.state.loaded,
            placeholder: "Loading",
        })
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <div>Current version: {packageVersion.version}</div>
                {!this.state.form && <div><button onClick={this.onShowFormClick}>Add record</button></div>}
                {this.state.form && <Form/>}
                {this.state.data.map(message => {
                    return (
                        <div className="container" key={message.id}>
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