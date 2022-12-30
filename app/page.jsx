import Image from 'next/image'
import styles from './page.module.css'
import Schedule from './schedule/schedule'

export default function Home() {
  return (
    <main>
      <Schedule></Schedule>
    </main>
  )
}
