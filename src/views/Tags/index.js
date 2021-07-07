import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import axios from "axios";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";

const columns = [
  { title: "ID", field: "id", type: "numeric" },
  { title: "Etiqueta", field: "name" },
];

const baseUrl = "https://dev-school-back.herokuapp.com/api/tags/";

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

function Tags() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [idSeleccionado, setidSeleccionado] = useState({
    id: "",
    name: "",
    ventas: "",
  });

  const history = useHistory();

  useEffect(() => {
      if(localStorage.getItem('devschooltoken'))
      {
          history.push('/tags')
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
          title: "La etiqueta ha sido agregada",
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
          title: "Etiqueta duplicada",
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
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "La etiqueta ha sido actualizada",
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
          title: "La etiqueta ha sido eliminada",
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
          title: "la etiqueta no pudo eliminarse",
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
      <h3>Agregar Nueva Etiqueta:</h3>
      <TextField
        className={styles.inputMaterial}
        label="Etiqueta"
        name="name"
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button variant="contained" color="primary" onClick={() => peticionPost()}>
          Insertar
        </Button>
        <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Etiqueta</h3>
      <TextField
        className={styles.inputMaterial}
        label="Etiqueta"
        name="name"
        onChange={handleChange}
        value={idSeleccionado && idSeleccionado.name}
      />
      <br />
      <br />
      <div align="right">
        <Button variant="contained" color="primary" onClick={() => peticionPut()}>
          Editar
        </Button>
        <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Estás seguro que deseas eliminar la etiqueta: {" "}
        <b>{idSeleccionado && idSeleccionado.id}</b>?{" "}
      </p>
      <div align="right">
        <Button variant="contained" color="secondary" onClick={() => peticionDelete()}>
          Sí
        </Button>
        <Button color="primary" onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  );

  return (
    <div className="container-users">
      <br />
      <Button variant="contained" color="primary" onClick={() => abrirCerrarModalInsertar()}>
        Insertar Etiqueta:
      </Button>
      <br />
      <br />
      <MaterialTable
        columns={columns}
        data={data}
        title="Ingreso de Etiqueta:"
        actions={[
          {
            icon: "edit",
            tooltip: "Editar Etiqueta",
            onClick: (event, rowData) => seleccionarselecccion(rowData, "Editar"),
          },
          {
            icon: "delete",
            tooltip: "Eliminar Etiqueta",
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

export default Tags;
