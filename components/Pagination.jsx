import React from 'react'
import LinkWrapper from "./LinkWrapper"

const Pagination = ({page, last, url}) => {
  return (
    <div>
      <LinkWrapper href={page > 1 ? `${url}?page=${page -1}` : "#"}>
        <a className={page > 1 ? "btn-secondary" : "btn-secondary btn-disable"}>Previous</a>
      </LinkWrapper>

      <LinkWrapper href={page === last ? "#" : `${url}?page=${page+1}`}>
        <a className={page === last ? "btn-secondary btn-disable" : "btn-secondary"}>Next</a>
      </LinkWrapper>
    </div>
  )
}

export default Pagination