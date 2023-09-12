import React from 'react'
import styles from '@/styles/navbar.module.css'
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className={`${styles.navbar} container`}>
      <div className={styles.logo}>
        <Link href="/"><img className={styles.imglogo} src='../../bike/youbike.png'></img></Link>
      </div>
      <p className={styles.navlink}><Link href="/bike/instructions">使用說明</Link></p>
      <p className={styles.navlink}><Link href="/bike/price">收費方式</Link></p>
      <p className={styles.navlink}><Link href="/bike/info">站點資訊</Link></p>
      <p className={styles.navlink}><Link href="/bike/news">最新消息</Link></p>
      <p className={styles.navlink}><Link href="/bike/activities">活動專區</Link></p>
    </div>
  )
}
