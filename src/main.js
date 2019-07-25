import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import Router from 'vue-router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Antd)
Vue.config.productionTip = false
Vue.prototype.$ajax=axios
Vue.use(Vuex);
Vue.use(Router)
const store = new Vuex.Store({
  state: {
    items: [],
    itemsByStatus: []
  },
  actions:{
    getdoList(context){
      axios.get('http://localhost:8080/orders')
      .then(function (response) {
        context.commit('getdoList',response)
      })
    },
    addItem(context,data){
      axios.post('http://localhost:8080/orders', data)
      .then( (response) =>{
            console.log(response)
             context.commit('addItem',response)
          })
    },
    getOrders(context,data){
      if(data==='All'){
        axios.get('http://localhost:8080/orders')
      .then(function (response) {
        context.commit('getdoList',response)
      })
      }else{
        axios.get('http://localhost:8080/orders?status='+data)
        .then(function (response) {
          context.commit('getdoList',response)
        })
      }
    },
    OrderBooking(context,data){
      axios.put('http://localhost:8080/orders', 
      data
    )
      .then(function (response) {
        context.commit('getdoList',response)
      })
    },
    makeSure(context,data){
      axios.put('http://localhost:8080/orders/'+data, 
      {
        orderstatus: "已取件"
      }
    )
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
    },
    addItem(state,response){
       state.itemsByStatus.push(response.data)
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
