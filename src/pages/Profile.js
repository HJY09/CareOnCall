import React, { Component } from "react";
import Header from "./Header";
// import { MdRemoveRedEye } from "react-icons/md";
import data from "../sources/ProfileData.json";
import { LineChart, Line } from 'recharts';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { hidden: true }
    }

    showHidden = () => {
        this.setState({ hidden: !this.state.hidden });
    };

    render() {
        // const hiddenInfo = this.state.hidden ? "*********" : "Here are some hidden information...";
        const patient = data.patient;
        const blood_pressure = patient.vital_signs.blood_pressure;
        const renderLineChart = (
            <LineChart width={400} height={400} data={blood_pressure.history}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
          );

        return (
            <>
                <Header />
                <div className="content">
                    <div className="profile">
                        <h1> {patient.name} </h1>
                        <p>Age: {patient.age} </p>
                        <p>Gender: {patient.gender} </p>
                        <h3>Records: </h3>
                        <ul>
                            <li><b>Blood Pressure: </b>{blood_pressure.current.systolic}/{blood_pressure.current.diastolic} {blood_pressure.current.unit}</li>

                            <li>BMI: </li>
                            <li>Prescription: </li>
                        </ul>
                    </div>
                    <h3 className="book-button" onClick={() => window.location.pathname = '/book'}>Book Appointment</h3>
                </div>
            </>
        )
    }
}

export default Profile