import './globals.css'
import Navbar from './navbar'
import {AuthContextProvider} from './context/AuthContext'


export default function RootLayout({ children }) {
  return (
    <html lang="en" className = "dark">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
