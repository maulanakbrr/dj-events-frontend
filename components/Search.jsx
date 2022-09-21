import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/Search.module.scss'

const Search = () => {
  const [term, setTerm] = useState('')

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/events/search?term=${term}`)
    setTerm('')
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={term} placeholder="Search Events..." onChange={e => {
          setTerm(e.target.value)
        }}/>
      </form>
    </div>
  )
}

export default Search