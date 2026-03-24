import React, { Component } from "react";
import Header from "./Header";
import data from "../sources/doctor.json"
import { MdAccountBox, MdSmartToy, MdCalendarMonth, MdList } from "react-icons/md";
import { Link } from "react-router-dom";

class ContactCard extends Component {
  render() {
      return (
          // SECURITY: Use React Router <Link> instead of onClick with
          // window.location.pathname to prevent open-redirect vulnerabilities
          // and ensure navigation stays within the app's router context.
          <Link to={`/profile/${this.props.id}`} className="card-link" key={this.props.id}>
              <div className="card">
                  <span className="tooltiptext">Click to View Details</span>
                  <div className="card-title">
                      {this.props.username}
                  </div>
                  <div className="info">
                      <p>
                          <MdAccountBox /> <b>Name:</b> {this.props.name}
                      </p>
                      <p>
                          <MdSmartToy /> <b>Major:</b> {this.props.major}
                      </p>
                      <p>
                          <MdCalendarMonth /> <b>Available Dates:</b> {this.props.available_dates}
                      </p>
                      <p>
                          <MdList /> <b>Waiting List:</b> {this.props.waiting_list}
                      </p>
                  </div>
              </div>
          </Link>
      )
  }
}


class DoctorAppointment extends Component {
  state = {
      doctors: data.doctors,
      isLoading: false,
      errors: null,
  }

  render() {
      const { isLoading, doctors } = this.state;
      return (
          <>
              <Header />
              <div className="content">
                <h1 className="select-doctor">Select Your Doctor</h1>
                  {!isLoading ? (
                      <div className="card-list">
                          {doctors.map(doctor => (
                              <ContactCard
                                  key={doctor.id}
                                  id={doctor.id}
                                  name={doctor.name}
                                  major={doctor.major}
                                  available_dates={doctor.available_dates.join(", ")}
                                  waiting_list={doctor.waiting_list}
                              />
                          ))}
                      </div>
                  ) : (
                      <p>Loading...</p>
                  )}
              </div>
          </>
      )
  }

}

export default DoctorAppointment;