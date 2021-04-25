import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

const API_KEY =
	'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false';

function App() {
	const [coins, setCoins] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		axios
			.get(API_KEY)
			.then(response => {
				setCoins(response.data);
			})
			.catch(error => console.log(error));
	}, []);

	const handleChange = event => {
		setSearch(event.target.value);
	};

	const filterCoins = coins.filter(coin =>
		coin.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className='coin-app'>
			<div className='coin-search'>
				<h1 className='coin-text'>Search a Coin</h1>
				<form>
					<input
						type='text'
						placeholder='search'
						className='coin-input'
						onChange={handleChange}
					/>
				</form>
			</div>
			{filterCoins.map(coin => {
				return (
					<Coin
						key={coin.id}
						name={coin.name}
						image={coin.image}
						symbol={coin.symbol}
						volume={coin.total_volume}
						price={coin.current_price}
						priceChange={coin.price_change_percentage_24h}
						marketcap={coin.market_cap}
					/>
				);
			})}
		</div>
	);
}

export default App;
