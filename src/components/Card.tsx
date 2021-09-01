import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

type CardImgVariant = 'top' | 'bottom';

interface CardImgProps extends React.HTMLProps<HTMLImageElement> {
    variant?: CardImgVariant;
}

export const CardImg: React.FC<CardImgProps> = ({variant, src, alt}: CardImgProps) => {
    const className = variant ? `card-img-${variant}` : 'card-img';

    return (
        <img className={className} src={src} alt={alt}/>
    );
};

interface CardHeaderProps extends React.HTMLProps<HTMLDivElement> {
}

export const CardHeader: React.FC<CardHeaderProps> = ({children, ...rest}: CardHeaderProps) => {
    return (
        <div className="card-header" {...rest}>{children}</div>
    );
};

interface CardTitleProps extends React.HTMLProps<HTMLHeadingElement> {
}

export const CardTitle: React.FC<CardTitleProps> = ({children, ...rest}: CardTitleProps) => {
    return (
        <h5 className="card-title" {...rest}>{children}</h5>
    );
};

type CardSubtitleProps = CardTitleProps;

export const CardSubtitle: React.FC<CardSubtitleProps> = ({children, ...rest}: CardSubtitleProps) => {
    return (
        <h6 className="card-subtitle mb-2 text-muted" {...rest}>{children}</h6>
    );
};

interface CardBodyProps extends React.HTMLProps<HTMLDivElement> {
}

export const CardBody: React.FC<CardBodyProps> = ({className, children, ...rest}: CardBodyProps) => {
    return (
        <div className={`card-body ${className}`} {...rest}>{children}</div>
    );
};

type CardFooterProps = CardHeaderProps;

export const CardFooter: React.FC<CardFooterProps> = ({children, ...rest}: CardFooterProps) => {
    return (
        <div className="card-footer" {...rest}>{children}</div>
    );
};

interface CardProps extends React.HTMLProps<HTMLDivElement> {
}

const Card: React.FC<CardProps> = ({className, children, ...rest}: CardProps) => {
    return (
        <div className={`card ${className}`} {...rest}>{children}</div>
    );
};

export default Card;
