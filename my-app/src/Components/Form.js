import React from 'react';
import Tmp from './Temp';

let id = 0;

class top {
  constructor(key, values) {
    this.key = key;
    var result = [];
    this.simpleValue = false;
    if (typeof(values) === 'string') {
      this.values = values;
      this.simpleValue = true;
    } else if (Array.isArray(values)) {
      values.forEach(element => {
        result.push(new top(null, element));
      })
      this.values = result;
    } else {
      var keys = Object.keys(values)
      keys.forEach(element => {
        result.push(new top(element, values[element]));
      });
      this.values = result;
    }
  }

  toTmp () {
    var result = [];
    if (this.values) {
      if (!this.simpleValue) {
        this.values.forEach(element => {
          result.push(element.toTmp());
        });
        return <Tmp key={id++} k={this.key} v={result} simple={false}/>;
      } else {
        return <Tmp key={id++} k={this.key} v={this.values} simple={true}/>;
      }
    }
  }

}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '{ "name": "debug" }', showComponent: false, output: null };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSubmit(event) {
    try {
      var jsonObj = JSON.parse(this.state.input);
    } catch (e) {
      alert('Invalid json: ' + this.state.input);
      this.setState({ showComponent: false });
      return;
    }

    var asArray = Object.entries(jsonObj);
    var result = []
    asArray.forEach(entry => {;
      result.push((new top(entry[0], entry[1])).toTmp());
    })

    this.setState({ output: result, showComponent: true });
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
            value={this.state.input}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />

      </form>
        <div>
          {this.state.showComponent ? <div>{this.state.output}</div> : null}
        </div>
      </div>

    );
  }
}

export default Form;
