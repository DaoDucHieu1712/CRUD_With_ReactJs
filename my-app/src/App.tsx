import { Route, Routes } from 'react-router-dom'
import CatPage from './pages/CatPage'
import FinancePage from './pages/FinancePage'
import SignInPage from './pages/SignInPage'
import StudentPage from './pages/StudentPage'
import AddStudent from './features/product/components/Hieu/AddStudent'
import UpdateStudent from './features/product/components/Hieu/UpdateStudent'
import AccessDenied from './pages/AccessDenied'
import AuthenticationPage from './pages/AuthenticationPage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>Day la Home Page</>} />
        <Route path="/hieu" element={<StudentPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route element={<AuthenticationPage />}>
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/update-student/:id" element={<UpdateStudent />} />
        </Route>
        <Route path="/Vinh" element={<FinancePage />} />
        <Route path="/Linh" element={<CatPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
