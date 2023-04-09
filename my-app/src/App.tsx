import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>Dummy</>} />
        <Route path="/dummy1" element={<>Dummy 1</>} />
        <Route path="/dummy2" element={<>Dummy 2</>} />
        <Route path="/dummy3" element={<>Dummy 3</>} />
      </Routes>
    </>
  );
}

export default App;
