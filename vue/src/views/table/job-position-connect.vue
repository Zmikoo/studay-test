<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchParam" class="demo-form-inline">
      <fieldset>
        <legend>筛选查询</legend>
      <el-form-item label="工号">
        <el-input v-model="searchParam.jobNumber"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="searchParam.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData('search')">查询</el-button>
      </el-form-item>
      </fieldset>
    </el-form>
    <div class='operate'>
      <el-button @click='createConnect(true)'>创建关联</el-button>
      <el-button @click='handelBatchDelete'>批量删除</el-button>
    </div>
    <el-table max-height='550' v-loading="listLoading" :data="tableData" element-loading-text="Loading" @selection-change="tableSelectionChange" border fit highlight-current-row>
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="code" label="工号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="deptName" label="部门"></el-table-column>
      <el-table-column prop="proceduresNameList" label="工位"></el-table-column>
      <el-table-column prop="detail" label="操作"  min-width='150'>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="goDetail(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
<style>
  .operate{
    margin:20px;
  }
  legend{
  }
  fieldset{
    border:1px solid #DCDFE6;
    padding-top:20px;
  }

  .paginat{
    position:fixed;
    bottom:80px;
    right:50px;
  }
</style>
<script>
import { getUserMsg,delConnect } from '@/api/table'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination


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
    return {
      listLoading: true,
      searchParam: {
          jobNumber:'',
          name:'',
          depart:''
      },
      tableData: [],
      bitchDelData:[],
      // 分页相关
      listQuery: {
        total: 0,
        currPage: 1,
        pageSize: 8,
        limit: 10
      },
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    fetchData(searchFlag = 'get') {
      this.listLoading = true;
      this.tableData.splice(0,this.tableData.length);

      let param;
      if (searchFlag == 'search') {      
        param = {
          "page": 1,
          "limit": this.listQuery.limit
        };
      } else {        
        param = {
          "page": this.listQuery.currPage,
          "limit": this.listQuery.limit
        };
      }
      if (this.searchParam.jobNumber) {
        param['code'] = this.searchParam.jobNumber;
      } 
      if (this.searchParam.name) {
        param['name'] = this.searchParam.name;
      }
      getUserMsg(false,param).then(res => {
        let that = this;
        if (res.code === 0) {
          res.data.forEach(function(item) {
            item.proceduresNameList = that.connecProcedureValue(item.procedures,'name');
            item.proceduresIdList = that.connecProcedureValue(item.procedures,'id');
            that.tableData.push(item);
          });
          that.listQuery.total = res.totalCount;
          this.listLoading = false;
        }
      })
    },
    connecProcedureValue (procedures,val) {
      let nameList = [];
      procedures.forEach(item => {      
        nameList.push(item[val]);
      })
      return nameList.join(',');
    },
    createConnect() {
      sessionStorage.setItem('lastRouter','createConnect');
      this.$router.push({name:'createConnect'});
    },
    tableSelectionChange(val){
      this.bitchDelData = val;
    },
    handelBatchDelete(){
      this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {      
            let delIdList = [];
            let that = this;
            this.bitchDelData.forEach((item) => {
              delIdList.push(item.id);
            })
            delConnect(delIdList).then(function (res) {     
              if (res.code === 0) {
                that.fetchData();           
                that.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                // that.bitchDelData.forEach((item) => {         
                //   let ind = that.tableData.indexOf(item);
                //   that.tableData.splice(ind,1);
                // })
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleDelete(index, row) {
      this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          let delParam = [row.id];
          let that = this;
          delConnect(delParam).then(function (res) {     
            if (res.code === 0) {
              that.fetchData();
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    goDetail(index,row) {
      sessionStorage.setItem('lastRouter','editConnect');
      this.$router.push({name:'createConnect', params: row});
    },
    handleCurrentChange(val) {
      this.listQuery.currPage = val;
      this.fetchData();
    },
    onSubmit () {
      
    }
  },
}
</script>
