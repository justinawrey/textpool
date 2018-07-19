import React, { Component } from "react";

export default class Login extends Component {
    componentDidMount() {
        fetch("http://localhost:5000/api/login", {
            mode: "cors"
        })
            .then(res => console.log(res))
            // .then(text => {
            //     console.log(text);
            //     this.setState({
            //         text
            //     });
            // });
    }

    render() {
        // const { text } = this.state;
        // console.log(text);
        return <div>testing</div>
        // return <div>{renderHTML(text)}</div>;
    }
}
