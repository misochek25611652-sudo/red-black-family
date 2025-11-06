// @/shared/ui/input/Input.tsx
import clsx from 'clsx';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    variant?: 'default' | 'balance';
    currency?: string;
}

export const Input = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    disabled,
    className,
    variant = 'default',
    currency,
    ...props
}: InputProps) => {
    if (variant === 'balance') {
        return (
            <div
                className={clsx(
                    styles.inputWrapper,
                    styles.balanceWrapper,
                    error && styles.error,
                    disabled && styles.disabled
                )}
            >
                <input
                    type={type}
                    className={clsx(styles.input, styles.balanceInput, className)}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    {...props}
                />
                {currency && <span className={styles.currency}>{currency}</span>}
                {error && <span className={styles.errorMessage}>{error}</span>}
            </div>
        );
    }

    return (
        <div
            className={clsx(
                styles.inputWrapper,
                error && styles.error,
                disabled && styles.disabled,
                className
            )}
        >
            <input
                type={type}
                className={clsx(styles.input, error && styles.errorInput)}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                {...props}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};
