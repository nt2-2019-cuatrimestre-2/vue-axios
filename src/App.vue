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
        <label>Nueva persona</label>
      </b-col>
      <b-col>
        <b-input v-model="personaNueva.nombre" placeholder="nombre..."></b-input>
      </b-col>
      <b-col>
        <b-button variant="primary" @click="addPersona">Agregar</b-button>
      </b-col>
      <b-col></b-col>
    </b-row>

    <br />
    <h1>Personas</h1>
    <span>Persona nueva</span>
    <samp>{{personaNueva}}</samp>

    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <label>Nombre</label>
          </b-col>

          <b-col></b-col>
          <b-col></b-col>
        </b-row>
        <b-row v-for="persona in personas" :key="persona.id" class="mt-2">
          <b-col>{{persona.nombre}}</b-col>
          <b-col>
            <b-button @click="remove(persona)" variant="danger" size="sm">borrar</b-button>
          </b-col>
          <b-col>
            <b-button @click="getPersona(persona)" variant="primary" size="sm">seleccionar</b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="4">
        <label for>Persona seleccionada</label>
        <div v-if="personaSeleccionada">
          <input type="text" v-model="personaSeleccionada.nombre" />
          <p>{{personaSeleccionada.id}}</p>
          <p>
            <b-button @click="update(personaSeleccionada)" variant="info" size="sm">actualizar</b-button>
          </p>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PersonaService from "./services/persona.services";

export default {
  name: "app",
  components: { PersonaService },
  data() {
    return {
      personas: [],
      personaSeleccionada: null,
      personaNueva: {
        nombre: null
      },
      showAlert: false,
      mensajeAlert: "",
      url: "https://nt2-mock-backend.herokuapp.com/personas"
    };
  },
  // created() {
  //   PersonaService.getAll()
  //     .then(respuesta => {
  //       console.log(respuesta);
  //       this.personas = respuesta.data;
  //     })
  //     .catch(error => {
  //       this.showAlert = true;
  //       this.mensajeAlert = "Hubo un problema al traer las personas";
  //     });
  // },
  created() {
    this.axios
      .get(this.url)
      .then(respuesta => {
        console.log(respuesta);
        this.personas = respuesta.data;
      })
      .catch(error => {
        this.showAlert = true;
        this.mensajeAlert = "Hubo un problema al traer las personas";
      });
  },
  methods: {
    //Valida que el objeto no tenga propiedades nulas o vacias.
    esPersonaValida() {
      let esValido = true;
      let nombre = this.personaNueva.nombre;
      if (nombre == null || nombre.trim() == "") {
        esValido = false;
      }
      return esValido;
    },

    async getPersona(persona) {
      try {
        //Solo para mostrar como obtener una entidad por id.
        //let responseDelServicio = await PersonaService.getById(personaId);
        this.personaSeleccionada = persona;
      } catch (error) {
        this.showAlert = true;
        this.mensajeAlert = "Hubo un problema al seleccionar la persona";
      }
    },
    // async getPersona(personaId) {
    //   let responseDelServicio = await this.axios.get(
    //     `${this.url}/${personaId}`
    //   );
    //   this.personaNueva = responseDelServicio.data;
    // },
    async addPersona() {
      try {
        if (this.esPersonaValida()) {
          let personaQueDevuelveElServicio;
          let responseDelServicio = await this.axios.post(
            this.url,
            this.personaNueva
          );

          personaQueDevuelveElServicio = responseDelServicio.data;
          console.log(personaQueDevuelveElServicio);
          this.personas.push(personaQueDevuelveElServicio);
          this.initPersonaNueva();
        } else {
          this.showAlert = true;
          this.mensajeAlert = "Verifique los datos...";
        }
      } catch (error) {
        //La herramienta json-server no nos da un mensaje para mostrar en caso de id duplicado.
        this.showAlert = true;
        this.mensajeAlert = "No se pudo agregar la persona";
        this.initPersonaNueva();
      }
    },
    async remove(persona) {
      try {
        let response = await PersonaService.remove(persona.id);
        console.log(response);
        //¿Por qué pasamos todo el objeto?
        let indice = this.getIndiceDePersonaInArray(persona)
        console.log("Indice de persona a borrar", indice);
        this.personas.splice(indice, 1);
        this.personaSeleccionada = null
      } catch (error) {
        this.showAlert = true;
        this.mensajeAlert = "No se pudo borrar la persona";
      }
    },
    async update(persona) {
      try {
        let response = await PersonaService.update(persona);
        let personaModificada = response.data;
        console.log(personaModificada);
        let indiceDelapersonaModificada = this.getIndiceDePersonaInArray(
          persona
        );
        console.log("Indice", indiceDelapersonaModificada);
        this.personas[indiceDelapersonaModificada] = personaModificada;
        this.personaSeleccionada = null
      } catch (error) {
        this.showAlert = true;
        this.mensajeAlert = "No se pudo actualizar la persona";
      }
    },
    initPersonaNueva() {
      this.personaNueva.nombre = null;
    },
    getIndiceDePersonaInArray(persona) {
      let personaBuscada = this.personas.find(
        personaIterada => personaIterada.id == persona.id
      );
      let indiceDelapersonaModificada = this.personas.indexOf(personaBuscada);
      return indiceDelapersonaModificada;
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
