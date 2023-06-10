
import PrimaryInputPage from "./pages/PrimaryInputPage";
import { Toaster } from 'react-hot-toast';
import PrimaryOutputPage from "./pages/PrimaryOutputPage";
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

const App = () => {
  return (
    <>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <PrimaryInputPage/>} />
        <Route path="/output" element={<PrimaryOutputPage/>} />
      </Routes>
    </BrowserRouter>
   
    {/* <PrimaryOutputPage/> */}
    </>
  );
};

export default App;
