import { useState } from 'react'

export default function Home() {

  const [clicks, setClicks] = useState(0)

  function increment() {
    setClicks(clicks+1)
  }

  return(
    <>
    <h1>Willkommen zum Menüplaner</h1>
    <hr />
    <p>This is a one-page app which demonstrates the power of the React.js framework. </p>
    <hr />
    </>
  )
}
