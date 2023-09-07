import React, { Component } from "react";
import Header from "./Header";
import data from "./doctor.json"
import { MdAccountBox, MdSmartToy, MdCalendarMonth, MdList } from "react-icons/md";

class ContactCard extends Component {
  constructor(props) {
      super(props);
      this.cardClicked = this.cardClicked.bind(this);
  }

  cardClicked() {
      window.location.pathname = `/profile/${this.props.id}`;
  }

  render() {
      return (
          <div className="card" key={this.props.id} onClick={this.cardClicked}>
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
                              // <li key={user.id}>{user.name} {user.address.city}</li>
                              <ContactCard
                                  key = {doctor.id}
                                  id =  {doctor.id}
                                  name = {doctor.name}
                                  major = {doctor.major}
                                  available_dates = {doctor.available_dates.join(", ")}

                                  waiting_list = {doctor.waiting_list}
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