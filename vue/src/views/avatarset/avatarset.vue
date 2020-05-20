<template>
    <div>
      <div class='change-title'>
        账号设置
      </div>
      <el-form class='change-set' :rules="rules" ref="form" :model="msgForm" label-width="80px" size="mini">
        <el-form-item label="用户名" prop="user">
          <el-input class='inp' v-model="msgForm.user" />
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
         <el-input class='inp' v-model="msgForm.userName" />
        </el-form-item>
        <el-form-item label="手机号" prop="phonenumber">
          <el-input class='inp' v-model="msgForm.phonenumber" />
        </el-form-item>
        <el-form-item label="旧密码" prop="oldPsd">
          <el-input class='inp'  type="password" v-model="msgForm.oldPsd" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPsd">
          <el-input class='inp'  type="password" v-model="msgForm.newPsd" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPsd">
          <el-input class='inp'  type="password" v-model="msgForm.confirmPsd" />
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <!--
          <el-button>取消</el-button>
          -->
        </el-form-item>
      </el-form>
    </div>
</template>
<style>
  .change-set {
    border:1px solid #ccc;
    width:800px;
    margin-top:20px;
    margin-left:50px;
    padding:50px;
  }
  .change-title {
    margin-top:50px;
    margin-left:50px;
  }
  .inp{
    width:300px;
  }
</style>
<script>
import {accountSet} from '@/api/table';
export default {
    data() {
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.msgForm.newPsd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      const validatePass1 = (rule, value, callback) => {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if (value === '') {
          callback(new Error('密码不能为空！'));
        } else if (value.length < 6) {
          callback(new Error('密码不能少于6位!'));
        } else if (value.length > 16) {
          callback(new Error('密码最多16位！'))
        } else if (!reg.test(value)) {
          callback(new Error('密码需包含字母和数字！'))
        } else {
          callback();
        }
      }
      return {
        msgForm: { //弹出框要编辑的项
          user:'',
          userName:'',
          phonenumber:'',
          id:'',
          oldPsd:'',
          newPsd:'',
          confirmPsd:''
        },
        rules: {
          user: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
          userName: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
          phonenumber: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
          oldPsd: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
          newPsd: [{ required: true, trigger: 'blur', validator: validatePass1}],
          confirmPsd: [{ required: true, trigger: 'blur', validator: validatePass2 }]
        }
      };
    },
    mounted() {
      if (sessionStorage.getItem('userMsg')) {
        let userMsg = JSON.parse(sessionStorage.getItem('userMsg'));
        this.msgForm.user = userMsg.name;
        this.msgForm.userName = userMsg.code;
        this.msgForm.phonenumber = userMsg.mobile;
        this.msgForm.id = userMsg.userId;
      }  
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let userId = this.$store.state.user.userMsg.userId;
            let params = {
              "code": this.msgForm.user,
              "name": this.msgForm.userName,
              "mobile": this.msgForm.phonenumber,
              "oldPassword": this.msgForm.oldPsd,
              "password": this.msgForm.newPsd,
              "id": this.msgForm.id
            }
            accountSet(params).then(res => {
              if(res.code === 0) {     
                let userMsg = JSON.parse(localStorage.getItem("userMsg"));
                if (userMsg) {
                  localStorage.removeItem('userMsg');
                }
                this.$alert('密码已更改，请重新登录！', '修改成功', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.logout();
                  }
                });
              }
            })
          }
        });
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=/index`)
      }
    }
  }
</script>