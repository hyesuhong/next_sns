import {
	FieldValues,
	Path,
	RegisterOptions,
	UseFormRegister,
} from 'react-hook-form';

type InputProps<T extends FieldValues> = {
	label?: string;
	name: Path<T>;
	type?: React.HTMLInputTypeAttribute;
	errorMessege?: string;
	register: UseFormRegister<T>;
	options?: RegisterOptions<T>;
};

export default function InputField<T extends FieldValues>({
	label,
	name,
	type,
	errorMessege,
	register,
	options,
}: InputProps<T>) {
	return (
		<div className='relative pb-4'>
			<input
				type={type}
				className='h-10 w-full rounded-[4px] border border-slate-200 bg-transparent px-4 text-sm outline-none focus:border-violet-400'
				{...register(name, options)}
			/>
			{label && (
				<label className='absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-xs'>
					{label}
				</label>
			)}
			{errorMessege && (
				<span className='absolute bottom-0 left-0 text-xs text-red-400'>
					{errorMessege}
				</span>
			)}
		</div>
	);
}
