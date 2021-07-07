import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import loginService from "../login/services/login";
import Notification from "../login/Notification";
import Swal from "sweetalert2";
import logo from '../../assets/logo.png';
import "./Signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const History = useHistory();

  //Funcion asyncrona que al momento de darle submit al from ejecuta la funcion
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        email,
        password,
      });

      //Guarda token en local Storage
      window.localStorage.setItem("devschooltoken", user["x-token"]);

      //Si user = empty setea la info a vacio, si es correcto muestra token en consola
      console.log(user);
      setUser(user);
      setEmail("");
      setPassword("");
      History.push("/users");
    } catch (e) {
      console.log("inicio de sesion incorrecto");
      //Mensaje de error a componente, duracion de 5s
      setErrorMessage("Credenciales Incorrectas");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      Swal.fire({
        title: "Error!",
        text: "Informacion incorrecta",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="container-main">
      <div className="logo-main">
        <img src={logo} />
        <h1>LEIA</h1>
      </div>
      <div className="container-login">
        <div className="form">
          <h2>Ingrese</h2>
          <h2>Maestro Jedi</h2>
          <form onSubmit={handleLogin}>
            <label className="container-input">
              <input
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                required
              />
              <span className="placeholder">E-mail:</span>
            </label>
            <label className="container-input">
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                required
              />
              <span className="placeholder">Contraseña:</span>
            </label>
            <button type="submit" className="button-login">
              INGRESAR
            </button>
          </form>
          <div className="error">
            <Notification message={errorMessage} />
          </div>
        </div>
        <Link to="/Signup" className="recover-link">
          ¿Olvidaste tu contraseña?
        </Link>
        <div className="terms">
          Al ingresar, aceptas los términos y condiciones.
        </div>
      </div>
    </div>
  );
};

export default Signin;
