import React, { useState } from 'react'
import './Temp.css';

const Tmp = props => {
    /*constructor(props) {
        super(props);
        this.state = { k_copy: this.props.k, v_copy: this.props.v };
        
        this.handleChange = this.handleChange.bind(this);
    }*/
    
    /*handleChange(event) {
        const target = event.target;
        const name = target.name;
        
        this.setState({
            [name]: target.value
        });
    }*/

    const onChangeKey = event => {
        setNewKey(event.target.value);
     };
     
    const onChangeValue = event => {
        setNewValue(event.target.value);
     };
    
    const [k_copy, setNewKey] = useState(props.k);
    const [v_copy, setNewValue] = useState(props.v);
    
    if (props.simple && props.k) {
        return (
            <div className="container">
            <a className="keyText">{props.k}: </a>
            <input
            name="k_copy"
            type="text"
            value={k_copy}
            onChange={onChangeKey}
            />
            <br/>
            <div className='container'>
            <a className='valueText'>{props.v}: </a>
            <input
            name="v_copy"
            type="text"
            value={v_copy}
            onChange={onChangeValue}
            />
            </div>
            </div>
            );
        } else if (props.k === null) {
            return (
                <div className="container">
                <a className='valueText'>{props.v}: </a>
                <input
                name="v_copy"
                type="text"
                value={v_copy}
                onChange={onChangeValue}
                />
                </div>
                )
            } else {
                return (
                    <div className="container">
                    <a className="keyText">{props.k}: </a>
                    <input
                    name="k_copy"
                    type="text"
                    value={k_copy}
                    onChange={onChangeKey}
                    />
                    <br/>
                    <a> {props.v} </a>
                    </div>
                    );
                }
            }
            
            export default Tmp;