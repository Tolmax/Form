import React, { useState, useRef } from "react";
import * as yup from "yup";
import styles from "./App.module.css";

// Схемы валидации
const emailSchema = yup
	.string()
	.matches(
		/^\w+@\w+\.\w{2,}$/,
		"Допустимые символы: буквы, цифры и нижнее подчеркивание. Формат: user@example.com",
	)
	.required("Почта обязательна для заполнения");

const passwordSchema = yup
	.string()
	.matches(
		/^[a-zA-Zа-яА-ЯёЁ0-9_]*$/,
		"Допустимые символы: буквы, цифры и нижнее подчеркивание.",
	)
	.min(3, "Должно быть не меньше 3 символов")
	.required("Пароль обязателен для заполнения");

const repeatPassSchema = yup
	.string()
	.required("Повторите пароль")
	.test("passwords-match", "Пароли не совпадают", function (value) {
		return value === this.options.context?.password;
	});

// Общая схема для валидации формы
const validationSchema = yup.object().shape({
	email: emailSchema,
	password: passwordSchema,
	repeatPass: repeatPassSchema,
});

function App() {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(null);
	const [password, setPassword] = useState("");
	const [repeatPass, setRepeatPass] = useState("");
	const [passwordError, setPasswordError] = useState(null);
	const [repeatPassError, setRepeatPassError] = useState(null);

	const submitButtonRef = useRef(null);

	const onEmailChange = async ({ target }) => {
		const value = target.value;
		setEmail(value);

		try {
			await emailSchema.validate(value);
			setEmailError(null);
		} catch (error) {
			setEmailError(error.message);
		}
	};

	const onPasswordChange = async ({ target }) => {
		const value = target.value;
		setPassword(value);

		try {
			await passwordSchema.validate(value);
			setPasswordError(null);
		} catch (error) {
			setPasswordError(error.message);
		}
	};

	const onRepeatPassChange = async ({ target }) => {
		const value = target.value;
		setRepeatPass(value);

		try {
			await repeatPassSchema.validate(value, { context: { password } });
			setRepeatPassError(null);
		} catch (error) {
			setRepeatPassError(error.message);
		}

		// Автофокус на кнопку при успешном заполнении
		const isFormValid =
			email &&
			!emailError &&
			password &&
			!passwordError &&
			value &&
			value === password;

		if (isFormValid && submitButtonRef.current) {
			setTimeout(() => submitButtonRef.current.focus(), 10);
		}
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		try {
			await validationSchema.validate(
				{ email, password, repeatPass },
				{ abortEarly: false },
			);

			console.log("Форма отправлена:", { email, password, repeatPass });
			// Сброс формы
			setEmail("");
			setPassword("");
			setRepeatPass("");
			setEmailError(null);
			setPasswordError(null);
			setRepeatPassError(null);
		} catch (errors) {
			const errorMessages = {};
			errors.inner.forEach((error) => {
				errorMessages[error.path] = error.message;
			});
			setEmailError(errorMessages.email);
			setPasswordError(errorMessages.password);
			setRepeatPassError(errorMessages.repeatPass);
		}
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={onSubmit}>
				<input
					type="email"
					name="email"
					value={email}
					placeholder="Почта"
					onChange={onEmailChange}
					className={styles.input}
				/>
				{emailError && (
					<span className={styles.error}>{emailError}</span>
				)}

				<input
					type="password"
					name="password"
					value={password}
					placeholder="Пароль"
					onChange={onPasswordChange}
					className={styles.input}
				/>
				{passwordError && (
					<span className={styles.error}>{passwordError}</span>
				)}

				<input
					type="password"
					name="repeatPass"
					value={repeatPass}
					placeholder="Повторить пароль"
					onChange={onRepeatPassChange}
					className={styles.input}
				/>
				{repeatPassError && (
					<span className={styles.error}>{repeatPassError}</span>
				)}

				<button
					ref={submitButtonRef}
					type="submit"
					className={styles.button}
					disabled={
						!!emailError ||
						!!passwordError ||
						!!repeatPassError ||
						!email ||
						!password ||
						!repeatPass
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}

export default App;
