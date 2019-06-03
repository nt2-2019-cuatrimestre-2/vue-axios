<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="consultarServicio">Consultar servicio</button>
<br>
<samp>{{miArray}}</samp>
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
      miArray: []
    }
  },
  methods: {
    aux(){

    },
    consultarServicio() {
      let url = 'https://api.coindesk.com/v1/bpi/currentprice.json'
      this.axios.get(url)
      .then(resultado => this.miArray = resultado)
      .catch(error => console.log(error))
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
