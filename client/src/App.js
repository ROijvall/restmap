import './App.css';
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AddForm from './Components/AddForm';
import GetForm from './Components/GetForm';


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
          <Link to="/add">
            <button type="button" className="button1">
              Add Rule
            </button>
          </Link>
          <Link to="/get">
            <button type="button" className="button1">
              Get Rule
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

function Add() {
  return (
    <main className="App">
      <header className="App-header">
        <Link to="/">
          <button type="button" className="button1">
            Home
          </button>
        </Link>
        <AddForm />  
      </header>
    </main>
  );
}

function Get() {
  return (
    <main className="App">
      <header className="App-header">
        <Link to="/">
          <button type="button" className="button1">
            Home
          </button>
        </Link>
        <GetForm />  
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
          <Route path="/add" element={<Add />} />
          <Route path="/get" element={<Get />} />
        </Routes>
      </div>
  );
}

export default App;
