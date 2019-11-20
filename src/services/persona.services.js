import Vue from 'vue'

const BASE_URL = 'https://nt2-mock-backend.herokuapp.com/'
const ENTIDAD = 'personas'

export default{
    //Devuelve un ARRAY
    getAll(){
        return Vue.axios.get(`${BASE_URL}${ENTIDAD}`)
    },
    //Devuelve un OBJETO
    getById(id){
        return Vue.axios.get(`${BASE_URL}${ENTIDAD}/${id}`)
    },
    remove(id){
        return Vue.axios.delete(`${BASE_URL}${ENTIDAD}/${id}`)
    },
    update(persona){
        return Vue.axios.put(`${BASE_URL}${ENTIDAD}/${persona.id}`,persona)
    }

}