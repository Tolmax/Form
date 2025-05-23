
import styles from './ShowButton.module.css'

export const EyeIcon = ({ show, onClick }) => (
	<button
		type="button"
		onClick={onClick}
		className={styles.eyeButton}
		aria-label={show ? "Скрыть пароль" : "Показать пароль"}
	>
		{show ? "👁" : "👁"}
	</button>
);
