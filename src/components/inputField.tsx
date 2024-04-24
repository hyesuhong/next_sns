import { useState } from 'react';

type InputProps = {
	label?: string;
	name: string;
	type?: React.HTMLInputTypeAttribute;
	errorMessege?: string;
};

export default function InputField({
	label,
	name,
	type,
	errorMessege,
}: InputProps) {
	const [isEmpty, setIsEmpty] = useState(true);

	const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		if (isEmpty && ev.target.value !== '') {
			return setIsEmpty(false);
		}

		if (!isEmpty && ev.target.value === '') {
			return setIsEmpty(true);
		}
	};

	return (
		<div className='relative'>
			<input
				type={type}
				name={name}
				onChange={onChange}
				className='peer-blank peer h-10 w-full rounded-[4px] border border-slate-200 bg-transparent px-4 text-sm outline-none focus:border-violet-400'
			/>
			{label && (
				<label
					className={`absolute left-4 ${isEmpty ? 'top-5' : 'top-0'} -translate-y-1/2 bg-white text-xs transition-all peer-focus:top-0`}
				>
					{label}
				</label>
			)}
			{errorMessege && (
				<span className='text-xs text-red-400'>{errorMessege}</span>
			)}
		</div>
	);
}
