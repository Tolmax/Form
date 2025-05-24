import { useState } from "react";
import Select from "react-select";
import styles from "./Select.module.css";

export const SelectOptions = () => {
	const productOptions = [
		{ value: "tv", label: "Телевизор" },
		{ value: "smartphone", label: "Смартфон" },
		{ value: "laptop", label: "Ноутбук" },
	];

	const colorOptions = [
		{ value: "black", label: "Чёрный" },
		{ value: "white", label: "Белый" },
		{ value: "silver", label: "Серебристый" },
	];

	const [selectedProduct, setSelectedProduct] = useState(productOptions[1]);
	const [selectedColors, setSelectedColors] = useState([
		colorOptions[0],
		colorOptions[2],
	]);

	const handleSubmit = (e) => {
		e.preventDefault(); // Предотвращаем перезагрузку страницы
		console.log("Выбранный продукт:", selectedProduct);
		console.log("Выбранные цвета:", selectedColors);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Select
				options={productOptions}
				value={selectedProduct}
				onChange={(selectedOption) =>
					setSelectedProduct(selectedOption)
				}
			/>

			<Select
				isMulti
				options={colorOptions}
				value={selectedColors}
				onChange={(selectedOptions) =>
					setSelectedColors(selectedOptions)
				}
			/>

			<button type="submit" className={styles.submitButton}>
				Отправить в консоль
			</button>
		</form>
	);
};
