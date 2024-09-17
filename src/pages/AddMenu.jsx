import { useState } from 'react'


export default function AddMenu() {

  const [entries, setEntries] = useState({
    name: '',
    link: '',
    duration: '',
    ernaehrungsform: '',
    eigene_notizen: '',
  });

  const store = (e) => {
    setEntries({...entries,
      [e.target.name]: e.target.value
    })
  }

  const submit = (e) => {
    if (entries.name==="" || entries.link==="" || entries.duration==="" || entries.ernaehrungsform==="") {
      alert("Ok...\n\n\n\n\n\n\n\n\n\nHOW???")
    } else {
      const submitData = {
        content: {
          name: entries.name,
          link: entries.link,
          duration: entries.duration,
          ernaehrungsform: entries.ernaehrungsform,
          eigene_notizen: entries.eigene_notizen
        }
      }
  
      e.preventDefault()
      fetch("http://localhost:8080/menus/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submitData)
      }).then(() => {
        console.log(JSON.stringify(submitData))
        e.target.reset()
      })
    }

    if (entries.name==="Hello World") {
      confirm("Secret unlocked! 😊😀")
    }
    if (entries.name==="Hallo Welt") {
      confirm("Deutsches secret unlocked! 🍺🥨")
    }
    if (entries.name==="Stein" || entries.name==="Stone") {
      confirm("No...\n\n\nJust no")
    }
  }

  
  return (
    <>
    <h1>Menü hinzufügen</h1>
    <hr />
      <form onSubmit={ submit }>
        <div>
          <fieldset className='first-field'>
            <legend>Menü Name: </legend>
            <input type="text" name="name" minLength="2" maxLength="60" onChange={store} required />
          </fieldset>
        </div>
        
        <div>
          <fieldset>
            <legend>Link zum Menü: </legend>
            <input type="url" name="link" onChange={store} required />
          </fieldset>
        </div>
  
        <div>
          <fieldset>
            <legend>Dauer in min: </legend>
            <input className='number-input' type="number" name="duration" min="1" max="1440" onChange={store} required />
          </fieldset>
        </div>
  
        <div>
          <fieldset className='radio-field'>
            <legend>Ernährungsform: </legend>
            <input className='radio-input' type="radio" id="mischkost" name="ernaehrungsform" value={"Mischkost"} onChange={store} required />
            <label className='radio-label' htmlFor="mischkost">Mischkost</label>
            <input className='radio-input' type="radio" id="vegetarisch" name="ernaehrungsform" value={"Vegetarisch"} onChange={store} required />
            <label className='radio-label' htmlFor="vegetarisch">Vegetarisch</label>
            <input className='radio-input' type="radio" id="vegan"name="ernaehrungsform" value={"Vegan"} onChange={store} required />
            <label className='radio-label' htmlFor="vegan">Vegan</label>
          </fieldset>
        </div>
  
        <div>
          <fieldset>
            <legend>Eigene Notizen: </legend>
            <textarea id="eigene_notizen" name="eigene_notizen" rows="4" onChange={store}></textarea>
          </fieldset>
        </div>

        <hr />
        <button className='input-button' type="submit">Speichern</button>
        <button className='input-button' type="reset">Zurücksetzen</button>
      </form>
    </>
  )
}

