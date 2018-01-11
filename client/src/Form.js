import React, { Component } from 'react'

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
    fetch('http://localhost:3000/api/users', {
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
      <form onSubmit={this.handleSubmit}>
        <label>name: </label>
        <input type="text" name="name" value={this.state.form.name} onChange={this.handleChange}/>
        <label>location: </label>
        <input type="text" name="location" value={this.state.form.location} onChange={this.handleChange}/>
        <label>phone: </label>
        <input type="tel" name="phone" value={this.state.form.phone} onChange={this.handleChange}/>
        <input type="submit" value="get it" />
        <Errors errors={this.state.errors} />
      </form>
    )
  }
}

const Errors = ({ errors }) => {
  if (!errors) {
    return null
  }
  return Object.keys(errors).map(key => {
    return <div style={{ color: 'red' }}>{key}: {errors[key]}</div>
  })
}


export default Form
