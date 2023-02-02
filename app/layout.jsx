import './globals.css'
import Navbar from './layout/navbar'
import Footer from './layout/footer'
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
        <Footer />
      </body>
    </html>
  )
}
