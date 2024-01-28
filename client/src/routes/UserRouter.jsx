import { Routes, Route } from 'react-router-dom'
import Table from '../components/Table/Table'
import Form from '../components/Form/Form'

const UserRouter = () => {
  return (
    <Routes >
    <Route path='/' element={<Form />} />
    <Route path='/table' element={<Table />} />
    </Routes>
    )
}

export default UserRouter