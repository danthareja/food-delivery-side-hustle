import React, { Component } from 'react';
import Form from './Form'

import './App.css'

class App extends Component {
  render() {
    return (
      <main>
        <div>
          <h1>good lookin', good cookin'</h1>
          <h2>aka</h2>
          <h1>Unincoporated Food Service inc.</h1>
          <p>You're hungry and we make great food</p>
          <p>For just a fiver, we'll deliver a hot, delicious, home-cooked meal right to your door.</p>
          <p>Pop your phone number below to get a text when we're headed out</p>
          <Form />
        </div>
      </main>
    );
  }
}

export default App;
