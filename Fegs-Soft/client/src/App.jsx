import { Routes, Route} from 'react-router-dom'



import AuthLayout from "./layouts/auth/AuthLayout";

// pages
import Login from './pages/auth/Login';
import Error404 from "./pages/404"
import Eleccion from './pages/auth/Eleccion';
import Problemas from './pages/auth/Problemas';
import  Actualizar from './pages/auth/actualizar'
import Saldo from './pages/auth/saldo';
import VerSaldo from './pages/auth/VerSaldo';
import Admin from './pages/auth/Admin';
import Home from './pages/auth/Home';
import Ajustes from './pages/auth/Ajustes';
import Registro from './pages/auth/Registro';






function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path='admin' element={<Admin/>} />
        <Route path="Home" element={<Home/>} />
        <Route path="Ajustes" element={<Ajustes/>} />
        <Route path="problemas" element={<Problemas />} />
        <Route path="eleccion" element={<Eleccion />} />
        <Route path='actualizar' element={<Actualizar />} />
        <Route path='saldo' element={<Saldo />} />
        <Route path='verSaldo' element={<VerSaldo />} />
        <Route path='registro' element={<Registro />} />

      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;