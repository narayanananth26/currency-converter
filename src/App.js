// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
	const [input, setInput] = useState("");
	const [from, setFrom] = useState("USD");
	const [to, setTo] = useState("INR");
	const [output, setOutput] = useState("");

	function handleInput(e) {
		setInput(e.target.value);
	}

	function handleSelectFromCurrency(e) {
		setFrom(e.target.value);
	}

	function handleSelectToCurrency(e) {
		setTo(e.target.value);
	}

	useEffect(
		function () {
			async function fetchValue() {
				if (from === to) {
					setOutput(input);
					return;
				}
				if (input) {
					const res = await fetch(
						`https://api.frankfurter.app/latest?amount=${input}&from=${from}&to=${to}`
					);
					const data = await res.json();
					if (data.rates[to]) setOutput(data.rates[to]);
				}
			}
			fetchValue();
		},
		[input, from, to]
	);

	return (
		<div>
			<Input onInput={handleInput} />
			<SelectCurrency
				onSelectCurrency={handleSelectFromCurrency}
				defaultCurrency={from}
			/>
			<SelectCurrency
				onSelectCurrency={handleSelectToCurrency}
				defaultCurrency={to}
			/>
			<p>
				{output} {to}
			</p>
		</div>
	);
}

function Input({ onInput }) {
	return <input type="text" onInput={onInput} />;
}

function SelectCurrency({ onSelectCurrency, defaultCurrency }) {
	const currencies = ["USD", "EUR", "CAD", "INR"];

	return (
		<select onChange={onSelectCurrency} defaultValue={defaultCurrency}>
			{currencies.map((currency) => (
				<option value={currency} key={currency}>
					{currency}{" "}
				</option>
			))}
		</select>
	);
}
