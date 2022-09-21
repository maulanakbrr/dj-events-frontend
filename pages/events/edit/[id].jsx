import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaImage } from 'react-icons/fa';
import { useState } from "react"
import { useRouter } from "next/router"
import Image from 'next/image';
import Link from "next/link"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from '@/styles/AddForm.module.scss'

const EditEventPage = ({evt}) => {
  const { id, attributes } = evt

  const [data, setData] = useState({
    name: attributes.name,
    performers: attributes.performers,
    venue: attributes.venue,
    address: attributes.address,
    time: attributes.time,
    description: attributes.description
  })
  const [imagePreview, setImagePreview] = useState(attributes?.image?.data?.attributes ? attributes?.image?.data?.attributes?.formats?.thumbnail?.url : null)

  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()
    
    // validation
    const hasEmptyFields = Object.values(data).some(el => el === "")

    if(hasEmptyFields){
      toast.error("Please fill in all fields")
    }

    const res = await fetch(`${API_URL}/api/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: {...data}})
    })

    if (!res.ok){
      toast.error('Something went wrong')
    } else {
      const event = await res.json()
      router.push(`/events/${event.data.attributes.slug}`)
    }
  }

  const handleChange = e => {
    const {name, value} = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  return (
    <Layout title='Add Event'>
      <Link href='/events'>Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer/>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input type="text" id="name" name="name" value={data.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input type="text" id="performers" name="performers" value={data.performers} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input type="text" id="venue" name="venue" value={data.venue} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="venue">Address</label>
            <input type="text" id="address" name="address" value={data.address} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={moment(data.date).format('yyyy-MM-DD')} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="text" id="time" name="time" value={data.time} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea text="text" name="description" id="description" value={data.description} onChange={handleChange}></textarea>
        </div>

        <input type="submit" value="Edit Event" className="btn"/>
      </form>

      <h2>Event Image</h2>
      {
        imagePreview ? (
          <Image src={imagePreview} height={100} width={170} />
        ) : (
          <div>
            <p>No image uploaded</p>
          </div>
        )
      }
      
      <div>
        <button className="btn-secondary">
          <FaImage/> Upload Image
        </button>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({params: {id}}) {
  const res = await fetch(`${API_URL}/api/events/${id}?[populate]=*`)
  const events = await res.json()

  return {
    props: {
      evt: events.data
    }
  }
} 

export default EditEventPage