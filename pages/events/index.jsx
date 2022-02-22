import React from 'react'
import Link from 'next/link'

const EventsPage = () => {
  return (
    <>
        <div>
          <Link href='/'>Home</Link>
          <Link href='/about'>About</Link>
        </div>
        <h2>My Events</h2>
    </>
  )
}

export default EventsPage