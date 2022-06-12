import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route, Link } from "react-router-dom";


function Home() {
    return (
      <main className='App'>
        <header className='App-header'>
        <p>
          restmap
        </p>
        <nav>
          <Link to="/about">
            <button type="button" className='button1'>
              About us
            </button>
          </Link>
          <Link to="/program">
             <button type="button" className='button1'>
              Program
              </button>
</Link>
        </nav>
        </header>
      </main>
  );
}

function About() {
  return (  
    <main className='App'>
    <header className='App-header'>
      <p>
        yo
      </p>
      <Link to="/">
        <button type="button" className='button1'>
          Home
        </button>
      </Link>
      </header>
      </main>
  );
}

function Program() {
  var form = new NameForm();
  return (  
    <main className='App'>
      <header className='App-header'>
    <p>
        content here
    </p>
  
    <Link to="/">
    <button type="button" className='button1'>
     Home
    </button>
    </Link>
    </header>
      </main>
  );
}
 
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/program" element={<Program />} />
      </Routes>
    </div>
  );
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
