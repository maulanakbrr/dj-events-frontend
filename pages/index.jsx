import Link from "next/link"

export default function HomePage() {
  return (
    <div>
      <div>
        <Link href='/about'>About</Link>
        <Link href='/events'>Events</Link>
      </div>
      <h2>
        Home Page
      </h2>
    </div>
  )
}
