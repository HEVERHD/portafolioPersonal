import React from 'react';
import './portfolio.css';
import IMG1 from '../../assets/POR1.jpg';
import IMG2 from '../../assets/POR2.jpg';
import IMG3 from '../../assets/POR3.jpg';
import IMG4 from '../../assets/POR4.jpg';
import IMG5 from '../../assets/POR5.jpg';
import IMG6 from '../../assets/POR6.jpg';
import IMG7 from '../../assets/POR7.jpg';

const projects = [
	{
		id: 1,
		image: IMG1,
		title: 'E-commerce (Group project) [PERN]',
		github: 'https://github.com/E-commerce-pf',
		demo: 'https://respaldo-everyones-store.vercel.app/',
	},
	{
		id: 2,
		image: IMG2,
		title: 'InmobilApp (Group project) [MERN]',
		github: 'https://github.com/InmobilApp',
		demo: 'https://inmobilapp.vercel.app/',
	},
	{
		id: 3,
		image: IMG4,
		title: 'Panel admin  [PERN]',
		github: 'https://github.com/HEVERHD/admin-front-react',
		demo: 'https://admin-front-react.vercel.app/home',
	},
	{
		id: 4,
		image: IMG5,
		title: 'Social Media Dash [Javascript, Css, Html]',
		github: 'https://github.com/HEVERHD/Social-Media-Dash',
		demo: 'https://social-media-dash-zeta.vercel.app/',
	},
	{
		id: 5,
		image: IMG3,
		title: 'CountriesApp (Project) [PERN]',
		github: 'https://github.com/HEVERHD/Pi-countries',
		demo: 'https://github.com/HEVERHD/Pi-countries',
	},
	{
		id: 6,
		image: IMG6,
		title: 'VideoGameApp  (Project) [PERN]',
		github: 'https://github.com/HEVERHD/videoGames',
		demo: 'https://github.com/HEVERHD/videoGames',
	},
	{
		id: 7,
		image: IMG7,
		title: 'PROTECCION',
		github: 'https://github.com/HEVERHD/proteccion',
		demo: 'https://www.proteccion.com/contenidos/home/personas/pension/',
	},
];

const Portfolio = () => {
	return (
		<section id='portfolio'>
			<h5> My Recent Work</h5>
			<h2> Portfolio</h2>

			<div className='container portfolio__container'>
				{projects.map(({ id, image, title, github, demo }) => {
					return (
						<article key={id} className='portfolio__item'>
							<div className='portfolio__item-image'>
								<img src={image} alt={title} />
							</div>
							<h3>{title}</h3>
							<div className='portfolio__item-cta'>
								<a href={github} className='btn'>
									{' '}
									Github
								</a>
								<a
									href={demo}
									className='btn'
									target='_blank'
									rel='noreferrer'
								>
									{' '}
									Demo
								</a>
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
};

export default Portfolio;
