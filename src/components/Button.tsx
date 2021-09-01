import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {OutlineColorVariant} from "../types/ColorVariant";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    variant?: OutlineColorVariant;
    onClick?: React.MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({variant, onClick, className, children}: ButtonProps) => {
    return (
        <button type="button" className={`btn btn-${variant} ${className}`} onClick={onClick}>{children}</button>
    )
};

export default Button;
