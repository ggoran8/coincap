import { useEffect, useState } from 'react';

function App() {
	const [inputValue, setInputValue] = useState('');
	const [findCurr, setFindCurr] = useState();

	useEffect(() => {
		const fetchCurrency = () => {
			fetch(`https://api.coincap.io/v2/assets?search=${inputValue}`)
				.then((response) => response.json())
				.then((data) => setFindCurr(data.data))
				.catch((error) => console.error(error.message));
		};

		fetchCurrency();
	}, [inputValue]);

	return (
		<div className='app'>
			<input
				type='text'
				placeholder='Search crypto'
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			{findCurr ? (
				<div className='wholeTable'>
					<table>
						<thead>
							<th className='number'>Rank</th>
							<th className='name'>Name</th>
							<th className='rank'>Price in USD</th>
							<th className='history'>History</th>
						</thead>
						<tbody>
							<td>
								{findCurr.map((item) => (
									<tr>
										<td className='number'>{item.rank}</td>
									</tr>
								))}
							</td>
							<td>
								{findCurr.map((item) => (
									<tr>
										<td className='tData'>{item.name}</td>
									</tr>
								))}
							</td>
							<td>
								{findCurr.map((item) => (
									<tr>
										<td className='tData'>{item.priceUsd}$</td>
									</tr>
								))}
							</td>
						</tbody>
					</table>
					{/* <ol className='name'>
						{findCurr.map((item) => (
							<li>{item.name}</li>
						))}
					</ol>
					<ol className='rank'>
						{findCurr.map((item) => (
							<li>{item.rank}</li>
						))}
					</ol> */}
				</div>
			) : (
				<p>No data.</p>
			)}
		</div>
	);
}

export default App;
