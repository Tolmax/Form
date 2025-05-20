import React, { useState } from "react";
import styles from "./App.module.css";

function App() {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(null);
	const [password, setPassword] = useState("");
	const [repeatPass, setRepeatPass] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showRepeatPassword, setShowRepeatPassword] = useState(false);

	const onEmailChange = ({ target }) => {
		setEmail(target.value);
		setEmailError(
			!/^\w+@\w+\.\w{2,}$/.test(target.value)
				? "Неверный адрес почты. Допустимые символы: буквы, цифры и нижнее подчеркивание. Формат: user@example.com"
				: null,
		);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleRepeatPasswordVisibility = () => {
		setShowRepeatPassword(!showRepeatPassword);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		console.log({ email, password, repeatPass });
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
					className={`${styles.input} ${emailError ? styles.errorInput : ""}`}
				/>
				{emailError && (
					<span className={styles.error}>{emailError}</span>
				)}

				<div className={styles.passwordContainer}>
					<input
						type={showPassword ? "text" : "password"}
						name="password"
						value={password}
						placeholder="Пароль"
						onChange={({ target }) => setPassword(target.value)}
						className={styles.input}
					/>
					<button
						type="button"
						onClick={togglePasswordVisibility}
						className={styles.toggleButton}
					>
						{showPassword ? "👁️" : "👁️‍🗨️"}
					</button>
				</div>

				<div className={styles.passwordContainer}>
					<input
						type={showRepeatPassword ? "text" : "password"}
						name="repeatPass"
						value={repeatPass}
						placeholder="Повторить пароль"
						onChange={({ target }) => setRepeatPass(target.value)}
						className={styles.input}
					/>
					<button
						type="button"
						onClick={toggleRepeatPasswordVisibility}
						className={styles.toggleButton}
					>
						{showRepeatPassword ? "👁️" : "👁️‍🗨️"}
					</button>
				</div>

				<button
					type="submit"
					className={styles.button}
					disabled={emailError !== null}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}

export default App;
