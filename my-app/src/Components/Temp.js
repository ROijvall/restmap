import React from 'react';
import './Temp.css';

class Tmp extends React.Component { 
    
    constructor(props) {
        super(props);
        this.state = { k_copy: this.props.k, v_copy: this.props.v, k: this.props.k, v: this.props.v, simple: this.props.simple  };

        this.handleChange = this.handleChange.bind(this);
      }

      handleChange(event) {
        const target = event.target;
        const name = target.name;
    
        this.setState({
          [name]: target.value
        });
      }


    render() {
        if (this.state.simple && this.state.k) {
            return (
                <div className="container">
                    <a className="keyText">{this.state.k}: </a>
                    <input
                        name="k_copy"
                        type="text"
                        value={this.state.k_copy}
                        onChange={this.handleChange}
                    />
                    <br/>
                    <div className='container'>
                        <a className='valueText'>{this.state.v}: </a>
                        <input
                            name="v_copy"
                            type="text"
                            value={this.state.v_copy}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
            );
        } else if (this.state.k === null) {
            return (
                <div className="container">
                    <a className='valueText'>{this.state.v}: </a>
                    <input
                        name="v_copy"
                        type="text"
                        value={this.state.v_copy}
                        onChange={this.handleChange}
                    />
                </div>
            )
        } else {
            return (
                <div className="container">
                <a className="keyText">{this.state.k}: </a>
                <input
                    name="k_copy"
                    type="text"
                    value={this.state.k_copy}
                    onChange={this.handleChange}
                />
                <br/>
                <a> {this.state.v} </a>
                </div>
            );
        }
    }
}

export default Tmp;