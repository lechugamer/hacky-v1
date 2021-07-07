import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import { Multiselect } from "multiselect-react-dropdown";
import { myAxios } from "../../api/Index";

const columns = [
  { title: "ID", field: "id", type: "numeric"},
  { title: "ID de usuario", field: "userId", type: "numeric" },
  { title: "Titulo", field: "title" },
  { title: "Contenido", field: "content" },
  { title: "Etiquetas", field: "name" },
];

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

function Entries() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEditarEtiquetas, setModalEditarEtiquetas] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [reload, setReload] = useState(false);
  const [idSeleccionado, setidSeleccionado] = useState({
    id: "",
    userId: "",
    title: "",
    content: "",
    ventas: "",
  });
  const [tags, setTags] = useState([]);
  const [myTags, setMyTags] = useState([]);

  const history = useHistory();

  useEffect(() => {
      if(localStorage.getItem('devschooltoken'))
      {
          history.push('/entries')
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
    try {
      const { data } = await myAxios({ method: "get", url: "/entries" });
      setData(data);
      console.log("mis entradas =>", data);
    } catch (error) {
      console.error(error);
    }
  };

  const peticionGetEtiquetas = async () => {
    try {
      const { data } = await myAxios({ methos: "get", url: "/tags" });
      setTags(data);
      console.log("mis etiquetas a agregar =>", data);
    } catch (error) {
      console.error(error);
    }
  };

  const peticionPost = async () => {
    try {
      await myAxios({
        method: "post",
        url: `/entries/${idSeleccionado.id}`,
        data: idSeleccionado,
      });
      setReload(!reload);
      abrirCerrarModalInsertar();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "La entrada ha sido creada",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      abrirCerrarModalInsertar();
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al crear la entrada",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const peticionPut = async () => {
    try {
      await myAxios({
        method: "put",
        url: `/entries/${idSeleccionado.id}`,
        data: idSeleccionado,
      });
      setReload(!reload);
      abrirCerrarModalEditar();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "La entrada ha sido actualizada",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      abrirCerrarModalEditar();
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error en los datos ingresados",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const peticionDelete = async () => {
    try {
      await myAxios({
        method: "DELETE",
        url: `/entries/${idSeleccionado.id}`,
        data: idSeleccionado,
      });
      setReload(!reload);
      abrirCerrarModalEliminar();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "La entrada ha sido eliminada",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      abrirCerrarModalEliminar();
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al eliminar entrada",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const asignarEtiquetas = async () => {
    try {
      const body = {
        tagsId: myTags.map((item) => {
          return item.id;
        }),
        entryId: idSeleccionado.id,
      };
      console.log("Body de manytags a coneccion =>", body);
      await myAxios({
        method: "post",
        url: `/entryTags/manytags`,
        data: body
      });
      abrirCerrarModalEditarEtiquetas()
      Swal.fire({
        position: "center",
        icon: "success",
        title: "La etiqueta ha sido concteada",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      abrirCerrarModalEditarEtiquetas()
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al  conectar la etiqueta",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const seleccionarSelecccion = (selecccion, caso) => {
    setidSeleccionado(selecccion);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const seleccionarSelecccionEtiquetas = (selecccion, caso) => {
    setidSeleccionado(selecccion);
    caso === "Etiquetas"
      ? abrirCerrarModalEditarEtiquetas()
      : abrirCerrarModalEliminarEtiquetas();
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

  const abrirCerrarModalEditarEtiquetas = () => {
    setModalEditarEtiquetas(!modalEditarEtiquetas);
  };

  const abrirCerrarModalEliminarEtiquetas = () => {
    setModalEliminar(!modalEliminar);
  };

  useEffect(() => {
    peticionGet();
  }, [reload]);

  useEffect(() => {
    peticionGetEtiquetas();
  }, []);

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nueva Entrada</h3>
      <TextField
        className={styles.inputMaterial}
        label="User-Id"
        name="userId"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Titulo"
        name="title"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Contenido"
        name="content"
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
      <h3>Editar Entrada</h3>
      <TextField
        className={styles.inputMaterial}
        label="User-id"
        name="userId"
        onChange={handleChange}
        value={idSeleccionado && idSeleccionado.userId}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Titulo"
        name="title"
        onChange={handleChange}
        value={idSeleccionado && idSeleccionado.title}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Contenido"
        name="content"
        onChange={handleChange}
        value={idSeleccionado && idSeleccionado.content}
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

  const bodyEditarEtiquetas = (
    <div className={styles.modal}>
      <h3>Agregar Etiquetas</h3>
      <Multiselect
        options={tags}
        displayValue="name"
        onSelect={(selectedList) => setMyTags(selectedList)}
      />
      <br />
      <br />
      <div align="right">
        <Button variant="contained" color="primary" onClick={asignarEtiquetas}>
          Editar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => abrirCerrarModalEditarEtiquetas()}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Estás seguro que deseas eliminar la entrada{" "}
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
        Agregar Entrada:
      </Button>
      <br />
      <br />
      <MaterialTable
        columns={columns}
        data={data}
        title="Ingreso de entradas:"
        actions={[
          {
            icon: "edit",
            tooltip: "Editar Entradas",
            onClick: (event, rowData) =>
              seleccionarSelecccion(rowData, "Editar"),
          },
          {
            icon: "delete",
            tooltip: "Eliminar Entradas",
            onClick: (event, rowData) =>
              seleccionarSelecccion(rowData, "Eliminar"),
          },
          {
            icon: "tags",
            tooltip: "Agregar Etiquetas",
            onClick: (event, rowData) =>
              seleccionarSelecccionEtiquetas(rowData, "Etiquetas"),
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

      <Modal
        open={modalEditarEtiquetas}
        onClose={abrirCerrarModalEditarEtiquetas}
      >
        {bodyEditarEtiquetas}
      </Modal>

      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminarEtiquetas}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}

export default Entries;
