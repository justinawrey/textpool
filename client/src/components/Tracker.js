import { Component } from 'react'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: Date.now(),
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({ time: Date.now() })
            console.log(Date.now())
        }, 500)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    componentDidUpdate(prevProps) {
        const { actionAt, action } = this.props
        // if (actionAt > prevProps.actionAt) {
        //     this.timer = setInterval(() => {
        //         this.setState({ time: Date.now() })
        //     }, 500)
        // }

        const { time } = this.state
        if (time >= actionAt) {
            action()
            // clearInterval(this.timer)
            // this.setState({ time: 0 })
        }
    }

    render() {
        return null
    }
}
