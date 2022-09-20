import Link from 'next/link'
import Layout from "@/components/Layout"
import EventItem from "@/components/EventItem"
import { API_URL } from "@/config/index"

export default function HomePage(props) {
  const { events, message } = props
  // const newEvents = events.map(item => item.attributes)
  console.log(events)

  return (
    <Layout>
      <h1>Upcoming Events</h1>

      { events.length === 0 && <h3>There is no event show{ message && ', please try again later.'}</h3> }

      { events.map((evt) => ( 
        <EventItem key={evt.slug} evt={evt}/>
      ))}

      {
        events.length > 0 && (
          <Link href='/events'>
            <a className='btn-secondary'>View All Events</a>
          </Link>
        )
      }
    </Layout>
  )
}

export const getServerSideProps = async () => {
  try {
    const res = await fetch(`${API_URL}/api/events?[populate]=*&sort=date:ASC&pagination[limit]=3`)
    const evtRes = await res.json()
    const events = await evtRes.data.map(item => item.attributes)
  
    console.log('loop events:: ', evtRes)
  
    return {
      props: { events: events }
    }
  } catch (err) {
    console.log('ERRO:: ', err)
    return {
      props: { 
        events: [],
        message: 'failed to fetch' 
      }
    }
  }
}
