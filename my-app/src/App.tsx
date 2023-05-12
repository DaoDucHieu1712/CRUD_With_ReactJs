import { Route, Routes } from 'react-router-dom'
import CatPage from './pages/CatPage'

import CandyPage from './pages/CandyPage'
import FinancePage from './pages/FinancePage'
import SignInPage from './pages/SignInPage'
import StudentPage from './pages/StudentPage'
import AddStudent from './features/product/components/Hieu/AddStudent'
import UpdateStudent from './features/product/components/Hieu/UpdateStudent'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>Home Page</>} />
        <Route path="/hieu" element={<StudentPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/update-student/:id" element={<UpdateStudent />} />
        <Route path="/dummy2" element={<>Dummy 2</>} />
        <Route path="/Vinh" element={<FinancePage />} />
        <Route path="/Linh" element={<CatPage />} />
        <Route path="/Tung" element={<CandyPage />}/>
      </Routes>
    </>
  )
}

export default App
