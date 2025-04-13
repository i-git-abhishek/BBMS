import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Router,{BrowserRouter, Route, Routes} from 'react-router-dom';
import BloodStock from './pages/BloodStock';
import Hospitals from './pages/Hospitals';
import CustomQuery from './pages/CustomQuery';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/BloodStock" element = {<BloodStock/>} />
        <Route path = "/Hospitals" element = {<Hospitals/>} />
        <Route path = "/CustomQuery" element = {<CustomQuery/>} />
        <Route path = "/AboutUs" element = {<AboutUs/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
