<template>
<div>
  <div>
    <span class="span1">菜鸟驿站</span>
    <span class="span1"><Button>All</Button></span>
    <span class="span1"><Button>以预约</Button></span>
    <span class="span1"><Button>已取件</Button></span>
    <span class="span1"><Button>未预约</Button></span>
    <span class="span1"><Button @click="additem()">添加</Button></span>
  </div>
  <div>
    <table>
      <thead>
        <tr>
          <th>运单号</th>
          <th>收件人</th>
          <th>电话</th>
          <th>状态</th>
          <th>预约时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(el, index) in $store.state.itemsByStatus" :key="index">
          <td>{{el.orderid}}</td>
          <td>{{el.receviname}}</td>
          <td>{{el.phone}}</td>
          <td>{{el.orderstatus}}</td>
          <td>{{el.ordertime}}</td>
          <td>{{el.ordertime}}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <form>
        <label>运单号：</label><input type="text" name='orderid'>
        <label>收件人：</label><input type="text" name='receviname'>
        <label>电话：</label><input type="text" name='phone'>
        <label>重量：</label><input type="text" name='zhongliang'>
        <input type="submit" value="提交">
      </form>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    additem(){

    }
  }
};
</script>
<style>
td{
  width: 150px
}
.span1{
  margin-top: -30px;
  float: left;
  font-size: 30px;
  color: greenyellow
}
.span2{
  margin-left: -100px;
  margin-top: -30px;
  float: right;
}
</style>