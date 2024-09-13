import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const isValidURL = (url) => {
  try {
    new URL(url)
    return true
  } catch (_) {
    return false
  }
}
export default function Planner() {
  const [menus, setMenus] = useState([])
  const [editMode, setEditMode] = useState(null)
  const [editValues, setEditValues] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [errors, setErrors] = useState({})


  useEffect(() => {
    console.log("Mounted")
    fetch("http://localhost:8080/menus/documents")
   .then(r => r.json())
   .then(qs => setMenus(qs))
  }, [])


  const deleteEntry = (id) => {
    fetch(`http://localhost:8080/menus/documents/${id}`, { method: "DELETE"})
    .then(() => {
      setMenus(menus.filter(menu => menu.id !== id))
    })
  }


  useEffect(() => {
    // Validate the input fields whenever editValues change
    const { name, link, duration, ernaehrungsform } = editValues;
    let newErrors = {};
    const valid = name && link && duration && ernaehrungsform && isValidURL(link);
    
    if (!name) newErrors.name = "Name is required";
    if (!link) newErrors.link = "Link is required";
    if (!isValidURL(link)) newErrors.link = "Link must be a valid URL";
    if (!duration) newErrors.duration = "Duration is required";
    if (!ernaehrungsform) newErrors.ernaehrungsform = "Ernährungsform is required";
    
    setErrors(newErrors);
    setIsValid(valid);
  }, [editValues]);

  const startEdit = (menu) => {
    setEditMode(menu.id);
    setEditValues({ ...menu.content })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditValues(prev => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (e) => {
    setEditValues(prev => ({ ...prev, ernaehrungsform: e.target.value }))
  }

  const saveEdit = (id) => {
    if (!isValid) return

    fetch(`http://localhost:8080/menus/documents/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editValues)
    })
    .then(() => {
        setMenus(menus.map(menu => menu.id === id ? { ...menu, content: editValues } : menu))
        setEditMode(null)
      })
  }

  
  return (
    <>
    <h1>Übersicht Menüs</h1>
    <hr />
    <div className='menu-table'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Link zum Menü</th>
            <th>Dauer</th>
            <th>Ernährungsform</th>
            <th>Eigene Notizen</th>
            <th>Optionen</th>
          </tr>
        </thead>
        <tbody>
          { menus.map(m => <tr key={ m.id }>
            <td>{ editMode === m.id ? (<input type="text" name="name" value={editValues.name || ''} onChange={handleChange} required />) : (m.content.name)}</td>
            <td>
              { editMode === m.id ? (
                <>
                  <div className='link-box'>
                    <input type="url" name="link" required value={editValues.link || ''} onChange={handleChange} />
                    {errors.link && <span>{errors.link}</span>}
                  </div>
                </>
                ) : (
                <Link to={m.content.link}>{m.content.link}</Link>
              )}
            </td>
            <td>
              { editMode === m.id ? (
                <>
                    <input type="number" name="duration" min="1" max="600" required value={editValues.duration || ''} onChange={handleChange} />
                    <span> Minuten</span>
                  <div className='number-box'>
                    <span>{(editValues.duration / 60).toFixed(1)} Stunden</span>
                  </div>
                </>
                ) : (
                  <>
                    <div className='number-box'>
                      {m.content.duration + " Minuten\n"}
                    </div>
                    <hr />
                    <div className='number-box'>
                      {(m.content.duration / 60).toFixed(1) + " Stunden"}
                    </div>
                  </>
                )}
            </td>
            <td>
              { editMode === m.id ? (
                <>
                  <div className='input-box'>
                    <input type="radio" id="mischkost" name="ernaehrungsform" required value="Mischkost" checked={editValues.ernaehrungsform === "Mischkost"} onChange={handleRadioChange} />
                    <label htmlFor="mischkost">Mischkost</label>
                  </div>
                  <div className='input-box'>
                    <input type="radio" id="vegetarisch" name="ernaehrungsform" required value="Vegetarisch" checked={editValues.ernaehrungsform === "Vegetarisch"} onChange={handleRadioChange} />
                    <label htmlFor="vegetarisch">Vegetarisch</label>
                  </div>
                  <div className='input-box'>
                    <input type="radio" id="vegan" name="ernaehrungsform" required value="Vegan" checked={editValues.ernaehrungsform === "Vegan"} onChange={handleRadioChange} />
                    <label htmlFor="vegan">Vegan</label>
                  </div>
                </>
                ) : (m.content.ernaehrungsform)}
            </td>
            <td>{ editMode === m.id ? (<textarea type="text" name="eigene_notizen" value={editValues.eigene_notizen || ''} onChange={handleChange} />) : (m.content.eigene_notizen)}</td>
            <td>
              { editMode === m.id ? (
                <>
                  <button className='table-button' type="submit" onClick={() => saveEdit(m.id)} disabled={!isValid}>Save</button>
                  <button className='table-button' onClick={() => setEditMode(null)}>Cancel</button>
                </>
                ) : (
                <>
                  <button className='table-button' onClick={() => deleteEntry(m.id)}>Eintrag löschen</button>
                  <button className='table-button' onClick={() => startEdit(m)}>Eintrag bearbeiten</button>
                </>
              )}
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
    <hr />
    <br />
    </>
  )
}
