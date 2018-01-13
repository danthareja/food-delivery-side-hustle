import React, { Component } from 'react'

import './Form.css'

const INITIAL_STATE = {
  info: null,
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
        this.setState(Object.assign(INITIAL_STATE, {
          info: 'Great success!'
        }))
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
            <input type="text" name="name" value={this.state.form.name} onChange={this.handleChange}/>
          </div>
          <div className="form__input">
            <label>Location: </label>
            <input type="text" name="location" value={this.state.form.location} onChange={this.handleChange}/>
          </div>
          <div className="form__input">
            <label>Phone: </label>
            <input type="tel" name="phone" value={this.state.form.phone} onChange={this.handleChange}/>
          </div>
          <input className="form__submit" type="submit" value="Keep me posted" />
        </form>
        <Errors errors={this.state.errors} />
        <Info info={this.state.info} />
      </div>
    )
  }
}

const Info = ({ info }) => {
  if (!info) {
    return null
  }
  return <div className="form__info">{info}</div>
}

const Errors = ({ errors }) => {
  if (!errors) {
    return null
  }
  return Object.keys(errors).map(key => {
    return <div key={key} className="form__error">{key}: {errors[key]}</div>
  })
}


export default Form
