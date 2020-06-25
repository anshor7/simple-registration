import React from 'react';
import './index.css';
import axios from "axios";

function ValidationMessage(props) {
  if (!props.valid) {
    return(
      <div className='error-msg'>{props.message}</div>
    )
  }
  return null;
}

const months = [ "","January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December"]

class Registration extends React.Component {
  state = {
    phone: '', 
    phoneValid: false,
    firstName: '', 
    firstNameValid: false,
    lastName: '', 
    lastNameValid: false,
    dob: new Date(), 
    dobValid:true,
    month: 0,
    day: 0,
    year: 0,
    email: '', 
    emailValid: false,
    gender: '', 
    formValid: false,
    formSuccess: false,
    errorMsg: {}
  }

  validateForm = () => {
    const {phoneValid, firstNameValid, lastNameValid, dobValid, emailValid} = this.state;
    this.setState({
      formValid: phoneValid && firstNameValid && lastNameValid && dobValid && emailValid
    })
  }

  updatePhone = (phone) => {
    this.setState({phone}, this.validatePhone)
  }

  validatePhone = () => {
    const {phone} = this.state;
    let phoneValid = true;
    let errorMsg = {...this.state.errorMsg}

    if (phone.length === 0) {
      phoneValid = false;
      errorMsg.phone = 'Phone is required'
    } else if (!/(?:\+62)?0?8\d{2}(\d{8})/.test(phone)){
      phoneValid = false;
      errorMsg.phone = 'Invalid phone format'
    } else {
      axios.get('http://localhost:8080/user/check-unique-field', 
        {
          params: {phone: phone}
        }
      ).then((response) => {
          if (response.data === false) {
            phoneValid = false;
            errorMsg.phone = 'Phone number already exists';
            this.setState({phoneValid, errorMsg}, this.validateForm);
          }
          console.log('response:', response);
        }, (error) => {
          console.log(error);
      })
    }

    this.setState({phoneValid, errorMsg}, this.validateForm)
  }

  updateFirstName = (firstName) => {
    this.setState({firstName}, this.validateFirstname)
  }

  validateFirstname = () => {
    const {firstName} = this.state;
    let firstNameValid = true;
    let errorMsg = {...this.state.errorMsg}

    if (firstName.length === 0) {
      firstNameValid = false;
      errorMsg.firstName = 'Firstname is required'
    }

    this.setState({firstNameValid, errorMsg}, this.validateForm)
  }

  updateLastName = (lastName) => {
    this.setState({lastName}, this.validateLastName)
  }

  validateLastName = () => {
    const {lastName} = this.state;
    let lastNameValid = true;
    let errorMsg = {...this.state.errorMsg}

    console.log(lastName.length)
    if (lastName.length === 0) {
      lastNameValid = false;
      errorMsg.lastName = 'LastName is required'
    }

    this.setState({lastNameValid, errorMsg}, this.validateForm)
  }

  validateDob = () => {
    let {dob, year, month, date} = this.state;
    let dobValid = true;
    let errorMsg = {...this.state.errorMsg}

    if(year !== 0 && month !== 0 && date !== 0) {
      dob = new Date(year+"/"+month+"/"+date);
      console.log(dob)
      if (!(dob instanceof Date) && isNaN(date.valueOf())) {
        dobValid = false;
        errorMsg.dob = 'Invalid Date of Birth'
      }
    }
    

    this.setState({dobValid, errorMsg}, this.validateForm)
  }

  updateMonth = (e) => { this.setState({month:e.target.value}, this.validateDob) }
  updateDate = (e) => { this.setState({date:e.target.value}, this.validateDob) }
  updateYear = (e) => { this.setState({year:e.target.value}, this.validateDob) }

  updateGender = (gender) => {
    this.setState({gender})
  }

  updateEmail = (email) => {
    this.setState({email}, this.validateEmail)
  }

  validateEmail = () => {
    const {email} = this.state;
    let emailValid = true;
    let errorMsg = {...this.state.errorMsg}

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      emailValid = false;
      errorMsg.email = 'Invalid email format'
    } else {
      axios.get('http://localhost:8080/user/check-unique-field', 
        {
          params: {email: email}
        }
      ).then((response) => {
          if (response.data === false) {
            emailValid = false;
            errorMsg.email = 'Email already exists';
            this.setState({emailValid, errorMsg}, this.validateForm);
          }
          console.log('response:', response);
        }, (error) => {
          console.log(error);
      })
    }

