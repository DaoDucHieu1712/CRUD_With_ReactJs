import { Route, Routes } from 'react-router-dom'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>Home Page</>} />
        <Route path="/hieu" element={<ProductPage />} />
        <Route path="/dummy2" element={<>Dummy 2</>} />
        <Route path="/Vinh" element={<>VinhLQ</>} />
      </Routes>
    </>
  )
}

export default App
