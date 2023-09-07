import React, { Component } from "react";
import Header from "./Header";
// import { MdRemoveRedEye } from "react-icons/md";
import data from "../sources/ProfileData.json";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

class GraphTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
    return (
        <LineChart 
            width={800} 
            height={300} 
            data={this.props.data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']}/>
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey={this.props.first_key}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey={this.props.second_key} stroke="#82ca9d" />
        </LineChart>
    )
    }
}

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
        const bmi = patient.vital_signs.bmi;
        const prescription = patient.prescription;

        return (
            <>
                <Header />
                <div className="content">
                    <div className="profile">
                        <h1> {patient.name} </h1>
                        <p>Age: <u>{patient.age}</u> </p>
                        <p>Gender: <u>{patient.gender}</u> </p>
                        <h3>Records: </h3>
                        <ul>
                            <li><b>Blood Pressure: </b><u>{blood_pressure.current.systolic}/{blood_pressure.current.diastolic}</u> {blood_pressure.current.unit}</li>
                            <ul>
                                <li>Blood Pressure History Records</li>
                            </ul>
                            <GraphTab
                                data={blood_pressure.history}
                                first_key="systolic"
                                second_key="diastolic"
                            />
                            <li><b>BMI: </b>{bmi.current}
                                <ul>
                                    <li>Height: <u>{patient.vital_signs.height.cm_value}</u> cm</li>
                                    <li>Weight: <u>{patient.vital_signs.weight.kg_value}</u> kg</li>
                                    <li>BMI History Records</li>
                                </ul>
                            </li>
                            <GraphTab
                                data={bmi.history}
                                first_key="value"
                            />
                            <li><b>Prescription: </b></li>
                            <ul>
                                <li>Medication: <u>{prescription.medication}</u></li>
                                <li>Start Date: <u>{prescription.start_date}</u></li>
                                <li>Dosage: <u>{prescription.dosage}</u></li>
                                <li>Instructions: <u>{prescription.instructions}</u></li>
                                <li>Refills: <u>{prescription.refills}</u></li>
                            </ul>
                        </ul>
                    </div>
                    <h3 className="book-button" onClick={() => window.location.pathname = '/docters'}>Book Appointment</h3>
                </div>
            </>
        )
    }
}

export default Profile