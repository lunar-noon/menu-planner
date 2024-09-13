import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import PageNotFound from './pages/404page'
import Planner from './pages/Planner'
import AddMenu from './pages/AddMenu'
import Impressum from './pages/Impressum'
import './App.css'



function App() {

  return (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="home" element={<Home />} />
      <Route path="menu-planner" element={<Planner />} />
      <Route path="add-menu" element={<AddMenu />} />
      <Route path="impressum" element={<Impressum />} />
    </Route>
  </Routes>
  
  )
}


export default App