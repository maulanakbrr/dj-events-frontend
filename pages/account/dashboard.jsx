import { useContext } from "react"
import { parseCookies } from "@/helpers/index"
import Layout from "@/components/Layout"
import DashboardEvent from "@/components/DashboardEvent"
import AuthContext from "@/context/AuthContext"
import { API_URL } from "@/config/index"
import styles from "@/styles/Dashboard.module.scss"

const DashboardPage = ({events}) => {
  const { user } = useContext(AuthContext)

  const handleDelete = id => {
    console.log(id)
  }

  return (
    <Layout title="Dashboard">
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
      events: data
    }
  }
}