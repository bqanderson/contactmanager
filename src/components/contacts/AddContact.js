import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import uuid from 'uuid';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  onSubmit = (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Check for errors
    if (name === '') {
      this.setState({
        errors: { name: 'Contact Name is required, please add...' }
      });
      return;
    }

    if (email === '') {
      this.setState({
        errors: { email: 'Contact Email is required, please add...' }
      });
      return;
    }

    if (phone === '') {
      this.setState({
        errors: { phone: 'Contact Phone is required, please add...' }
      });
      return;
    }

    const newContact = {
      id: uuid(),
      name,
      email,
      phone,
      errors: {}
    };

    dispatch({ type: 'ADD_CONTACT', payload: newContact });

    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    lable="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    lable="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    lable="Phone"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
