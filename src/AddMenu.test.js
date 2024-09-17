import { render, screen, window, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddMenu from './pages/AddMenu'


test("Ist der Speicherbutton vorhanden", () => {
  // ARRANGE
  render(<AddMenu />)
 
  // ACT
  const submitButton = screen.getByText('Speichern')
 
  // ASSERT
  expect(submitButton).toBeInTheDocument()
})


test("Formular wird zurückgesetzt, wenn der Reset-Button geklickt wird.", () => {
  // ARRANGE
  render(<AddMenu />)
 
  // Konstanten für die Formularelemente
  const menuNameInput = screen.getByText('Menü Name:').closest('fieldset').querySelector('input')
  const linkInput = screen.getByText('Link zum Menü:').closest('fieldset').querySelector('input')
  const durationInput = screen.getByText('Dauer in min:').closest('fieldset').querySelector('input')
  const radioMischkost = screen.getByLabelText('Mischkost')
  const notesInput = screen.getByText('Eigene Notizen:').closest('fieldset').querySelector('textarea')
  const resetButton = screen.getByText('Zurücksetzen')
 
  // Fülle die Eingabefelder aus
  fireEvent.change(menuNameInput, { target: { value: 'Test Menu' } })
  fireEvent.change(linkInput, { target: { value: 'http://example.com' } })
  fireEvent.change(durationInput, { target: { value: '30' } })
  fireEvent.click(radioMischkost)
  fireEvent.change(notesInput, { target: { value: 'Test notes' } })
 
  // ACT: Klicke auf den Reset-Button
  fireEvent.click(resetButton)
 
  // ASSERT: Überprüfe, ob die Eingabefelder zurückgesetzt wurden
  expect(menuNameInput.value).toBe('')
  expect(linkInput.value).toBe('')
  expect(durationInput.value).toBe('')
  expect(radioMischkost.checked).toBe(false)
  expect(notesInput.value).toBe('')
})

