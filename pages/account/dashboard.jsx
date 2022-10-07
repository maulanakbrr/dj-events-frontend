import { useContext } from "react"
import Layout from "@/components/Layout"
import AuthContext from "@/context/AuthContext"

const DashboardPage = () => {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <Layout title="Dashboard">
      Hi, welcome {user ? user.username : ""} :)
    </Layout>
  )
}

export default DashboardPage