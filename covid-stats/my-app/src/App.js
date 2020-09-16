import React from 'react';
import logo from './bulogo.ico';
import './App.css';
import './bucampus.jpg'


async function get_data() {
    const url ="https://api.covidtracking.com/v1/states/MA/current.json?state=MA";
    const response = await fetch(url);
    const data = await response.json();
    //this.setState({date:data.date});
    console.log(data.lastUpdateEt);
}
get_data();
function App() {
  return (
      <div className="App" styles={{ backgroundImage: 'url(${bucampus})' }}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
