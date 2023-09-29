
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import GoogleCallback from "./component/GoogleCallback";
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFoundPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LoginPage/> }/>
        <Route path="/google/callback" element={ <GoogleCallback/> }> </Route>
        <Route path='/main' element={<MainPage/>}></Route> 
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}


export default App;