import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import arrowDown from '../assets/caret-down-solid.svg'
import arrowUp from '../assets/caret-up-solid.svg'

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
  const [isSorted, setIsSorted] = useState(false)


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

  const sortRow = () => {
    if (isSorted === false) {




      const sortList = [...menus]
      sortList.reverse()
      setMenus(sortList)




      setIsSorted(true)
    } else if (isSorted === true) {
      setIsSorted(false)

      const sortList = [...menus];
      sortList.reverse();
      setMenus(sortList);

      console.log("Helo is sorted")
    }
    
  }
  /*
  const sortRowDesc = () => {
    const sortList = [...menus];
    sortList.reverse();
    setMenus(sortList);
  }
  */


  useEffect(() => {
    const { name, link, duration } = editValues
    let newErrors = {}

    if (!name) {
      newErrors.name = "Name is required"
    } else if (name.length < 2 || name.length > 60) {
      newErrors.name = "Name must be between 2 and 60 characters"
    }
    if (!isValidURL(link)) newErrors.link = "Link must be a valid URL"
    if (!duration) {
      newErrors.duration = "Duration is required"
    } else if (duration < 1 || duration > 1440) {
      newErrors.duration = "Duration must be between 1 and 1440 minutes"
    }
    
    setErrors(newErrors)
    setIsValid(Object.keys(newErrors).length === 0)
  }, [editValues])

  const startEdit = (menu) => {
    setEditMode(menu.id)
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

    const updatedDocument = { id, content: editValues }
    fetch(`http://localhost:8080/menus/documents/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedDocument)
    })
    .then((updatedMenu) => {
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
            <th>Name 
              { isSorted ? (
                <img src={arrowUp} onClick={sortRow} className="arrow-up" alt="Sort arrow up" />
              ) : (
                <img src={arrowDown} onClick={sortRow} className="arrow-down" alt="Sort arrow down" />
              )}
            </th>
            <th>Link zum Menü</th>
            <th>Dauer 
              { isSorted ? (
                <img src={arrowUp} onClick={sortRow} className="arrow-up" alt="Sort arrow up" />
              ) : (
                <img src={arrowDown} onClick={sortRow} className="arrow-down" alt="Sort arrow down" />
              )}
            </th>
            <th>Ernährungsform 
              { isSorted ? (
                <img src={arrowUp} onClick={sortRow} className="arrow-up" alt="Sort arrow up" />
              ) : (
                <img src={arrowDown} onClick={sortRow} className="arrow-down" alt="Sort arrow down" />
              )}
            </th>
            <th>Eigene Notizen</th>
            <th>Optionen</th>
          </tr>
        </thead>
        <tbody>
          { menus.map(m => <tr key={ m.id }>
            <td>{ editMode === m.id ? (
              <>
                <input type="text" name="name" minLength="2" maxLength="60" value={editValues.name || ''} onChange={handleChange} required />
                {errors.name && <span>{errors.name}</span>}
              </>
              ) : (m.content.name)}
            </td>
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
                    <input type="number" name="duration" min="1" max="1440" required value={editValues.duration || ''} onChange={handleChange} />
                    <span> Minuten</span>
                  <div className='number-box'>
                    <span>{(editValues.duration / 60).toFixed(1)} Stunden</span>
                  </div>
                  {errors.duration && <span><hr />{errors.duration}</span>}
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
