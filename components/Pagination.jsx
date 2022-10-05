import React from 'react'
import LinkWrapper from "./LinkWrapper"
import styles from '@/styles/Pagination.module.scss'

const Pagination = ({page, last, url}) => {
  return (
    <div className={styles.pagination}>
      <LinkWrapper href={page > 1 ? `${url}?page=${page -1}` : "#"}>
        <a className={page > 1 ? "btn-secondary" : "btn-secondary btn-disable"}>Previous</a>
      </LinkWrapper>

      <p>{`page ${page} of ${last}`}</p>

      <LinkWrapper href={page === last ? "#" : `${url}?page=${page+1}`}>
        <a className={page === last ? "btn-secondary btn-disable" : "btn-secondary"}>Next</a>
      </LinkWrapper>
    </div>
  )
}

export default Pagination