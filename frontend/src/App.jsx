
import PrimaryInputPage from "./pages/PrimaryInputPage";
import { Toaster } from 'react-hot-toast';
import PrimaryOutputPage from "./pages/PrimaryOutputPage";
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import ProductType from "./components/ProductType";

const App = () => {
  return (
    <>
    
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <PrimaryInputPage/>} />
        <Route path="/output" element={<PrimaryOutputPage/>} />
        <Route path="/catalouge" element={<ProductType/>}/>
      </Routes>
    </BrowserRouter>
   
    {/* <PrimaryOutputPage/> */}
    </>
  );
};

export default App;
