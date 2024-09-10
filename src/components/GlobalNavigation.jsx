import { Link } from 'react-router-dom'
export default function GlobalNavigation() {
  return (
    <>
    <div className='navigation'>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu-planner">Übersicht Menüs</Link></li>
        <li><Link to="/add-menu">Menü hinzufügen</Link></li>
        <li><Link to="/impressum">Impressum</Link></li>
      </ul>
      <hr className='line' />
    </div>
    </>
  )
}
