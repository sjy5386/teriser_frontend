import React from "react";
import Alert, {AlertProps} from "./Alert";

interface AlertGroupProps {
    alerts: AlertProps[];
}

const AlertGroup: React.FC<AlertGroupProps> = ({alerts}: AlertGroupProps) => {
    return (
        <>
            {alerts.map((alert, index) => (
                <Alert {...alert} key={index}>{alert.children}</Alert>
            ))}
        </>
    )
};

export default AlertGroup;
