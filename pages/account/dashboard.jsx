import { useContext } from "react"
import { parseCookies } from "@/helpers/index"
import Layout from "@/components/Layout"
import AuthContext from "@/context/AuthContext"
import { API_URL } from "@/config/index"

const DashboardPage = ({events}) => {
  const { user } = useContext(AuthContext)
  console.log(user)

  return (
    <Layout title="Dashboard">
      <h1>
        Hi, welcome {user ? user.username : ""} :)
      </h1>
      <p>events: {events.length}</p>
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