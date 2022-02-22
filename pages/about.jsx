import React from 'react'
import Link from 'next/link'

const AboutPage = () => {
  return (
    <>
      <div>
        <Link href='/'>Home</Link>
        <Link href='/events'>Events</Link>
      </div>
      <h2>About</h2>
    </>
  )
}

export default AboutPage