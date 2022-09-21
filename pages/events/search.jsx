import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import Link from "next/link"
import EventItem from "@/components/EventItem"
import { API_URL } from "@/config/index"
import qs from 'qs'

export default function SearchEventsPage(props) {
  const { events } = props
  const { term } = useRouter().query

  return (
    <Layout title="Search Results | DJ Events">
      <Link href='/events'>Go Back</Link>
      <h1>Search results for {term}</h1>

      { events.length === 0 && <h3>There is no event show</h3> }

      { events.map((evt) => (  
        <EventItem key={evt.slug} evt={evt}/>
      ))}
    </Layout>
  )
}

export const getServerSideProps = async ({ query: {term}}) => {
  const query = qs.stringify({
    filters: {
      $or: [
        {
          name: {
            $contains: term
          }
        },
        {
          performers: {
            $contains: term
          }
        },
        {
          venue: {
            $contains: term
          }
        },
        {
          description: {
            $contains: term
          }
        }
      ]
    }
  }, {
    encodeValuesOnly: true, // prettify URL
  })
  console.log(`API:: ${API_URL}/api/events?${query}`)
  const res = await fetch(`${API_URL}/api/events?[populate]=*&${query}`)
  const event = await res.json()
  const events = event?.data?.map(item => item.attributes)
  
  console.log('EVENTT:: ', event)

  return {
    props: {events: events}
  }
}
