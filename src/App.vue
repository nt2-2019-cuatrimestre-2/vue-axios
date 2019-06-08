<template>
  <div id="app">
    <b-alert
      :show="showAlert"
      dismissible
      @dismissed="showAlert = false"
      variant="warning"
    >{{mensajeAlert}}</b-alert>
    <b-row>
      <b-col>
        <label for>Nuevo libro</label>
      </b-col>
      <b-col>
        <b-input v-model="nuevoLibro.nombre" placeholder="nombre..."></b-input>
      </b-col>
      <b-col>
        <b-input v-model="nuevoLibro.año" placeholder="año..."></b-input>
      </b-col>
      <b-col>
        <b-button variant="primary" @click="addLibro">Agregar libro</b-button>
      </b-col>
      <b-col></b-col>
    </b-row>
    <br>
    <h1>Libros</h1>

    <b-row>
      <b-col>
        <label>Nombre</label>
      </b-col>
      <b-col>
        <label>Año</label>
      </b-col>
      <b-col></b-col>
      <b-col></b-col>
    </b-row>
    <b-row v-for="libro in libros" :key="libro._id" class="mt-2">
      <b-col>{{libro.nombre}}</b-col>
      <b-col>{{libro.año}}</b-col>
      <b-col>
        <b-button @click="eliminar(libro)" variant="danger" size="sm">eliminar</b-button>
      </b-col>
      <b-col>
        <b-button @click="getLibro(libro._id)" variant="primary" size="sm">detalles</b-button>
      </b-col>
    </b-row>
    <samp>{{libroSeleccionado}}</samp>
  </div>
</template>

<script>
import LibroService from "./services/libro.services";

export default {
  name: "app",
  data() {
    return {
      libros: [],
      libroSeleccionado: null,
      nuevoLibro: {
        nombre: null,
        año: null
      },
      showAlert: false,
      mensajeAlert: "",
      url: "http://localhost:3000/libro"
    };
  },
  created() {
    this.axios.get(this.url).then(respuesta => {
      console.log(respuesta);
      this.libros = respuesta.data;
    });
  },
  methods: {
    esLibroValido() {
      let esValido = true;
      for (const key in this.nuevoLibro) {
        if (this.nuevoLibro.hasOwnProperty(key)) {
          const element = this.nuevoLibro[key];
          if (element == null || element.trim() == "") {
            esValido = false;
          }
        }
      }
      return esValido;
    },

    async getLibro(libroId) {
      let libro = await this.axios.get(`${this.url}/${libroId}`);
      this.libroSeleccionado = libro;
    },
    addLibro() {
      if (this.esLibroValido()) {
        this.axios.post(this.url, this.nuevoLibro).then(response => {
          console.log(response);
          let libroNuevo = response.data;
          this.libros.push(libroNuevo);
          this.initLibroNuevo();
        });
      } else {
        this.showAlert = true;
        this.mensajeAlert = "Verifique los campos del libro...";
      }
    },
    async eliminar(libro) {
      try {
        let response = await this.axios.delete(`${this.url}/${libro._id}`);
        console.log(response);
        this.libros.splice(this.libros.indexOf(libro), 1);
      } catch (error) {
        this.showAlert = true;
        this.mensajeAlert = "No se pudo eliminar el libro";
      }
    },
    initLibroNuevo() {
      this.nuevoLibro.nombre = null;
      this.nuevoLibro.año = null;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
