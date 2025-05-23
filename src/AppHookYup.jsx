import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./App.module.css";

const schema = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^\w+@\w+\.\w{2,}$/,
			"Допустимые символы: буквы, цифры и нижнее подчеркивание. Формат: user@example.com",
		)
		.required("Почта обязательна для заполнения"),
	password: yup
		.string()
		.matches(
			/^[a-zA-Zа-яА-ЯёЁ0-9_]*$/,
			"Допустимые символы: буквы, цифры и нижнее подчеркивание.",
		)
		.min(3, "Должно быть не меньше 3 символов")
		.required("Пароль обязателен для заполнения"),
	repeatPass: yup
		.string()
		.oneOf([yup.ref("password")], "Пароли не совпадают")
		.required("Повторите пароль"),
});

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm({
		mode: "onChange",
		resolver: yupResolver(schema),
	});

	const submitButtonRef = useRef(null);

	const onSubmit = (data) => {
		console.log("Форма отправлена:", data);
		reset();
		if (submitButtonRef.current) {
			submitButtonRef.current.blur();
		}
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
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<input
					type="email"
					{...register("email")}
					placeholder="Почта"
					className={styles.input}
					onKeyUp={checkAutoFocus}
				/>
				{errors.email && (
					<span className={styles.error}>{errors.email.message}</span>
				)}

				<input
					type="password"
					{...register("password")}
					placeholder="Пароль"
					className={styles.input}
					onKeyUp={checkAutoFocus}
				/>
				{errors.password && (
					<span className={styles.error}>
						{errors.password.message}
					</span>
				)}

				<input
					type="password"
					{...register("repeatPass")}
					placeholder="Повторить пароль"
					className={styles.input}
					onKeyUp={checkAutoFocus}
				/>
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
		</div>
	);
}

export default App;
