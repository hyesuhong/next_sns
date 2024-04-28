import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: 'MEDIUM' | 'SMALL' | 'X_SMALL';
	isFull?: boolean;
	variants?: 'PRIMARY' | 'SECONDARY' | 'TERTIARY';
	icon?: { lead: ReactNode } | { tail: ReactNode };
}

export default function Button({
	children,
	type,
	disabled,
	className,
	size = 'MEDIUM',
	isFull,
	variants = 'PRIMARY',
	icon,
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled}
			className={`button ${
				variants === 'PRIMARY'
					? 'button-variants__primary'
					: variants === 'SECONDARY'
						? 'button-variants__secondary'
						: 'button-variants__tertiary'
			} ${size === 'MEDIUM' ? 'button-size__medium' : size === 'SMALL' ? 'button-size__small' : 'button-size__xsmall'} ${isFull && 'button-isFull'} ${className}`}
			{...props}
		>
			{icon && 'lead' in icon && icon.lead}
			{children}
			{icon && 'tail' in icon && icon.tail}
		</button>
	);
}
