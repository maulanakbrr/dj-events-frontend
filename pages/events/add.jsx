import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from '@/styles/AddForm.module.scss'

const AddEventPage = () => {
  const [data, setData] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    time: '',
    description: ''

  })

  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()
    
    // validation
    const hasEmptyFields = Object.values(data).some(el => el === "")

    if(hasEmptyFields){
      toast.error("Please fill in all fields")
    }

    const res = await fetch(`${API_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: {...data}})
    })

    if (!res.ok){
      toast.error('Something went wrong')
    } else {
      const event = await res.json()
      router.push(`${event.data.attributes.slug}`)
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
      <h1>Add Event</h1>
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
            <input type="date" id="date" name="date" value={data.date} onChange={handleChange} />
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

        <input type="submit" value="Add Event" className="btn"/>
      </form>
    </Layout>
  )
}

export default AddEventPage