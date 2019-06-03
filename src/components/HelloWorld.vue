<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button class="btn btn-primary" @click="consultarServicio">Consultar servicio</button>
    <br>
<b-row align-h="center">
  <b-col md="6">
    <div>
      <b-card
        v-for="(persona, index) in personas"
        :key="index"
        no-body
        class="overflow-hidden"
      >
        <b-row no-gutters>
          <b-col md="6">
            <b-img
              thumbnail
              fluid
              :src="persona.picture.large"
              alt="Image 1"
            ></b-img>

          </b-col>
          <b-col md="6">
            <b-card-body :title="getNombre(persona.name)">
              <b-card-text>
                {{persona.email}}
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </b-col>
  </b-row>    
  
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      personas: []
    };
  },
  methods: {
    consultarServicio() {
      let cantidadPorPedido = 20;
      let url = `https://randomuser.me/api/?results=${cantidadPorPedido}`;
      this.axios
        .get(url)
        .then(response => {
          console.log(response.data);
          this.personas = response.data.results;
        })
        .catch(error => console.log(error));
    },
    getNombre(objetoNombre) {
      return `${objetoNombre.first} ${objetoNombre.last}`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
