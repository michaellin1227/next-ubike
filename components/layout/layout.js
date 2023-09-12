import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <hr style={{ margin: '0px' }}></hr>
      <main>{children}</main>
      <Footer />
    </>
  )
}
