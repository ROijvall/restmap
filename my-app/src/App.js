import './App.css';
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Form from './Components/Form';
import { Provider } from 'react-redux'

function Home() {
  return (
    <main className="App">
      <header className="App-header">
        <p>restmap</p>
        <nav>
          <Link to="/about">
            <button type="button" className="button1">
              About us
            </button>
          </Link>
          <Link to="/program">
            <button type="button" className="button1">
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
    <main className="App">
      <header className="App-header">
        <p>yo</p>
        <Link to="/">
          <button type="button" className="button1">
            Home
          </button>
        </Link>
      </header>
    </main>
  );
}

function Program() {
  return (
    <main className="App">
      <header className="App-header">
        <Link to="/">
          <button type="button" className="button1">
            Home
          </button>
        </Link>
        <Form />  
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

export default App;
