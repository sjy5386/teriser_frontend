import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ColorVariant from "../types/ColorVariant";

export interface AlertProps extends React.HTMLProps<HTMLDivElement> {
    variant?: ColorVariant;
}

const Alert: React.FC<AlertProps> = ({variant, className, children, ...rest}: AlertProps) => {
    return (
        <div className={`alert alert-${variant} ${className}`} role="alert" {...rest}>{children}</div>
    );
};

export default Alert;
