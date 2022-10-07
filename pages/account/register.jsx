import { useState, useEffect, useContext } from "react";
import { FaUser } from "react-icons/fa"
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import styles from '@/styles/AuthForm.module.scss'
import 'react-toastify/dist/ReactToastify.css'; 

const RegisterPage = () => {
  const { register, error } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Password don't match!")
      return
    }

    register({username, password, email})
  }

  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser/> Register
        </h1>

        <ToastContainer/>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
            />
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
            />
          </div>

          <input type="submit" value="Login" className="btn"/>
        </form>

        <p>Already have an account? <Link href="/account/login">Login</Link></p>
      </div>
    </Layout>
  )
}

export default RegisterPage