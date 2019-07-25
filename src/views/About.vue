<template>
<a-form :form="form" layout="vertical" hideRequiredMark>
        <a-row :gutter="16">
          <a-col :span="8">
          </a-col>
           <a-col :span="8">
             <a-form-item label="运单号">
              <a-input
                v-decorator="['orderid', {
                  rules: [{ required: true, message: 'Please enter user orderid' }]
                }]"
                placeholder="Please enter user orderid"
              />
            </a-form-item>
          </a-col>
           <a-col :span="8">
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
          </a-col>
           <a-col :span="8">
              <a-form-item label="取件时间">
             <a-date-picker
        v-decorator="['ordertime', config]"
        show-time
        format="YYYY-MM-DD HH:mm:ss"
      />

            </a-form-item>
            <a-button
          :style="{marginRight: '8px'}"
          @click="onClose"
        >
          Cancel
        </a-button>
        <a-button @click="handleSubmit" type="primary">Submit</a-button>
          </a-col>
           <a-col :span="8">
          </a-col>
        </a-row>
</a-form>
</template>
<script>
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
          'ordertime': fieldsValue['ordertime'].format('YYYY-MM-DD HH:mm:ss')
        };
        this.erder.orderid = values.orderid
        this.erder.ordertime = values.ordertime
      });
        
      //  alert(this.erder.ordertime)
     this.$store.dispatch('OrderBooking',this.erder)
     this.$message.success("success")
    }
  }
}
</script>