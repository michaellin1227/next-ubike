import { identity } from 'lodash'
import React from 'react'
import { useState } from 'react'
import Router, { useRouter } from 'next/router'
import styles from '@/styles/options.module.css';
import { style } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';

export default function Options({ keyword, setKeyword }) {

  const router = useRouter();
  const [allClick, setAllClick] = useState(false);

  // 處理-區域Checkbox
  const handleCheckboxChange = (name) => {
    // 判斷router.query.area是否有值
    let arrarea = []
    if (router.query.area && router.query.area !== ' ') {
      arrarea = router.query.area.split(',')
    }

    if (arrarea.includes(name)) {
      arrarea = router.query.area.split(',').filter((v) => {
        if (v === name) return
        return v
      })
    } else {
      arrarea.push(name)
    }

    const strarea = arrarea.join();
    const searchkeyword = router.query.searchkeyword;

    const usp = new URLSearchParams()

    if (strarea) {
      usp.set('area', strarea)
    }
    if (searchkeyword) {
      usp.set('searchkeyword', searchkeyword);
    }

    // 使用 toString() 將 URL 查詢參數轉換成字串
    const queryString = usp.toString()

    // 修改 router.push 部分
    let url = ''
    if (queryString) {
      url += '?' + queryString.replaceAll('%2C', ',')
    }

    router.push(
      {
        pathname: router.pathname,
        search: url,
      },
      undefined,
      { scroll: false }
    )
  }

  const handleInputText = (e) => {
    const searchkeyword = e.target.value;
    setKeyword({ ...keyword, searchkeyword: searchkeyword })
  }

  // 處理-關鍵字搜尋
  const handleInputTextURL = (e) => {
    if (e.key === 'Enter') {
      const searchkeyword = keyword.searchkeyword;
      const arrarea = router.query.area ? router.query.area.split(',') : [];
      const strarea = arrarea.join();

      const usp = new URLSearchParams();

      if (strarea) {
        usp.set('area', strarea)
      }
      if (searchkeyword) {
        usp.set('searchkeyword', searchkeyword);
      }

      // 使用 toString() 將 URL 查詢參數轉換成字串
      const queryString = usp.toString()

      // 修改 router.push 部分
      let url = ''
      if (queryString) {
        url += '?' + queryString.replaceAll('%2C', ',')
      }

      router.push(
        {
          pathname: router.pathname,
          search: url,
        },
        undefined,
        { scroll: false }
      )
    }
  }

  // 全選
  const handleAllClick = () => {
    setAllClick(!allClick);

    let arrarea = [];

    if (!allClick) {
      const allAreaNames = keyword.area.map((v) => v.name);
      arrarea = allAreaNames;
    } else {
      arrarea = []; // 清除已有的区域
    }


    const strarea = arrarea.join();
    const searchkeyword = router.query.searchkeyword;

    const usp = new URLSearchParams()

    if (strarea) {
      usp.set('area', strarea)
    }
    if (searchkeyword) {
      usp.set('searchkeyword', searchkeyword);
    }

    // 使用 toString() 將 URL 查詢參數轉換成字串
    const queryString = usp.toString()

    // 修改 router.push 部分
    let url = ''
    if (queryString) {
      url += '?' + queryString.replaceAll('%2C', ',')
    }

    router.push(
      {
        pathname: router.pathname,
        search: url,
      },
      undefined,
      { scroll: false }
    )

  }


  return (
    <>
      {/* <h3 className={styles.title}>站點資訊</h3> */}

      <div className={styles.searchdiv}>
        <input className={styles.searchinput} type="text" value={keyword.searchkeyword} onChange={handleInputText} onKeyUp={handleInputTextURL} placeholder='搜尋站點'></input>
      </div>

      <div className={styles.selectall}>
        <Checkbox className={styles.allarea}
          type="checkbox"
          checked={allClick}
          onChange={handleAllClick}
          sx={{
            '&.Mui-checked': {
              color: '#b5cc22',
            },
          }}
        />全部勾選
      </div>

      <div className={styles.checkbox}>
        <div className={styles.checkboxes}>
          {keyword.area.map((v) => {
            const { id, name, selected } = v
            return (
              <label className={styles.areadiv} key={id}>
                <Checkbox className={styles.area}
                  key={id}
                  type="checkbox"
                  value={name}
                  checked={selected}
                  onChange={(e) => {
                    handleCheckboxChange(name)
                  }}
                  sx={{
                    '&.Mui-checked': {
                      color: '#b5cc22',
                    },
                  }}
                />{name}
              </label>
            )
          })}
        </div>
        <div className={styles.picdiv}>
          <img className={styles.pic} src='../../bike/mainpic.jpg'></img>
        </div>
      </div>


    </>
  )
}
