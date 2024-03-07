 //Este es la importacion del Router  
import { Routes, Route} from 'react-router-dom'

// layouts requeridos
import AuthLayout from "./layouts/auth/AuthLayout";

// pages
import Login from './pages/auth/Login';
import ForgetPassword from './pages/auth/ForgetPassword';
import ChangePassword from './pages/auth/ChangePassword';
import Error404 from "./pages/404"
import Eleccion from './pages/auth/Eleccion';
import Problemas from './pages/auth/Problemas';
import  Actualizar from './pages/auth/actualizar'
import Saldo from './pages/auth/saldo';
import VerSaldo from './pages/auth/VerSaldo';



function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="problemas" element={<Problemas />} />
        <Route path="eleccion" element={<Eleccion />} />
        <Route path='actualizar' element={<Actualizar />} />
        <Route path='saldo' element={<Saldo />} />
        <Route path='verSaldo' element={<VerSaldo />} />
        <Route path="olvide-password" element={<ForgetPassword />} />
        <Route
         path="restablecer-contraseña/:token"
          element={<ChangePassword />}
          />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;