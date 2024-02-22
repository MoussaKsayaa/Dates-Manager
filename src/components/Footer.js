export default function Footer() {
  return (
    <div className='footer'>
      <div className='container'>
        <div className='copyright'>
          All Rights Reserved {new Date().getFullYear()}
        </div>
        <div className='auther'>
          By <a href="https://github.com/MoussaKsayaa" style={{color:"inherit", fontWeight: 'bold'}}>Moussa Ksayaa ❤</a>
        </div>
      </div>
    </div>
  )
}