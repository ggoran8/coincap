import React, { useEffect, useState } from 'react';

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
				<button
					style={{
						position: 'fixed',
						bottom: '50px',
						right: '50px',
						height: '50px',
						width: '50px',
						fontSize: '50px',
					}}
					onClick={scrollToTop}
				>
					^
				</button>
			)}
		</div>
	);
};

export default ScrollUpButton;
