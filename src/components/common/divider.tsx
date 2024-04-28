type DividerProps = {
	className?: string;
	lightness?: 'LIGHT' | 'DARK';
};

export default function Divider({
	className,
	lightness = 'LIGHT',
}: DividerProps) {
	return (
		<hr
			className={`${lightness === 'LIGHT' ? 'border-sns-grey-light' : 'border-sns-grey-dark'} w-full border-t ${className}`}
		/>
	);
}
