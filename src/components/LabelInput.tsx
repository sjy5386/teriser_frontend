import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

type LabelInputType = 'text' | 'email' | 'password' | 'tel';

export interface LabelInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string;
    name?: string;
    type?: LabelInputType;
    placeholder?: string;
    value?: string;
    onChange?: React.ChangeEventHandler;
}

const LabelInput: React.FC<LabelInputProps> = ({
                                                   label, name, type, placeholder, value, onChange, className, children
                                               }: LabelInputProps) => {
    return (
        <div className={`mb-3 ${className}`}>
            <label className="form-label" htmlFor={name}>{label}</label>
            <input id={name} className="form-control" name={name} type={type} placeholder={placeholder} value={value}
                   onChange={onChange}/>
            {children}
        </div>
    )
};

export default LabelInput;
