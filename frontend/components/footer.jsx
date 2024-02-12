import React from 'react'
import styles from '../styles/component.module.css'

function Footer() {
  return (
    <div className={styles.footercontainer}>
      <h1>
        Copyright &copy;  2024 | Made by 
        <a href="https://github.com/DeepakSilaych" target="_blank" rel="noreferrer">  <span>Deepak Silaych</span> </a>
      </h1>
    </div>
  )
}

export default Footer