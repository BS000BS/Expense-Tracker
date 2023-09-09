import { Route, Routes } from 'react-router-dom'
import Error404 from './pages/Error404'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import ExpenseDetails from './pages/ExpenseDetails'
import Categories from './pages/Categories'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/update-expense/:id' element={<ExpenseDetails />} />
        <Route path='/create-expense/' element={<ExpenseDetails />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  )
}

export default App
