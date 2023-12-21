import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useVerifyUserMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';


export default function useConfirmOtp(uid: string, token: string) {
	const router = useRouter();

	const [confirmOtp, { isLoading }] =
	useVerifyUserMutation();

	const [formData, setFormData] = useState({
		otp: '',
	});

	const { otp } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		confirmOtp({ uid, token, otp})
			.unwrap()
			.then(() => {
				toast.success('Phone number verified');
				router.push('/home');
			})
			.catch(() => {
				toast.error('OTP code invalid');
				router.push('/home');
			});
	};

	return {
		otp,
		isLoading,
		onChange,
		onSubmit,
	};
}
