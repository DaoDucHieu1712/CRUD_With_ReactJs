import { Route, Routes } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import FinancePage from './pages/FinancePage'
import CatPage from './pages/CatPage'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>Home Page</>} />
        <Route path="/hieu" element={<ProductPage />} />
        <Route path="/dummy2" element={<>Dummy 2</>} />
        <Route path="/Vinh" element={<FinancePage />} />
        <Route path="/Linh" element={<CatPage />} />

      </Routes>
    </>
  )
}

export default App
