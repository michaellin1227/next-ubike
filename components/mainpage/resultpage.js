import React from 'react'
import { useState, useEffect } from 'react'
import styles from '@/styles/mainpage.module.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import { useRouter } from 'next/router'

export default function ResultPage({ keyword }) {
  const router = useRouter();
  const [resultdata, setResultData] = useState([]);

  useEffect(() => {
    if (router.query) {

      fetch(
        'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
      )
        .then((r) => r.json())
        .then((data) => {

          let filteredData = data;

          // 如果有勾選區域，加入區域的比對
          if (router.query.area) {
            //取得篩選的區域資料
            const selectedAreaNames = keyword.area
              .filter((area) => area.selected)
              .map((area) => area.name)

            filteredData = filteredData.filter((station) =>
              selectedAreaNames.includes(station.sarea)
            )
          }

          // 如果有搜尋關鍵字，加入關鍵字的比對
          if (router.query.searchkeyword) {
            const searchKeyword = keyword.searchkeyword;

            filteredData = filteredData.filter((v) =>
              v.sna.includes(searchKeyword)
            );

          }


          setResultData(filteredData);
        })

    }
  }, [router.query, keyword])

  return (
    <>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th scope="col" style={{ width: '149px' }}>縣市</th>
            <th scope="col" style={{ width: '299px' }}>區號</th>
            <th scope="col" style={{ width: '398px' }}>站點名稱</th>
            <th scope="col" style={{ width: '224px' }}>可藉車輛</th>
            <th scope="col" style={{ width: '224px' }}>可停站位</th>
          </tr>
        </thead>
        <tbody>
          {resultdata.map((v, i) => {
            const { sna, sarea, sbi, bemp } = v;
            const snaName = sna.split('_')[1];
            const isStriped = i % 2 === 0 ? styles.striped : '';
            return (
              <tr className={`${styles.tr2} ${isStriped}`} key={sna}>
                <td scope="row">台北市</td>
                <td>{sarea}</td>
                <td>{snaName}</td>
                <td className={styles.total}>{sbi}</td>
                <td className={styles.total}>{bemp}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

    </>
  )
}
