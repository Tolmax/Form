import React, { useState, useRef } from "react";
import styles from "./App.module.css";

function App() {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(null);
	const [password, setPassword] = useState("");
	const [repeatPass, setRepeatPass] = useState("");
	const [passwordError, setPasswordError] = useState(null);
	const [repeatPassError, setRepeatPassError] = useState(null);

	const submitButtonRef = useRef(null);

	const onEmailChange = ({ target }) => {
		setEmail(target.value);
		let error = null;
		if (!/^\w+@\w+\.\w{2,}$/.test(target.value)) {
			error =
				"Неверный адрес почты. Допустимые символы: буквы, цифры и нижнее подчеркивание. Формат: user@example.com";
		}
		setEmailError(error);
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);
		let error = null;
		if (!/^[a-zA-Zа-яА-ЯёЁ0-9_]*$/.test(target.value)) {
			error = "Допустимые символы: буквы, цифры и нижнее подчеркивание.";
		} else if (target.value.length < 3) {
			error = "Неверный логин. Должно быть не меньше 3 символов";
		}
		setPasswordError(error);
	};

	const onRepeatPassChange = ({ target }) => {
		const newRepeatPass = target.value;
		setRepeatPass(target.value);
		let error = null;
		if (newRepeatPass !== password) {
			error = "Пароли не совпадают";
		} else {
			// Проверяем условия с УЧЕТОМ ТЕКУЩЕГО ВВОДА (newRepeatPass вместо repeatPass)
			const isFormValid =
				email &&
				!emailError &&
				password &&
				!passwordError &&
				newRepeatPass &&
				password === newRepeatPass;

			// Добавляем задержку для обновления DOM
			if (isFormValid && submitButtonRef.current) {
				setTimeout(() => {
					submitButtonRef.current.focus();
				}, 10);
			}
		}
		setRepeatPassError(error);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		console.log({ email, password, repeatPass });
		setEmail("");
		setPassword("");
		setRepeatPass("");
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
						emailError !== null ||
						passwordError !== null ||
						repeatPassError !== null ||
						!email ||
						!password ||
						!repeatPass ||
						password !== repeatPass
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}

export default App;
