import React, { Component } from "react";
import Header from "./Header";
import data from "../sources/doctor.json"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateSelect extends Component {
    state = {
        doctors: data.doctors,
    }

    render() {
        const {  doctors } = this.state;
        const url_path = window.location.pathname;
        const id = url_path.split('/')[2];
        // console.log(id, typeof id)
        // console.log(doctors.filter(obj => obj.id == id)[0])


        const allowedDates = [new Date('2023-09-20'), new Date('2023-09-25'), new Date('2023-09-26')];

        return (
            <>
            <Header />
            <div className="pick-date">
                <h1>Select the Date</h1>
                <DatePicker
                includeDates={allowedDates}
                />
            </div>
            </>
        )      
    }
}

export default DateSelect;