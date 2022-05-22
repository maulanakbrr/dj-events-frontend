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
        <EventItem key={evt.id} evt={evt}/>
      ))}
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  console.log(events)

  return {
    props: {events}
  }
}
