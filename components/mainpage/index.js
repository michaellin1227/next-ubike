import React from 'react'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Options from './options'
import { useRouter } from 'next/router'
import BasicPage from './basicpage'
import ResultPage from './resultpage'

export default function MainPage() {

  const router = useRouter();

  //篩選器
  const totalKeyword = {
    area: [
      { id: 1, name: '大安區', selected: false },
      { id: 2, name: '信義區', selected: false },
      { id: 3, name: '文山區', selected: false },
      { id: 4, name: '內湖區', selected: false },
      { id: 5, name: '南港區', selected: false },
      { id: 6, name: '北投區', selected: false },
      { id: 7, name: '士林區', selected: false },
      { id: 8, name: '萬華區', selected: false },
      { id: 9, name: '中山區', selected: false },
      { id: 10, name: '中正區', selected: false },
      { id: 11, name: '大同區', selected: false },
      { id: 12, name: '松山區', selected: false },
    ],
    searchkeyword: '',
  }

  const [keyword, setKeyword] = useState(totalKeyword)

  // 將router.query的資料setKeyword
  useEffect(() => {
    if (router.query) {
      if (router.query.area) {
        const arrarea = router.query.area.split(',')
        totalKeyword.area.forEach((v) => {
          if (arrarea.includes(v.name)) {
            v.selected = true
          }
        })
      }

      if (router.query.searchkeyword) {
        totalKeyword.searchkeyword = router.query.searchkeyword;
      }

      setKeyword(totalKeyword)
    }
  }, [router.query])


  return (
    <>
      <div className='container'>
        <Options
          keyword={keyword}
          setKeyword={setKeyword}
        />

        {/* 判斷router.query來決定顯示的內容 */}
        {Object.keys(router.query).length === 0 ?
          <BasicPage />
          :
          <ResultPage keyword={keyword} />
        }
      </div>
    </>
  )
}
