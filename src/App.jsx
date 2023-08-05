import { useEffect, useState } from 'react';

function App() {
	const [data, setData] = useState();

	useEffect(() => {
		const fetchImageOfTheDay = () => {
			fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
				.then((response) => response.json())
				.then((fetchedData) => setData(fetchedData))
				.catch((error) => console.log(error));
		};

		fetchImageOfTheDay();
	}, []);

	return (
		<div className='app'>
			<h1>Pozivi na API:</h1>
			{/*<button onClick={() => fetchImageOfTheDay()}>Fetch image</button>*/}
			{data ? (
				<div>
					<h3>{data.title}</h3>
					<img src={data.url} alt='NASA image of the day' />
					<p>{data.explanation}</p>
				</div>
			) : (
				<p>No data.</p>
			)}
		</div>
	);
}

export default App;
