import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./Components/Body";
import AddSkill from "./Components/AddSkill";
import Help from "./Components/Help";
import Home from "./Components/Home";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/" element={<Home />} />
            <Route path="add-skill" element={<AddSkill />} />
            <Route path="ask-help" element={<Help />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
