import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Router,{BrowserRouter, Route, Routes} from 'react-router-dom';
import BloodStock from './pages/BloodStock';
import Hospitals from './pages/Hospitals';
import Requests from './pages/Requests';
import Donors from './pages/Donors';
import CustomQuery from './pages/CustomQuery';
import AboutUs from './pages/AboutUs';
import MoreInfo from './pages/MoreInfo';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/BloodStock" element = {<BloodStock/>} />
        <Route path = "/Hospitals" element = {<Hospitals/>} />
        <Route path = "/Requests" element = {<Requests/>} />
        <Route path = "/Donors" element = {<Donors/>} />
        <Route path = "/CustomQuery" element = {<CustomQuery/>} />
        <Route path = "/AboutUs" element = {<AboutUs/>} />
        <Route path="/blood-group/:group" element={<MoreInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
