import { ButtonHTMLAttributes } from 'react';

export default function Button({
	children,
	type,
	disabled,
	className,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			type={type}
			disabled={disabled}
			className={`h-10 w-[260px] rounded bg-violet-300 transition-colors hover:bg-violet-400 ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
