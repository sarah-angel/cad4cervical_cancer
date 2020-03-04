import React, { Component } from 'react'

class PatientDetails extends Component{
    componentDidMount = () => {
        console.log(this.props.patient)
    }

    componentDidUpdate = (props) => {
        console.log(this.props.patient)
    }

    render() {
        return (
            <div>
                First Name: kjfkdj 
                Middle Name: kjdkfj 
            </div>
        )
    }
}

export default PatientDetails