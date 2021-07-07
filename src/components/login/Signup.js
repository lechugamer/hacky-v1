import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import loginService from "../login/services/signup";
import Swal from "sweetalert2";
import logo from '../../assets/logo.png';
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const History = useHistory();

  //Funcion asyncrona que al momento de darle submit al from ejecuta la funcion
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        email,
      });

      //Guarda token en local Storage
      window.localStorage.setItem("devschooltoken", user["x-token"]);

      //Si user = empty setea la info a vacio, si es correcto muestra token en consola
      console.log(user);
      setUser(user);
      setEmail("");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Correo de reseteo enviado",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        History.push("/");
      }, 1600);
    } catch (e) {
      console.log("inicio de sesion incorrecto");
      //Mensaje de error
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Correo electronico invalido",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="container-recover">
      <div className="logo-recover">
        <img src={logo} />
        <h1>LEIA</h1>
      </div>
      <div className="recover-main">
        <div className="form-recover">
          <h2>Recuperación</h2>
          <h2>de la cuenta</h2>
          <form onSubmit={handleLogin}>
            <label className="email-recover">
              <input
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                required
              />
              <span className="placeholder">E-mail:</span>
            </label>
            <button type="submit" className="button-recover">
              Restaurar 
              <br />
              Contraseña
            </button>
          </form>
        </div>
        <Link to="/">Regresar página de inicio</Link>
      </div>
    </div>
  );
};

export default Signup;
