<template>
    <div class = 'search-detail'>
        <el-button class='back' @click="$router.back(-1)">返回</el-button>
        <el-table v-if='leaderPage' v-loading="listLoading" :data="tableData" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column prop="code" label="工号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="entry" label="入职时间"></el-table-column>
        </el-table>
        <el-table v-if='!leaderPage' v-loading="listLoading" :data="tableData" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column prop="code" label="工号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="deptName" label="部门"></el-table-column>
            <el-table-column prop="proceduresNameList" label="工位"></el-table-column>
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
    .search-detail{
        padding: 50px 100px;
    }
    .back{
        margin-bottom: 20px;
    }
</style>
<script>
    import { parseTime } from '@/utils/index'
    export default {
        name:'createConnect',
        data () {
            return {
                listLoading: false,
                tableData: [],
                leaderPage:true,
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
            const param = this.$route.params;
            if (param.procedures) {
                let proceduresNameList = [];
                param.procedures.forEach(item => {
                    proceduresNameList.push(item.name);
                })
                param.proceduresNameList = proceduresNameList.join(',');
            }
            this.listLoading = true;
            this.leaderPage = param.leaderPage;
            if (param.entry) {
                param.entry = parseTime(param.entry)
            }
            this.tableData.push(param);
            this.listLoading = false;
            // this.fetchData()
        },
        methods: {
            fetchData() {
            },
            handleCurrentChange() {

            },
        }
    }
</script>