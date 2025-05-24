import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./App.module.css";
import { EyeIcon } from "./ShowButton/ShowButton";
import { Loader } from "./Loader/Loader";
import { SelectOptions } from "./Select/Select";

const schema = yup.object().shape({
	email: yup
		.string()
		.required("Почта обязательна для заполнения")
		.matches(
			/^\w+@\w+\.\w{2,}$/,
			"Допустимые символы: буквы, цифры и нижнее подчеркивание. Формат: user@example.com",
		),
	password: yup
		.string()
		.required("Пароль обязателен для заполнения")
		.matches(
			/^[a-zA-Zа-яА-ЯёЁ0-9_]*$/,
			"Допустимые символы: буквы, цифры и нижнее подчеркивание.",
		)
		.min(3, "Должно быть не меньше 3 символов"),
	repeatPass: yup
		.string()
		.required("Повторите пароль")
		.oneOf([yup.ref("password")], "Пароли не совпадают"),
});

function App() {
	const [showPassword, setShowPassword] = useState(false);
	const [showRepeatPass, setShowRepeatPass] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm({
		mode: "onChange",
		resolver: yupResolver(schema),
	});

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}, []);

	const submitButtonRef = useRef(null);

	const onSubmit = (data) => {
		console.log("Форма отправлена:", data);
		reset();
		// if (submitButtonRef.current) {
		// 	submitButtonRef.current.blur();
		// }
	};

	const checkAutoFocus = () => {
		if (isValid && submitButtonRef.current) {
			setTimeout(() => {
				submitButtonRef.current.focus();
			}, 10);
		}
	};

	return (
		<div className={styles.container}>
			{isLoading ? (
				<Loader />
			) : (
				<div>
					<form
						className={styles.form}
						onSubmit={handleSubmit(onSubmit)}
					>
						<input
							type="email"
							{...register("email")}
							placeholder="Почта"
							className={styles.input}
							onKeyUp={checkAutoFocus}
						/>
						{errors.email && (
							<span className={styles.error}>
								{errors.email.message}
							</span>
						)}
						<div className={styles.inputWrapper}>
							<input
								type={showPassword ? "text" : "password"}
								{...register("password")}
								placeholder="Пароль"
								className={styles.input}
								onKeyUp={checkAutoFocus}
							/>
							<EyeIcon
								show={setShowPassword}
								onClick={() => setShowPassword(!showPassword)}
							/>
						</div>
						{errors.password && (
							<span className={styles.error}>
								{errors.password.message}
							</span>
						)}
						<div className={styles.inputWrapper}>
							<input
								type={showRepeatPass ? "text" : "password"}
								{...register("repeatPass")}
								placeholder="Повторить пароль"
								className={styles.input}
								onKeyUp={checkAutoFocus}
							/>
							<EyeIcon
								show={showRepeatPass}
								onClick={() =>
									setShowRepeatPass(!showRepeatPass)
								}
							/>
						</div>
						{errors.repeatPass && (
							<span className={styles.error}>
								{errors.repeatPass.message}
							</span>
						)}
						<button
							ref={submitButtonRef}
							type="submit"
							className={styles.button}
							disabled={!isValid}
						>
							Зарегистрироваться
						</button>
					</form>
					<SelectOptions />
				</div>
			)}
		</div>
	);
}

export default App;
