import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import App from './App';


jest.mock("./pages/Home", () => () => <div>DOC</div> );

test("App in default route contains Home", () => {
  
  // ARRANGE
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )
  // ACT

  // ASSERT

  expect(screen.getByText("DOC")).toBeInTheDocument()
})


jest.mock("./pages/AddMenu", () => () => <div>AddMenu-DOC</div> );

test("App contains AddMenu in route", () => {
  
  // ARRANGE
  render(
    <MemoryRouter initialEntries={['/add-menu']}>
      <App />
    </MemoryRouter>
  )
  // ACT

  // ASSERT

  expect(screen.getByText("AddMenu-DOC")).toBeInTheDocument()
})


jest.mock("./pages/Planner", () => () => <div>Planner-DOC</div> );

test("App contains Planner in route", () => {
  
  // ARRANGE
  render(
    <MemoryRouter initialEntries={['/menu-planner']}>
      <App />
    </MemoryRouter>
  )
  // ACT

  // ASSERT

  expect(screen.getByText("Planner-DOC")).toBeInTheDocument()
})