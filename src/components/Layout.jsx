import { Outlet } from 'react-router-dom'
import GlobalNavigation from './GlobalNavigation'

export default function Layout() {
  return(
    <div className='App'>
      <GlobalNavigation />
      <div className='content'>
        <br />
        <Outlet />
      </div>
    </div>
  )
}