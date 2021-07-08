import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import axios from "axios";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Users.css";
import Swal from "sweetalert2";

const columns = [
  { title: "ID", field: "id", type: "numeric" },
  { title: "Nombre", field: "name" },
  { title: "E-mail", field: "email" },
  { title: "Rol", field: "role.name" },
];

const baseUrl = "https://dev-school-back.herokuapp.com/api/user/";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

function Users() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [idSeleccionado, setidSeleccionado] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    ventas: "",
  });

  const history = useHistory();

  useEffect(() => {
      if(localStorage.getItem('devschooltoken'))
      {
          history.push('/users')
      } else {
          history.push('/')
      }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setidSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionGet = async () => {
    await axios
      .get(baseUrl, {
        headers: { "x-token": localStorage.getItem("devschooltoken") },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPost = async () => {
    await axios
      .post(baseUrl, idSeleccionado, {
        headers: { "x-token": localStorage.getItem("devschooltoken") },
      })
      .then((response) => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "El usuario ha sido agregado",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        abrirCerrarModalInsertar();
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error en los datos ingresados",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const peticionPut = async () => {
    await axios
      .put(baseUrl + "/" + idSeleccionado.id, idSeleccionado, {
        headers: { "x-token": localStorage.getItem("devschooltoken") },
      })
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((selecccion) => {
          if (selecccion.id === idSeleccionado.id) {
            selecccion.id = idSeleccionado.id;
            selecccion.name = idSeleccionado.name;
            selecccion.email = idSeleccionado.email;
            selecccion.role.id = idSeleccionado.role.id;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "El usuario ha sido actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        abrirCerrarModalEditar();
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error en los datos ingresados",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const peticionDelete = async () => {
    await axios
      .delete(baseUrl + "/" + idSeleccionado.id, {
        headers: { "x-token": localStorage.getItem("devschooltoken") },
      })
      .then((response) => {
        setData(
          data.filter((selecccion) => selecccion.id !== idSeleccionado.id)
        );
        abrirCerrarModalEliminar();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "El usuario ha sido eliminada",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        abrirCerrarModalEliminar();
        Swal.fire({
          position: "center",
          icon: "error",
          title: "No se puede elminar un Admin",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const seleccionarselecccion = (selecccion, caso) => {
    setidSeleccionado(selecccion);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Usuario:</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="name"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="E-mail"
        name="email"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Rol"
        name="role.id"
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button
          variant="contained"
          color="primary"
          onClick={() => peticionPost()}
        >
          Insertar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => abrirCerrarModalInsertar()}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Usuario</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="name"
        onChange={handleChange}
        value={idSeleccionado && idSeleccionado.name}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="E-mail"
        name="email"
        onChange={handleChange}
        value={idSeleccionado && idSeleccionado.email}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Rol"
        name="role.id"
        onChange={handleChange}
        value={idSeleccionado && idSeleccionado.role.id}
      />
      <br />
      <br />
      <div align="right">
        <Button
          variant="contained"
          color="primary"
          onClick={() => peticionPut()}
        >
          Editar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => abrirCerrarModalEditar()}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Estás seguro que deseas eliminar el usuario:{" "}
        <b>{idSeleccionado && idSeleccionado.id}</b>?{" "}
      </p>
      <div align="right">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => peticionDelete()}
        >
          Sí
        </Button>
        <Button color="primary" onClick={() => abrirCerrarModalEliminar()}>
          No
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container-users">
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() => abrirCerrarModalInsertar()}
      >
        Insertar Usuario:
      </Button>
      <br />
      <br />
      <MaterialTable
        columns={columns}
        data={data}
        title="Ingreso de Usuario:"
        actions={[
          {
            icon: "edit",
            tooltip: "Editar Usuario",
            onClick: (event, rowData) =>
              seleccionarselecccion(rowData, "Editar"),
          },
          {
            icon: "delete",
            tooltip: "Eliminar Usuario",
            onClick: (event, rowData) =>
              seleccionarselecccion(rowData, "Eliminar"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        localization={{
          header: {
            actions: "Acciones",
          },
        }}
      />

      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>

      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}

export default Users;
