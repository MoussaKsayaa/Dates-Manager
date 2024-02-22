import '../assets/css/home.css';
import { Image } from './tools/special-tools';

export default function Home() {
  return (
    <div className="home">
      <div className="intro">
        <div className='heading'>
          <h1>Welcome To Dates Manager Website</h1>
          <p>here you can manage all items in your store and find out every soon-to-be-expired date prematurely</p>
          <button className='signin-btn' type='button'>start sign-In</button>
        </div>
        <div className='intro-img'>
          <Image imgSrc={require('../assets/images/intro-img.png')} />
        </div>
      </div>
    </div>
  )
}