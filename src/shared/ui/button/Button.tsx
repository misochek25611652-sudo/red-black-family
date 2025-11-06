import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'switch' | 'info' | 'outline';
    className?: string;
}

export const Button = ({
    label,
    onClick,
    disabled = false,
    variant = 'primary',
    children,
    className,
    ...props
}: ButtonProps) => {
    const variantClass = styles[`button${variant[0].toUpperCase() + variant.slice(1)}`];

    return (
        <button
            className={clsx(styles.button, variantClass, className, {
                [styles.disabled]: disabled,
            })}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
            {label}
        </button>
    );
};
