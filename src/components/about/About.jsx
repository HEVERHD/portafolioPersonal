import React from 'react';
import './about.css';
import Me from '../../assets/me.jpg';
import { FaAward } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { VscFolderLibrary } from 'react-icons/vsc';

const About = () => {
	return (
		<section id='about'>
			<h5> Get To Know</h5>
			<h2> About Me</h2>

			<div className='container about__container'>
				<div className='about__me'>
					<div className='about__me-image'>
						<img src={Me} alt='Aboutimage' />
					</div>
				</div>
				<div className='about__content'>
					<div className='about__cards'>
						<article className='about__card'>
							<FaAward className='about__icon' />
							<h5> Experience </h5>
							<small> 1+ Years Working</small>
						</article>
						<article className='about__card'>
							<VscFolderLibrary className='about__icon' />
							<h5> Projects </h5>
							<small> 7 + Projects</small>
						</article>
					</div>
					<p className='about__content'>
						FullStack developer with academic experience creating applications
						Web. I use the Stacks: MERN (MongoDB, Express, React, Nodejs) or
						PERN (PostgreSQL, Express, React, Nodejs) to generate projects
						scalable and customizable. Excellent learning ability and great
						adaptability to different environments and work groups. I perform my
						duties with high performance and efficiency. Interest in Develop
						both frontend and backend.
					</p>
					<a href='#contact' className='btn btn-primary'>
						{' '}
						Let´s Talk
					</a>
				</div>
			</div>
		</section>
	);
};
export default About;
