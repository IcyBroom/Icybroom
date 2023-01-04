import Image from 'next/image'
import styles from './page.module.css'
import Schedule from './schedule/schedule'
import Visitors from './visitors/visitors'

export default function Home() {
  return (
    <main>
      <Schedule></Schedule>
      <Visitors />
    </main>
  )
}
