import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {createHash} from "crypto";

export interface LabelRadioProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
}

const LabelRadio: React.FC<LabelRadioProps> = ({label, name, value, ...rest}: LabelRadioProps) => {
    const id = createHash('sha1').update(`${name} ${value}`).digest('hex');

    return (
        <div className="form-check">
            <input className="form-check-input" id={id} type="radio" name={name} value={value} {...rest}/>
            <label className="form-check-label" htmlFor={id}>{label}</label>
        </div>
    );
};

export default LabelRadio;
