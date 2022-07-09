import React, { useState } from 'react'
import './Temp.css';

const Tmp = props => {

    const [k_copy, setNewKey] = useState(props.k);
    const [v_copy, setNewValue] = useState(props.v);

    const updateKeyValues = () => {
        var k_res = [props.k, k_copy];
        var v_res = [props.v, v_copy];
        if (k_copy === props.k) {
            k_res = null;   
        }
        if (v_copy === props.v) {
            v_res = null;
        }
        return [props.stack, k_res, v_res];
    }

    props.biRef.updateKeyValues = updateKeyValues;

    const onChangeKey = event => {
        setNewKey(event.target.value);
     };
     
    const onChangeValue = event => {
        setNewValue(event.target.value);
     };
    
    
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