    this.setState({emailValid, errorMsg}, this.validateForm)
  }

  onSubmit = (event) => {
    event.preventDefault();
    const {formValid} = this.state;
    if (formValid === true) {
      let {phone, firstName, lastName, dob, email, formSuccess} = this.state;
      axios.post('http://localhost:8080/user', 
        {
          phone: phone,
          first_name: firstName,
          last_name: lastName,
          dob: dob,
          gender: "male",
          email: email
        }
      ).then((response) => {
          console.log('response:', response);
          formSuccess = true;
          this.setState({formSuccess});
        }, (error) => {
          console.log(error);
      })

    } else {
      console.log("not ok");
    }
  }

  handleLogin = () => { // login page is not found in the requirement
    window.location.reload();
  }

  render() {
    const monthOptions = [];
    for (let i=1; i <= 12; i++) { monthOptions.push(i); }
    const dayOptions = [];
    for (let i=1; i <= 31; i++) { dayOptions.push(i); }
    const yearOptions = [];
    for (let i=1900; i <= 2020; i++) { yearOptions.push(i); }

    return (
      <div className='App'>
        <main role='main'>
          <form action='#' id='js-form' onSubmit={this.onSubmit}>
            <fieldset disabled={this.state.formSuccess}>
              <label className='form-header'>Registration</label>
              <div className='form-group'>
                <ValidationMessage valid={this.state.phoneValid} message={this.state.errorMsg.phone} />
                <input placeholder="Mobile Number" type='text' id='phone' name='phone' className='form-field'
                value={this.state.phone} onChange={(e) => this.updatePhone(e.target.value)}/>
              </div>
              <div className='form-group'>
                <ValidationMessage valid={this.state.firstNameValid} message={this.state.errorMsg.firstName} />
                <input placeholder="First name" type='text' id='firstName' name='firstName' className='form-field'
                value={this.state.firstName} onChange={(e) => this.updateFirstName(e.target.value)}/>
              </div>
              <div className='form-group'>
                <ValidationMessage valid={this.state.lastNameValid} message={this.state.errorMsg.lastName} />
                <input placeholder="Last name" type='text' id='lastName' name='lastName' className='form-field'
                value={this.state.lastName} onChange={(e) => this.updateLastName(e.target.value)}/>
              </div>
              <div className='form-group'>
                <label> Date of Birth</label>
                <select onChange={this.updateMonth} defaultValue={'default'}>
                  <option value="default" disabled>Month</option>
                  {monthOptions.map(option => (
                    <option key={option} value={option}>
                      {months[option]}
                    </option>
                  ))}
                </select>
                <select onChange={this.updateDate} defaultValue={'default'}>
                  <option value="default" disabled>Date</option>
                  {dayOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                 <select onChange={this.updateYear} defaultValue={'default'}>
                  <option value="default" disabled>Year</option>
                  {yearOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                </div>
                <div className='form-group' onChange={(e) => this.updateGender(e.target.value)}>
                  <input type="radio" value="male" className='form-radio' name="gender"/> Male
                  <input type="radio" value="female" className='form-radio' name="gender"/> Female
                </div>
                <div className='form-group'>
                  <ValidationMessage valid={this.state.emailValid} message={this.state.errorMsg.email} />
                  <input placeholder="Email" type='email' id='email' name='email' className='form-field'
                  value={this.state.email} onChange={(e) => this.updateEmail(e.target.value)}/>
                </div>
                <div className='form-controls'>
                  <button className='button' type='submit'>Register</button>
                </div>
              </fieldset>
          </form>
        </main>

        <div className='footer'>
            {this.state.formSuccess ? 
            <div className='footer footer-login'>
              <button className='button' type='submit' onClick={this.handleLogin}>Login</button>
            </div>
            :
            <div className='footer footer-non-login'>
              Footer
            </div>
            }
        </div>
      </div>
    );
  }
}

export default Registration;