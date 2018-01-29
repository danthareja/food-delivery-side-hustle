import React, { Component } from 'react';
import Form from './Form'

import './App.css'

class App extends Component {
  render() {
    return (
      <main className="app">
        <h1 className="app__header">Unincoporated Food Service inc.</h1>
        <div className="app__content">
          <p>You're hungry and we make great food</p>
          <p>For just a fiver, we'll deliver a hot, delicious, home-cooked meal right to your door.</p>
          <p>Pop your info below to get a text when we're headed your way next</p>
        </div>
        <Form />
      </main>
    );
  }
}

export default App;
