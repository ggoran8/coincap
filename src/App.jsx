import { useEffect, useState } from 'react';
import bitcoin from './bitcoin.png';
import ethereum from './ethereum.png';
import tether from './tether.png';
import bnb from './bnb.png';

function App() {
	const [inputValue, setInputValue] = useState('');
	const [findCurr, setFindCurr] = useState();
	const [order, setOrder] = useState('dsc');
	const [isActive, setIsActive] = useState(false);

	const handleClick = () => {
		setIsActive((current) => !current);
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

	const sortName = (col) => {
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
			<div className='input'>
				<input
					type='text'
					placeholder='Search for specific cryptocurrency'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
			</div>
			<div className='bitcoin-container'>
				<img className='bitcoin' src={bitcoin} alt='Bitcoin logo' />
			</div>
			<div className='ethereum-container'>
				<img className='ethereum' src={ethereum} alt='Ethereum logo' />
			</div>
			<div className='tether-container'>
				<img className='tether' src={tether} alt='Tether logo' />
			</div>
			<div className='bnb-container'>
				<img className='bnb' src={bnb} alt='Bnb logo' />
			</div>
			{findCurr ? (
				<div className='wholeTable'>
					<table class='table table-dark  table-hover'>
						<thead>
							<th scope='col' className='number'>
								Rank
								<button
									className={`${
										isActive ? 'arrow-down' : 'arrow-up arrow-down'
									}`}
									onClick={() => {
										sortRank('rank');
										handleClick();
									}}
								>
									▲
								</button>
							</th>
							<th scope='col' className='name'>
								Name
								<button
									className={`${
										isActive ? 'arrow-down' : 'arrow-up arrow-down'
									}`}
									onClick={() => {
										sortName('name');
										handleClick();
									}}
								>
									▲
								</button>
							</th>
							<th scope='col' className='rank'>
								Price in USD
								<button
									className={`${
										isActive ? 'arrow-down' : 'arrow-up arrow-down'
									}`}
									onClick={() => {
										sortPrice('name');
										handleClick();
									}}
								>
									▲
								</button>
							</th>
							<th scope='col' className='history'>
								Value change in the last 24h
								<button
									className={`${
										isActive ? 'arrow-down' : 'arrow-up arrow-down'
									}`}
									onClick={() => {
										sortRateChange('name');
										handleClick();
									}}
								>
									▲
								</button>
							</th>
						</thead>
						<tbody>
							<td>
								{findCurr.map((item) => (
									<tr>
										<th scope='row' className='number'>
											{item.rank}
										</th>
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
