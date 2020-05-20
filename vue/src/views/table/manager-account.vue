<template>
  <div class="app-container">

    <el-form :inline="true" :model="searchAccount" class="search">
      <el-form-item>
        <el-input placeholder="用户名/姓名/手机号" v-model="searchAccount.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form-item>
    </el-form>

    <el-button class='create-account' @click="handelCreate">添加账号</el-button>
    <el-button class='create-account' @click="handelBatchDelete">批量删除</el-button>

    <!--账号列表-->
    <el-table v-loading="listLoading" :data="tableData" element-loading-text="Loading" @selection-change="tableSelectionChange" border fit highlight-current-row>
      
      <el-table-column 
        type="selection" 
        :selectable="selectable"
        width="55">
      </el-table-column>
       
      <el-table-column prop="code" label="用户名"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="timeCreate" label="创建时间"></el-table-column>
      <el-table-column label="操作" min-width='150'>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            :disabled='scope.row.supAmin'
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled='scope.row.supAmin'
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加、编辑账号-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户名" prop="code">
          <el-input v-model="temp.code" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
         <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="temp.mobile" />
        </el-form-item>
        <el-form-item v-if = "dialogStatus==='create'" class='create-pop' label="密码" prop="createPsd">
          <el-input v-model="temp.createPsd" />        
          <el-button class='create-psd' @click='createPsd'>生成</el-button>           
        </el-form-item>
        <el-form-item  v-if = "dialogStatus!=='create'" class='create-pop' label="密码" prop="editPsd">
          <el-input v-model="temp.editPsd" />                 
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createAccount():updateAccount()">
          确认
        </el-button>
      </div>
    </el-dialog>

     <!--分页-->
     <div class='paginat'>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="listQuery.currPage"
            :page-size="listQuery.pageSize"
            layout="total, prev, pager, next, jumper"
            background
            :total="listQuery.total">
          </el-pagination>
     </div>
  </div>
</template>

<script>
import { createManagerAccount,delManagerAccount,updateManagerData,getManagerList } from '@/api/table'
import { parseTime } from '@/utils/index'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
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
      };
      const validateEditPass = (rule, value, callback) => {
        if (value) {
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
        } else {
          value = null;
          callback();
        }
      }
    return {   
      listLoading: true,
      searchAccount: {
          name: ''
      },
      userId:'',
      tableData: [],
      bitchDelData:[],
      // 弹出框相关
      dialogFormVisible:false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加账号'
      },
      temp: { 
        user:'',
        userName:'',
        phonenumber:'',
        createPsd:'',
        editPsd:'',
        psdMsg:true
      },
      rules: {
        code: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { min: 11, max: 11, message: '请出入正确的手机号', trigger: 'blur' }
        ],
        createPsd: [{ required: true, trigger: 'blur', validator: validatePass}],
        editPsd: [{ required: false, trigger: 'blur', validator: validateEditPass}]
      },
      // 分页相关
      listQuery: {
        total: 0,
        currPage: 1,
        pageSize: 10,
        limit: 10
      },
    }
  },
  created() {
    
    if (sessionStorage.getItem('userMsg')) {
      let userMsg = JSON.parse(sessionStorage.getItem('userMsg'));
      this.userId = userMsg.userId;
    }  
    // this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      let that = this;
      this.tableData.splice(0,this.tableData.length);
      let param;
      if (this.searchAccount.name) {
        param = {
          "page": 1,
          "limit": 10000,
          "query": this.searchAccount.name
        };
      } else {
        param = {
          "page": this.listQuery.currPage,
          "limit": this.listQuery.limit
        };
      }
      getManagerList(param).then(res => {   
        if (res.code === 0) {
          if (!this.searchAccount.name) {          
            res.data.supAdmin['supAmin'] = true;
            res.data.supAdmin.timeCreate = parseTime(res.data.supAdmin.timeCreate);
            that.tableData.push(res.data.supAdmin);
          } 
          res.data.admin.forEach(function(item) {
            item.timeCreate = parseTime(item.timeCreate);
            that.tableData.push(item);
          })
          that.listQuery.total = res.totalCount;
          that.listLoading = false;
        }
      })
    },
    selectable(row,index) {
      return !row.supAmin;
    },
    tableSelectionChange(val){
      this.bitchDelData = val;
    },
    createPsd() {
      var psdItem = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];
      var password = '';
      var psdItemLength = psdItem.length;
      var psdLength = parseInt(Math.random()*10 + 6);
      for (var i = 0 ; i < psdLength; i++) {
        var x = Math.floor(Math.random() * psdItemLength);
        password += psdItem[x];
      }
      this.temp.createPsd = password;
      this.$refs['dataForm'].clearValidate();
      console.log(psdLength,this.temp.createPsd,password)
      // this.rules.psd = Math.Ramdom
    },
    // 增删改查用户
    handelBatchDelete() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delIdList = [];
          let that = this;
          this.bitchDelData.forEach((item) => {
            delIdList.push(item.id);
          })     
          delManagerAccount(delIdList).then(function (res) {    
            if (res.code === 0) {
              // that.bitchDelData.forEach((item) => {         
              //   let ind = that.tableData.indexOf(item);
              //   that.tableData.splice(ind,1);
              // })
              that.fetchData();
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handelCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createAccount() {
      let that = this;
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const createData = Object.assign({}, that.temp);
          let createParam = {
              code: createData.code,
              name: createData.name,
              mobile: createData.mobile,
              password: createData.createPsd,
              creatorId: String(that.userId),
              updaterId: String(that.userId)
          }
          createManagerAccount(createParam).then(res => {
            if (res.code === 0) {
              // createParam['timeCreate'] = res.data.timeCreate;
              // this.tableData.push(createParam);
              that.dialogFormVisible = false;
              that.fetchData();
              that.$refs['dataForm'].resetFields();
            }
          })           
        }
      })

    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delParam = [row.id];
          let that = this;
          delManagerAccount(delParam).then(function (res) {     
            if (res.code === 0) {
              // const ind = that.tableData.indexOf(row);
              // that.tableData.splice(ind,1);
              that.fetchData();
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleEdit(index, row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
    },
    updateAccount() {
      let that = this;
      this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, that.temp);
            // 调用接口成功后操作数据
            let updateParam = {
              code: tempData.code,
              name: tempData.name,
              password: tempData.editPsd || null,
              mobile: tempData.mobile,
              updaterId: String(that.userId),
              id: String(tempData.id)
            }
            console.log(updateParam);
            updateManagerData(updateParam)
            .then((res) => {
              if (res.code === 0) {              
                for (const v of that.tableData) {
                  if (v.id === that.temp.id) {
                    const index = that.tableData.indexOf(v)
                    that.tableData.splice(index, 1, that.temp)
                    break
                  }
                }
                that.dialogFormVisible = false
                that.$notify({
                  title: '成功',
                  message: '提交成功',
                  type: 'success',
                  duration: 2000
                })
              }
          })
          .catch(err => {
            console.log(err)
          })
        }
      })
    },  
    cancel() {
      this.dialogFormVisible = false
      this.$refs['dataForm'].resetFields();
    },
    // 分页相关
    handleCurrentChange(val) {
      this.listQuery.currPage = val;
      this.fetchData();
    }
  },
}
</script>

<style scoped>
  .create-pop {
    position:relative;
  }
  .create-psd {
    position:absolute;
    right:-80px;
    bottom: 0px;
  }
  .create-account{
    margin-bottom: 20px;
  }

  .paginat{
    position:fixed;
    bottom:80px;
    right:50px;
  }
</style>
