import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./Components/Body";
import AddSkill from "./Components/AddSkill";
import Help from "./Components/Help";
import Home from "./Components/Home";
import PostDetail from "./Components/PostDetail";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/" element={<Home />} />
            <Route path="add-skill" element={<AddSkill />} />
            <Route path="ask-help" element={<Help />} />
            <Route path="/:type/:id" element={<PostDetail />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
