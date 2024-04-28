import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: 'MEDIUM' | 'SMALL';
	isFull?: boolean;
	variants?: 'PRIMARY' | 'SECONDARY';
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
					: 'button-variants__secondary'
			} ${size === 'MEDIUM' ? 'button-size__medium' : 'button-size__small'} ${isFull && 'button-isFull'} ${className}`}
			{...props}
		>
			{icon && 'lead' in icon && icon.lead}
			{children}
			{icon && 'tail' in icon && icon.tail}
		</button>
	);
}
