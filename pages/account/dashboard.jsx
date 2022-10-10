import { useContext } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/router";
import { parseCookies } from "@/helpers/index"
import Layout from "@/components/Layout"
import DashboardEvent from "@/components/DashboardEvent"
import AuthContext from "@/context/AuthContext"
import { API_URL } from "@/config/index"
import styles from "@/styles/Dashboard.module.scss"

const DashboardPage = ({events, token}) => {
  const { user } = useContext(AuthContext)
  console.log('TOKEN: ', token)
  const router = useRouter()

  const handleDelete = async id => {
    if (confirm('Are you sure')){
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()

      if(!res.ok){
        if (res.status === 403 || res.status === 401){
          toast.error("No token included")
          return
        }
        toast.error(data.message)
      } else {
        router.reload(window.location.pathname)
      }
    }
  }

  return (
    <Layout title="Dashboard">
      <ToastContainer/>
      <div className={styles.dash}>
        <h1>
          Hi, welcome {user ? user.username : ""} :)
        </h1>
        <h3>My Events</h3>

        {
          events.map(evt => (
            <DashboardEvent key={evt.id} evt={evt} handleDelete={handleDelete}/>
          ))
        }
      </div>
    </Layout>
  )
}

export default DashboardPage

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req)
  const res = await fetch(`${API_URL}/api/events/me`, {
    method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
  })

  const data = await res.json()

  return {
    props: {
      events: data,
      token
    }
  }
}