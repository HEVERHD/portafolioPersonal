import React from 'react';
import './service.css';
import { BiCheck } from 'react-icons/bi';

const Services = () => {
	return (
		<section id='services'>
			<h5> What I Offer </h5>
			<h2> Services </h2>

			<div className='container services__container'>
				<article className='service'>
					<div className='service__head'>
						<h3> UI/UX Desing </h3>
					</div>

					<ul className='service__list'>
						<li>
							<BiCheck className='service__list-icon' />
							<p> Design a website from scratch </p>
						</li>
						<li>
							<BiCheck className='service__list-icon' />
							<p> Fimga design tools, photoshop and illustrator. </p>
						</li>
					</ul>
				</article>
				{/* End */}
				<article className='service'>
					<div className='service__head'>
						<h3>Web Development Frontend</h3>
					</div>

					<ul className='service__list'>
						<li>
							<BiCheck className='service__list-icon' />
							<p>
								Write code that brings design to life and enables functionality
								created by backend developers.{' '}
							</p>
						</li>
						<li>
							<BiCheck className='service__list-icon' />
							<p>
								{' '}
								I work to make your experience great on mobile phones, tablets,
								desktops.{' '}
							</p>
						</li>
						<li>
							<BiCheck className='service__list-icon' />
							<p>
								Achieving a balance between functional and aesthetic design.{' '}
							</p>
						</li>
					</ul>
				</article>
				{/* end */}
				<article className='service'>
					<div className='service__head'>
						<h3> Web Development Backend </h3>
					</div>

					<ul className='service__list'>
						<li>
							<BiCheck className='service__list-icon' />
							<p>
								Update documentation on architecture, processes and systems{' '}
							</p>
						</li>
						<li>
							<BiCheck className='service__list-icon' />
							<p>
								{' '}
								Develop backend infrastructure for web sites and applications
							</p>
						</li>
						<li>
							<BiCheck className='service__list-icon' />
							<p>
								Work with frontend developers to efficiently transfer data to
								client-side web applications
							</p>
						</li>
					</ul>
				</article>
			</div>
		</section>
	);
};

export default Services;
