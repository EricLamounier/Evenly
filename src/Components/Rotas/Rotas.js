import { BrowserRouter as Router, Routes, Route, useNavigate, Outlet } from "react-router-dom";
import { useEffect } from 'react';
import Login from "../Pages/Login/Login";
import Cadastro from "../Pages/Cadastro/Cadastro";
import Home from "../Pages/Home/Home";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import About from "../Pages/About/About";
import Contact from "../Pages/ContactUs/Contact";
import Licence from "../Pages/Licence/Licence";
import NotFound from "../Pages/NotFound/NotFound";
import { isLoggedIn } from "../../Firebase/Authentication";
import Account from "../Pages/Account/Account";

export default function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/licence" element={<Licence />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/auth/reset_password" element={<ResetPassword />} />

        <Route path="*" element={<NotFound />} />
        
        <Route path="/home" element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/account" element={<PrivateRoute />}>
          <Route index element={<Account />} />
        </Route>
      </Routes>
    </Router> 
  );
}

// verificar a autenticação
const PrivateRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isLoggedIn();
      if (!authenticated) {
        navigate("/");
      }
    };

    checkAuthentication();
  }, [navigate]);

  return <Outlet />;
};