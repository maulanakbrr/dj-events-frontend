import Layout from "@/components/Layout"
import EventItem from "@/components/EventItem"
import { API_URL } from "@/config/index"
import Pagination from "@/components/Pagination"
// constant for show event list per page
const EVENT_PER_PAGE = 5

export default function EventsPage(props) {
  const { events, page, total, last } = props

  return (
    <Layout>
      <h1>Upcoming Events</h1>

      { events.length === 0 && <h3>There is no event show</h3> }

      { events.map((evt) => ( 
        <EventItem key={evt.slug} evt={evt}/>
      ))}

      <Pagination page={page} last={last} url="/events"/>
      
    </Layout>
  )
}

export const getServerSideProps = async ({ query: { page = 1}}) => {
  // calculate start page/start event to be shown
  const start = +page

  const res = await fetch(`${API_URL}/api/events?[populate]=*&sort=date:DESC&pagination[page]=${start}&pagination[pageSize]=${EVENT_PER_PAGE}`)
  const event = await res.json()
  const events = event?.data?.map(item => item.attributes)
  const total = event?.meta?.pagination?.total
  const last = event?.meta?.pagination?.pageCount
  
  console.log('EVENTT:: ', event)

  return {
    props: {
      events: events,
      page: +page,
      total,
      last
    }
  }
}
