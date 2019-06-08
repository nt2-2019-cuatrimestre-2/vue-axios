import Vue from 'vue'

const BASE_URL = 'http://localhost:3000/libro'

export default{
    find(){
        return Vue.axios.get(BASE_URL)
    }
}