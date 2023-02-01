import './globals.css'
import Navbar from './navbar'
import {AuthContextProvider} from './context/AuthContext'
import Head from 'next/head'


export default function RootLayout({ children }) {
  return (
    <html lang="en" className = "dark">
      <body>
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
