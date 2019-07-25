
<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="user" />
              <a-button @click="getOrders('All')">All</a-button>
            </span>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="laptop" />
              <a-button @click="getOrders('已预约')">已预约</a-button>
            </span>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="notification" />
              <a-button @click="getOrders('已取件')">已取件</a-button>
            </span>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title">
              <a-icon type="notification" />
              <a-button @click="getOrders('未预约')">未预约</a-button>
            </span>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
         <a-button class="editable-add-btn" @click="showDrawer">Add</a-button>
          <a-table :columns="columns" :dataSource="$store.state.itemsByStatus" bordered>
            <template slot="orderid" slot-scope="text">
              <a href="javascript:;">{{text}}</a>
            </template>
            <template v-if="record.orderstatus==='已预约'" slot="operation" slot-scope="text, record">
              <!-- <a href="javascript:;">Delete</a> -->
             <a-button @click="makeSure(el.orderid)">确认取件</a-button>
            </template>
          </a-table>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <div>
     <a-drawer
      title="Create a new account"
      :width="720"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-form :form="form" layout="vertical" hideRequiredMark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="运单号">
              <a-input
                v-decorator="['orderid', {
                  rules: [{ required: true, message: 'Please enter user orderid' }]
                }]"
                placeholder="Please enter user orderid"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="收件人">
              <a-input
                v-decorator="['receviname', {
                  rules: [{ required: true, message: 'please enter recevinam' }]
                }]"
                style="width: 100%"
                placeholder="please enter recevinam"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="电话">
              <a-input
                v-decorator="['phone', {
                  rules: [{ required: true, message: 'Please select an phone' }]
                }]"
                placeholder="Please enter an phone"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="重量">
              <a-input
                v-decorator="['weight', {
                  rules: [{ required: true, message: 'Please enter the weight' }]
                }]"
                placeholder="Please enter the weight"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <a-button
          :style="{marginRight: '8px'}"
          @click="onClose"
        >
          Cancel
        </a-button>
        <a-button @click="handleSubmit" type="primary">Submit</a-button>
      </div>
    </a-drawer>
  </div>
  </a-layout>
</template>
<script>
const columns = [
  {
    title: "运单号",
    dataIndex: "orderid",
    scopedSlots: { customRender: "orderid" }
  },
  {
    title: "收件人",
    className: "receviname",
    dataIndex: "receviname"
  },
  {
    title: "电话",
    dataIndex: "phone"
  },
  {
    title: "状态",
    dataIndex: "orderstatus"
  },
  {
    title: "预约时间",
    dataIndex: "ordertime"
  },
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
      collapsed: false,
      erder: {
        orderid: "",
        receviname: "",
        phone: "",
        ordertime: ""
      },
      orderid: "",
      ordertime: "",
      columns
    };
  },
  methods: {
   handleSubmit  (e) {
      e.preventDefault();
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
      const values = {
          ...fieldsValue,
          'orderid': fieldsValue['orderid'],
          'phone': fieldsValue['phone'],
          'receviname': fieldsValue['receviname'],
        };
        this.erder.orderid = values.orderid
        this.erder.phone = values.phone
        this.erder.receviname = values.receviname
      });
        
      //  alert(this.erder.orderid)
      this.$store.dispatch("addItem", this.erder)
      this.onClose()
    },
    getOrders(data) {
      this.$store.dispatch("getOrders", data);
    },
    OrderBooking() {
      this.erder.orderid = this.orderid;
      this.erder.ordertime = this.ordertime;
      this.$store.dispatch("OrderBooking", this.erder);
    },
    makeSure(index) {
      this.$store.dispatch("makeSure", index);
    },
    handleAdd () {
       this.$store.dispatch('addItem',this.erder)
    },
     showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    }
  }
};
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
th.column-money,
td.column-money {
  text-align: right !important;
}
.editable-add-btn {
  margin-bottom: 8px;
}
</style>