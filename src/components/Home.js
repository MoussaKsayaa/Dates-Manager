import '../assets/css/home.css';
import { Image } from './tools/special-tools';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home">
      <div className="intro">
        <div className='heading'>
          <h1>Welcome To Dates Manager Website</h1>
          <p>here you can manage all items in your store and find out every soon-to-be-expired date prematurely</p>
          <Link to='/login' className='signin-btn'>Let's Get Started</Link>
        </div>
        <div className='intro-img'>
          <Image imgSrc={require('../assets/images/intro-img.png')} />
        </div>
      </div>
    </div>
  )
}