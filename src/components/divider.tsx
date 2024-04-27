type DividerProps = {
	className?: string;
};

export default function Divider({ className }: DividerProps) {
	return <hr className={`w-full border-t border-t-zinc-700 ${className}`} />;
}
