import React from 'react';
import Tmp from './Temp';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '{ "name": "debug" }', showComponent: false, keys: null, values: ['debug'] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    var rows = [];
    var i = 0;
    try {
      JSON.parse(this.state.value, (key, value) => 
        key ? rows.push(<Tmp key={i++} k={key} v={value}/>) : value);
    } catch (e) {
      alert('Invalid json: ' + this.state.value);
      this.setState({ showComponent: false });
      return;
    }
    this.setState({ keys: rows, showComponent: true });
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Input json:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />

      </form>
        <div>
          {this.state.showComponent ? <div>{this.state.keys}</div> : null}
        </div>
      </div>

    );
  }
}

export default Form;
