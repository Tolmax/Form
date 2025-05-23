import { useRef } from "react";
import { useForm } from "react-hook-form";
import styles from "./App.module.css";


//проверить работу фокуса

function App() {
  const submitButtonRef = useRef(null);
  const {
		register,
		watch,
		handleSubmit,
		reset,
		formState: { errors },
  } = useForm({
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
			repeatPass: "",
		},
  });

  const passwordValue = watch("password");

  // Валидационные правила для email
  const emailProps = {
    pattern: {
      value: /^\w+@\w+\.\w{2,}$/,
      message: "Неверный адрес почты. Допустимые символы: буквы, цифры и нижнее подчеркивание. Формат: user@example.com",
    }
  };

  // Валидационные правила для пароля
  const passwordProps = {
    pattern: {
      value: /^[a-zA-Zа-яА-ЯёЁ0-9_]*$/,
      message: "Допустимые символы: буквы, цифры и нижнее подчеркивание.",
    },
    minLength: {
      value: 3,
      message: "Неверный логин. Должно быть не меньше 3 символов",
    }
  };

  // Валидационные правила для повторного пароля
  const repeatPassProps = {
    validate: (value) => {
      if (value !== passwordValue) return "Пароли не совпадают";
      changefocus();
      return true;
    }
  };

  // Фокус на кнопку при успешной валидации
  const changefocus = () => {
    if (submitButtonRef.current) {
      setTimeout(() => {
        submitButtonRef.current.focus();
      }, 10);
    }
  };

  const onSubmit = (formData) => {
    console.log(formData);
	reset();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", emailProps)}
          placeholder="Email"
          className={styles.input}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}

        <input
          type="password"
          {...register("password", passwordProps)}
          placeholder="Пароль"
          className={styles.input}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}

        <input
          type="password"
          {...register("repeatPass", repeatPassProps)}
          placeholder="Повторите пароль"
          className={styles.input}
        />
        {errors.repeatPass && (
          <span className={styles.error}>{errors.repeatPass.message}</span>
        )}

        <button
          ref={submitButtonRef}
          type="submit"
          className={styles.button}
          disabled={
            !watch("email") ||
            !watch("password") ||
            !watch("repeatPass") ||
            !!errors.email ||
            !!errors.password ||
            !!errors.repeatPass
          }
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}


export default App;
