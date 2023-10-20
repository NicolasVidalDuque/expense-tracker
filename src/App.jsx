import {Routes, Route} from "react-router-dom";
// import userContextProider
import Tracker from "./Tracker.jsx"
function App(){
  return (
    <Routes>
      <Route path="/" element={<Tracker />} />
    </Routes>
  )
}
export default App;
