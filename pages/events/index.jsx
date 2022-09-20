import Layout from "@/components/Layout"
import EventItem from "@/components/EventItem"
import { API_URL } from "@/config/index"

export default function EventsPage(props) {
  const { events } = props

  return (
    <Layout>
      <h1>Upcoming Events</h1>

      { events.length === 0 && <h3>There is no event show</h3> }

      { events.map((evt) => ( 
        <EventItem key={evt.slug} evt={evt}/>
      ))}
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(`${API_URL}/api/events?[populate]=*&sort=date:DESC`)
  const event = await res.json()
  const events = event?.data?.map(item => item.attributes)
  
  console.log('EVENTT:: ', event)

  return {
    props: {events: events}
  }
}
