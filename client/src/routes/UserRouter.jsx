import { Routes, Route } from 'react-router-dom'
import Table from '../components/Table'

const UserRouter = () => {
  return (
    <Routes >
    <Route path='/table' element={<Table />} />
    </Routes>
    )
}

export default UserRouter