import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from '@/styles/Event.module.scss'

const EventPage = ({evt}) => {
  const deleteEvent = () => {
    console.log('delete')
  }

  return (
    <Layout title='Event'>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt/> Edit Event
            </a>
          </Link>

          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes/> Delete Event
          </a>
        </div>

        <span>
          {new Date(evt.date).toLocaleString('id-ID')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {
          evt.image && (
            <div className={styles.image}>
              <Image src={evt.image.data.attributes.formats.large.url} width={960} height={600}/>
            </div>
          )
        }

        <h3>Performers: </h3>
        <p>{evt.performers}</p>

        <h3>Description: </h3>
        <p>{evt.description}</p>

        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>
            {'<'} Back
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({query: {slug}}) {
  const res = await fetch(`${API_URL}/api/events?[populate]=*&filters[slug]=${slug}`)
  const events = await res.json()

  return {
    props: {
      evt: events.data[0].attributes
    }
  }
} 

export default EventPage