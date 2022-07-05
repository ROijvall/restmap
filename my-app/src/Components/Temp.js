import React from 'react';
import './Temp.css';

class Tmp extends React.Component { 
    
    constructor(props) {
        super(props);
        this.state = { k_copy: this.props.k, v_copy: this.props.v };

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
        if (this.props.simple && this.props.k) {
            return (
                <div className="container">
                    <a className="keyText">{this.props.k}: </a>
                    <input
                        name="k_copy"
                        type="text"
                        value={this.state.k_copy}
                        onChange={this.handleChange}
                    />
                    <br/>
                    <div className='container'>
                        <a className='valueText'>{this.props.v}: </a>
                        <input
                            name="v_copy"
                            type="text"
                            value={this.state.v_copy}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
            );
        } else if (this.props.k === null) {
            return (
                <div className="container">
                    <a className='valueText'>{this.props.v}: </a>
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
                <a className="keyText">{this.props.k}: </a>
                <input
                    name="k_copy"
                    type="text"
                    value={this.state.k_copy}
                    onChange={this.handleChange}
                />
                <br/>
                <a> {this.props.v} </a>
                </div>
            );
        }
    }
}

export default Tmp;