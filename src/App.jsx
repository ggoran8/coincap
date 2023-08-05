import { useState } from 'react';

//https://docs.coincap.io/
//https://api.coincap.io/v2/assets

function App() {
	const [inputValue, setInputValue] = useState('');
	const [findCurr, setFindCurr] = useState();
	const [findRate, setFindRate] = useState();
	const [findHistory, setFindHistory] = useState();

	const fetchCurrency = () => {
		fetch(`https://api.coincap.io/v2/assets/${inputValue}`)
			.then((response) => response.json())
			.then((data) => setFindCurr(data.data))
			.catch((error) => console.error(error.message));

		fetch(`https://api.coincap.io/v2/rates/${inputValue}`)
			.then((response) => response.json())
			.then((data) => setFindRate(data.data))
			.catch((error) => console.error(error.message));

		fetch(`https://api.coincap.io/v2/assets/${inputValue}/history?interval=d1`)
			.then((response) => response.json())
			.then((data) => setFindHistory(data.data))
			.catch((error) => console.error(error.message));
	};

	return (
		<div>
			<input
				type='text'
				placeholder='enter crypto name'
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button onClick={fetchCurrency}>SEND REQUEST</button>
			{findCurr && findRate && findHistory && (
				<>
					<p>Name: {findCurr.name}</p>
					<p>Rank: {findCurr.rank}</p>
					<p>Symbol: {findCurr.symbol}</p>
					<p>Value change in the last 24 hours: {findCurr.changePercent24Hr}</p>
					<p>Current price in USD: {findRate.rateUsd}</p>
					<ol>
						{' '}
						Historical price:
						{findHistory.slice(0, 5).map((item) => (
							<li key={item.time}>{item.priceUsd}</li>
						))}
					</ol>
				</>
			)}
		</div>
	);
}

export default App;
