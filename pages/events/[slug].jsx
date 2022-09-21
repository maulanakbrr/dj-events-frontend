import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from '@/styles/Event.module.scss'
import { useRouter } from 'next/router';

const EventPage = ({evt}) => {
  const { id, attributes } = evt
  const router = useRouter()

  const deleteEvent = async () => {
    if (confirm('Are you sure')){
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: "DELETE"
      })

      const data = await res.json()

      if(!res.ok){
        toast.error(data.message)
      } else {
        router.push('/events')
      }
    }
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

        <ToastContainer/>

        <span>
          {new Date(attributes.date).toLocaleString('id-ID')} at {attributes.time}
        </span>
        <h1>{attributes.name}</h1>
        {
          attributes.image && (
            <div className={styles.image}>
              <Image src={attributes?.image?.data?.attributes?.formats ? attributes?.image?.data?.attributes?.formats?.large.url : '/images/event-default.png'} width={960} height={600}/>
            </div>
          )
        }

        <h3>Performers: </h3>
        <p>{attributes.performers}</p>

        <h3>Description: </h3>
        <p>{attributes.description}</p>

        <h3>Venue: {attributes.venue}</h3>
        <p>{attributes.address}</p>

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
  console.log('JADI: ', events)

  return {
    props: {
      evt: events.data[0]
    }
  }
} 

export default EventPage