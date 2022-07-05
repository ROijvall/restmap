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

  toTmp (stack) {
    var result = [];
    if (this.values) {
      if (!this.simpleValue) {
        this.values.forEach(element => {
          result.push(element.toTmp(stack.push(this.key)));
        });
        return <Tmp key={id++} k={this.key} v={result} stack={stack} simple={false}/>;
      } else {
        return <Tmp key={id++} k={this.key} v={this.values} stack={stack} simple={true}/>;
      }
    }
  }

}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '{ "name": "debug" }', showComponent: false, output: null };

    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSave(event) {
    //var asArray = Object.entries(this.state.output);
    console.log(this.state.output);
  }

  handleInput(event) {
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
      result.push((new top(entry[0], entry[1])).toTmp([]));
    })

    this.setState({ output: result, showComponent: true });
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleInput}>
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
        <div className="flexContainer">
          {this.state.showComponent ? 
            <div>
              <form onSubmit={this.handleSave}>
                {this.state.output}
                <input type="button" onClick={this.handleSave} value="Save"></input>
              </form>
            </div> 
            : null}
        </div>
      </div>

    );
  }
}

export default Form;
