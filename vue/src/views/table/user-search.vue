<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchParam" class="demo-form-inline">
      <el-form-item label="工号">
        <el-input v-model="searchParam.jobNumber"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="searchParam.name"></el-input>
      </el-form-item>
      <el-form-item label="部门" v-if="!leaderPage">
        <el-input v-model="searchParam.depart"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData('search')">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="listLoading" :data="tableData" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="code" label="工号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="deptName" label="部门"></el-table-column>
      <el-table-column prop="detail" label="详情">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="goDetail(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
     <div class='paginat'>
          <el-pagination
            v-show='listQuery.total > 0'
            @current-change="handleCurrentChange"
            :current-page="listQuery.currPage"
            :page-size="listQuery.pageSize"
            layout="total, prev, pager, next, jumper"
            background
            :total="listQuery.total">
          </el-pagination>
     </div>
     <!--
     <pagination 
        v-show='listQuery.total > 0'
        :total = 'listQuery.total'
        :page.sync = 'listQuery.currPage'
        :limit.sync="listQuery.limit"
        @pagination="handleCurrentChange"
     />
     -->
  </div>
</template>

<script>
import { getUserMsg } from '@/api/table'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination


export default {
  components: {Pagination},
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
      leaderPage: true,
      searchParam: {
          jobNumber:'',
          name:'',
          depart:''
      },
      tableData: [],
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
    if (sessionStorage.getItem('currRoute')) {
      let currRoute = sessionStorage.getItem('currRoute');    
      if (currRoute.indexOf('leader') !== -1){
        this.leaderPage = true;
      } else {
        this.leaderPage = false;
      }
    }
    // this.fetchData()
  },
  mounted() {

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
      if (this.searchParam.depart) {
        param['deptName'] = this.searchParam.depart;
      }
      getUserMsg(this.leaderPage,param).then(res => {
        let that = this;
        if (res.code === 0) {
          res.data.forEach(function(item) {
            that.tableData.push(item);
          });
          that.listQuery.total = res.totalCount;
          this.listLoading = false;
        }
      })
    },
    goDetail(index, row) {
      let param = Object.assign({
        leaderPage: this.leaderPage
      },row)
      if (this.leaderPage) {
        sessionStorage.setItem('lastRouter','leaderInquire');
      } else {
        sessionStorage.setItem('lastRouter','staffInquire');
      }
      this.$router.push({name:'userInquireDetail',params:param});
    },
    handleCurrentChange(val) {
      console.log(val)
      this.listQuery.currPage = val;
      this.fetchData();
    }
  },
}
</script>

<style>
  .app-container {
    position:relative;
  }
  .paginat{
    position:fixed;
    bottom:80px;
    right:50px;
  }
</style>
