import { Outlet } from "react-router-dom"

import Footer from './components/Footer'

import './app.scss'

function App() {
  return (
    <div id="app">
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App