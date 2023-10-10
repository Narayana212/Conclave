import Hero from '../../components/hero'
import '../globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })



export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Hero isLogin={false}/>
      {children}
      </body>
    </html>
  )
}
