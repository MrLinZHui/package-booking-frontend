import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import Router from 'vue-router'
Vue.config.productionTip = false
Vue.prototype.$ajax=axios
Vue.use(Vuex);
Vue.use(Router)
const store = new Vuex.Store({
  state: {
    items: [],
    itemsByStatus: [],
    itemName: '',
    tableStatus: 1,
    errorMassage: ''
  },
  actions:{
    getdoList(context){
      axios.get('http://localhost:8080/orders')
      .then(function (response) {
        context.commit('getdoList',response)
      })
    }
  },
  mutations:{
    getdoList(state,response){
      store.commit('getItems',response)
      console.log(response);
    },
    getItems(state,response){
      state.itemsByStatus = JSON.parse(JSON.stringify(response.data));
      state.items =  JSON.parse(JSON.stringify(response.data));
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
