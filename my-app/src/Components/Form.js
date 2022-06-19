import React from 'react';
import Tmp from './Temp';

let id = 0;

class top {
  constructor(key, values) {
    this.key = key;
    if (typeof(values) === 'string') {
      this.values = values;
      this.simpleValue = true;
    } else  {
      var tmp = []
      
      var keys = Object.keys(values)
      keys.forEach(element => {
        tmp.push(new top(element, values[element]));
      });
      this.values = tmp;
      this.simpleValue = false;
    }
  }

  toTmp () {
    var res = [];
    if (!this.simpleValue && this.values) {
      var keys = Object.keys(this.values)
      console.log(this.values);
      this.values.forEach(element => {
        res.push(element.toTmp());
      });
      return <Tmp key={id++} k={this.key} v={res}/>;
    } else if (this.values) {
      return <Tmp key={id++} k={this.key} v={this.values}/>;
    }
  }

}

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
    var objlist = [];
    try {
      var jsonObj = JSON.parse(this.state.value);
    } catch (e) {
      alert('Invalid json: ' + this.state.value);
      this.setState({ showComponent: false });
      return;
    }

    for (const key in jsonObj) {
      objlist.push(new top(key, jsonObj[key]));
    }
    console.log(objlist);

    var tmplist = [];
    objlist.forEach(element => {
      tmplist.push(element.toTmp());
    });
    console.log(tmplist); 

    this.setState({ keys: tmplist, showComponent: true });
    event.preventDefault();
  }

  recursive(key, value) {
    var res = []
    if (key) {
      if (typeof(value) == Array) {
        value.map((key, value) => {
            res.push(this.recursive(key, value));
          });
          return res;
      } else {
           return <Tmp key={id++} k={key} v={value}/>
      }
    } 
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
