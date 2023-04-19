import { Outlet } from "react-router-dom"

import './app.scss'

function App() {
  return (
    <div id="app">
      <Outlet/>
    </div>
  )
}

export default App