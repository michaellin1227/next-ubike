import React from 'react'
import { useState, useEffect } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '@/styles/mainpage.module.css'

export default function BasicPage() {

  // const [data, setData] = useState([]);
  const [maxSbiData, setMaxSbiData] = useState([]);

  // 第一次進入頁面
  useEffect(() => {
    fetch(
      'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
    )
      .then((r) => r.json())
      .then((data) => {
        // console.log(data)
        // const firstdata = data.slice(0, 12)
        // setData(firstdata)

        // 使用 reduce找到每个區域的最大的sbi
        const maxSbiByArea = data.reduce((result, station) => {
          const { sarea, sbi } = station;
          if (!result[sarea] || sbi > result[sarea].sbi) {
            result[sarea] = { ...station };
          }
          return result;
        }, {});

        // 將最大sbi的站點資料保存
        const maxSbiDataArray = Object.values(maxSbiByArea);

        // 更新站點資料
        // setData(data);
        setMaxSbiData(maxSbiDataArray);
      })
  }, [])

  return (
    <>

        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th scope="col">縣市</th>
              <th scope="col">區號</th>
              <th scope="col">站點名稱</th>
              <th scope="col">可藉車輛</th>
              <th scope="col">可停站位</th>
            </tr>
          </thead>
          <tbody>
            {maxSbiData.map((v, i) => {
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
