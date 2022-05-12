import React from 'react';
import './contact.css';
import { MdOutlineEmail } from 'react-icons/md';
import { AiOutlineWhatsApp } from 'react-icons/ai';

const Contact = () => {
	return (
		<section id='contact'>
			<h5> Get In Touch</h5>
			<h2> Contact Me</h2>

			<div className='container contact__container'>
				<div className='contact__options'>
					<article className='contact__option'>
						<MdOutlineEmail className='contact__option-icon' />
						<h4> Email</h4>
						<h5> hever11.hdgd@gmail.com</h5>
						<a href='malito:hever11.hdgd@gmail.com'> Send to Message</a>
					</article>
					<article className='contact__option'>
						<AiOutlineWhatsApp className='contact__option-icon' />
						<h4>WhatsApp</h4>
						<h5>+57 300 617 6641</h5>
						<a href='https://api.whatsapp.com/send?phone=573006176641&text=Hola,%20Saludos%20Feliz%20Dia'>
							{' '}
							Send to Message
						</a>
					</article>
				</div>
				{/* END OF CONTACT OPTIONS */}
				<form action=''>
					<input
						type='text'
						name='name'
						placeholder='Your Full Name'
						required
					/>
					<input type='email' name='email' placeholder='Your Email' required />
					<textarea name='message' rows='7' placeholder='Your message' required>
						{' '}
					</textarea>
					<button type='submit' className='btn-primary'>
						Send Message
					</button>
				</form>
			</div>
		</section>
	);
};

export default Contact;
