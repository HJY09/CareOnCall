import React, { Component } from "react";
import Header from "./Header";
import data from "../sources/doctor.json"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// SECURITY: Use React Router's useParams via a wrapper instead of
// parsing window.location.pathname manually. Direct URL parsing is
// fragile and can be manipulated; React Router validates routes properly.
import { useParams } from "react-router-dom";

class DateSelectInner extends Component {
    state = {
        doctors: data.doctors,
        selectedDate: null,
    }

    render() {
        const { doctors } = this.state;
        const id = this.props.id;

        // SECURITY: Use strict equality (===) instead of loose equality (==)
        // to avoid type coercion vulnerabilities when comparing the URL param
        // (a string) with doctor IDs (numbers). Parse id to integer explicitly.
        const parsedId = parseInt(id, 10);
        const selectedDoctor = doctors.find(obj => obj.id === parsedId) || null;

        // Build allowed dates from the selected doctor's available_dates
        const allowedDates = selectedDoctor
            ? selectedDoctor.available_dates.map(d => new Date(d))
            : [];

        return (
            <>
            <Header />
            <div className="pick-date">
                <h1>Select the Date</h1>
                {selectedDoctor ? (
                    <>
                        <p>Doctor: <strong>{selectedDoctor.name}</strong> ({selectedDoctor.major})</p>
                        <DatePicker
                            selected={this.state.selectedDate}
                            onChange={(date) => this.setState({ selectedDate: date })}
                            includeDates={allowedDates}
                            placeholderText="Select an available date"
                        />
                    </>
                ) : (
                    <p>Doctor not found. Please go back and select a valid doctor.</p>
                )}
            </div>
            </>
        )
    }
}

// Functional wrapper to inject React Router params as props
function DateSelect(props) {
    const { id } = useParams();
    return <DateSelectInner {...props} id={id} />;
}

export default DateSelect;