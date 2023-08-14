import { useEffect, useState } from 'react';

function App() {
	const [inputValue, setInputValue] = useState('');
	const [findCurr, setFindCurr] = useState();
	const [order, setOrder] = useState('asc');

	const sorting = (col) => {
		if (order === 'asc') {
			const sorted = [...findCurr].sort((a, b) => (a[col] > b[col] ? 1 : -1));
			setFindCurr(sorted);
			setOrder('dsc');
		}
		if (order === 'dsc') {
			const sorted = [...findCurr].sort((a, b) => (a[col] < b[col] ? 1 : -1));
			setFindCurr(sorted);
			setOrder('asc');
		}
	};

	const sortRank = () => {
		if (order === 'asc') {
			const sorted = [...findCurr].sort((a, b) => a.rank - b.rank);
			setFindCurr(sorted);
			setOrder('dsc');
		}
		if (order === 'dsc') {
			const sorted = [...findCurr].sort((a, b) => b.rank - a.rank);
			setFindCurr(sorted);
			setOrder('asc');
		}
	};

	const sortPrice = () => {
		if (order === 'asc') {
			const sorted = [...findCurr].sort((a, b) => a.priceUsd - b.priceUsd);
			setFindCurr(sorted);
			setOrder('dsc');
		}
		if (order === 'dsc') {
			const sorted = [...findCurr].sort((a, b) => b.priceUsd - a.priceUsd);
			setFindCurr(sorted);
			setOrder('asc');
		}
	};

	const sortRateChange = () => {
		if (order === 'asc') {
			const sorted = [...findCurr].sort(
				(a, b) => a.changePercent24Hr - b.changePercent24Hr
			);
			setFindCurr(sorted);
			setOrder('dsc');
		}
		if (order === 'dsc') {
			const sorted = [...findCurr].sort(
				(a, b) => b.changePercent24Hr - a.changePercent24Hr
			);
			setFindCurr(sorted);
			setOrder('asc');
		}
	};

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
							<th className='number' onClick={() => sortRank('rank')}>
								Rank
							</th>
							<th className='name' onClick={() => sorting('name')}>
								Name
							</th>
							<th className='rank' onClick={() => sortPrice('priceUsd')}>
								Price in USD
							</th>
							<th
								className='history'
								onClick={() => sortRateChange('changePercent24Hr')}
							>
								Value change in the last 24h
							</th>
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
								{findCurr.map((item) =>
									item.priceUsd === null ? (
										<tr>
											<td>No data.</td>
										</tr>
									) : (
										<tr>
											<td className='tData'>
												${item.priceUsd.toString().slice(0, 8)}
											</td>
										</tr>
									)
								)}
							</td>
							<td>
								{findCurr.map((item) =>
									item.changePercent24Hr === null ? (
										<tr>
											<td>No data.</td>
										</tr>
									) : (
										<tr>
											<td className='tData'>
												{item.changePercent24Hr.toString().slice(0, 8)}$
											</td>
										</tr>
									)
								)}
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
