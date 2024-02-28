import { useState, useEffect } from "react";
import { InputField } from "./tools/special-tools";
import "../assets/css/account.css";
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [logInData, setLogInData] = useState({userName:'', businessName: '', email:'', password:''});
  const [isDisabled, setIsDisabled] = useState(true)
  useEffect(() => {
    const isUserNameValid = logInData.userName.length >= 4;
    const isBusinessNameValid = logInData.businessName.match(/^[a-z]\S[a-z-_]{2,27}[a-z]$/g);
    const isEmailValid = logInData.email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/g);
    const isPasswordValid = logInData.password.match(/^[a-zA-Z][a-zA-Z0-9%$#@!*&^]{7,}$/g);
    if (isUserNameValid && isEmailValid && isPasswordValid && isBusinessNameValid) setIsDisabled(false)
    else setIsDisabled(true);
  }, [logInData])
  return (
    <div className="account">
      <form>
        <h1 className="heading">Sign Up</h1>
        <InputField type="text" value={logInData.userName} onChange={e => setLogInData(prev => ({...prev, userName: e.target.value}))} required>Your Name *</InputField>
        <InputField type="text" value={logInData.businessName} onChange={e => setLogInData(prev => ({...prev, businessName: e.target.value}))} required>Business Name *</InputField>
        <InputField type="email" value={logInData.email} onChange={e => setLogInData(prev => ({...prev, email: e.target.value}))} required>Email *</InputField>
        <InputField type="password" value={logInData.password} onChange={e => setLogInData(prev => ({...prev, password: e.target.value}))} required>Password *</InputField>
        <button type="submit" className="submit-btn" disabled={isDisabled}>Sign In</button>
        <p className="another-option">Do you have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
}