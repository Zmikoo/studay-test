<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="工号">
        <el-input v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formInline.region"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="listLoading" :data="tableData" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="personId" label="工号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="department" label="部门"></el-table-column>
      <el-table-column prop="showtime" label="虚拟演示使用次数"></el-table-column>
      <el-table-column prop="traintime" label="虚拟训练使用次数"></el-table-column>
      <el-table-column prop="examtime" label="虚拟考核使用次数"></el-table-column>
    </el-table>
     <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getList } from '@/api/table'
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
      list: null,
      listLoading: true,
      total:1,//数据总数
      formInline: {
          user: '',
          region: ''
      },
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      tableData: [{  
          personId: '2016-05-03',
          name: '王小虎',
          department: '上海市普陀区金沙江路 1518 弄',
          showtime:'10',
          traintime:'5',
          examtime:'4'
        }, {
          personId: '2016-05-02',
          name: '王小虎',
          department: '上海市普陀区金沙江路 1518 弄',
          showtime:'10',
          traintime:'5',
          examtime:'4'
        }]
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    createData() {

    },
    getList() {
      this.listLoading = true
      this.list = [];
      this.total = 24;
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total

      //   // Just to simulate the time of the request
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    onSubmit () {
      
    }
  },
}
</script>
