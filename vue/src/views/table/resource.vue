<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="所属工位">
        <el-input v-model="formInline.jobNumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form-item>
    </el-form>
    <!--
    <el-table v-if='trainVideoPage' v-loading="listLoading" :data="tableData" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="name" label="所属工位"></el-table-column>
      <el-table-column prop="video.fileName" label="视频名称"></el-table-column>
      <el-table-column prop="video.creatorName" label="上传人" width="180"></el-table-column>
      <el-table-column prop="video.timeCreate" label="上传时间" width="180"></el-table-column>
      <el-table-column  label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            :disabled='scope.$index===0'
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    -->
    <el-table v-loading="listLoading" :data="tableData" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="name" label="所属工位"></el-table-column>
      <el-table-column prop="model.fileName" label="模型名称"></el-table-column>
      <el-table-column prop="model.creatorName" label="上传人"></el-table-column>
      <el-table-column prop="model.timeCreate" label="上传时间"></el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
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

<script>
import { getResource,delResource } from '@/api/table'
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
    return {
      tableData: [],
      listLoading: true,
      trainVideoPage: true,
      formInline: {
          jobNumber: ''
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
    // this.fetchData()
    if (this.$store.state.user.currRoute.indexOf('trainVideo') !== -1){
      this.trainVideoPage = true;
    } else {
      this.trainVideoPage = false;
    }
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      let that = this;
      this.tableData.splice(0,this.tableData.length);
      let params;
      if (this.formInline.jobNumber) {
        params = {
          "page": 1,
          "limit": 10000,
          "code": this.formInline.jobNumber
          }
      } else {
        params = {
          "page": this.listQuery.currPage,
          "limit": this.listQuery.limit,
        }
      }
      getResource(params).then(res => {
        if (res.code === 0) {
          res.data.forEach(function(item) {
            item.model.timeCreate = parseTime(item.model.timeCreate)
            that.tableData.push(item);
          })
          that.listQuery.total = res.totalCount;
          that.listLoading = false;
        }
      })
    },
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {    
          delResource({id:row.id}).then(res => {
            this.fetchData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 分页相关
    handleCurrentChange(val) {
      this.listQuery.currPage = val;
    },
    onSubmit () {
      
    }
  },
}
</script>

<style>
.paginat{
    position:fixed;
    bottom:80px;
    right:50px;
  }
</style>