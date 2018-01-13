import React, { Component } from 'react'

import './Form.css'

const INITIAL_STATE = {
  errors: null,
  form: {
    name: '',
    phone: '',
    location: ''
  },
}

class Form extends Component {
  state = INITIAL_STATE

  handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.form)
    })
    .then(res => res.json())
    .then(json => {
      if (json.errors) {
        this.setState({
          errors: json.errors
        })
      } else {
        this.setState(INITIAL_STATE)
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      form: Object.assign({}, this.state.form, {
        [e.target.name]: e.target.value
      })
    })
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <div className="form__input">
            <label>Name: </label>
            <input type="text" name="name" placeholder="Dan" value={this.state.form.name} onChange={this.handleChange}/>
          </div>
          <div className="form__input">
            <label>Location: </label>
            <input type="text" name="location" placeholder="molo #3" value={this.state.form.location} onChange={this.handleChange}/>
          </div>
          <div className="form__input">
            <label>Phone: </label>
            <input type="tel" name="phone" placeholder="406-555-5555" value={this.state.form.phone} onChange={this.handleChange}/>
          </div>
          <input type="submit" value="Keep me posted" />
        </form>
        <Errors errors={this.state.errors} />
      </div>
    )
  }
}

const Errors = ({ errors }) => {
  if (!errors) {
    return null
  }
  return Object.keys(errors).map(key => {
    return <div className="form__error">{key}: {errors[key]}</div>
  })
}


export default Form
