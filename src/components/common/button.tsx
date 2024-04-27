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
			className={`h-10 w-[260px] rounded bg-sns-lavendar-light text-sns-charcoal transition-colors hover:bg-sns-lavendar-dark hover:text-sns-white disabled:cursor-not-allowed disabled:bg-sns-grey-light disabled:text-sns-white ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
