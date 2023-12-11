import React, { useEffect, useState } from 'react';
import { ReactComponent as Arrowup } from '../assets/icons/arrow-up.svg';

const ScrollUpButton = () => {
	const [scrollUpButton, setScrollUpButton] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 1000) {
				setScrollUpButton(true);
			} else {
				setScrollUpButton(false);
			}
		});
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div>
			{scrollUpButton && (
				<button className='buttonStyle' onClick={scrollToTop}>
					<Arrowup />
				</button>
			)}
		</div>
	);
};

export default ScrollUpButton;
