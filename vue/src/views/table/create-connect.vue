<template>
    <div class = 'create-connect'>
        <el-button class='back' @click="$router.back(-1)">返回</el-button>
        <div class='sel-content'>
            <div class='sel-user'>
                <el-select v-if='createFlag' filterable multiple v-model="staff" size='medium' placeholder="请选择员工">
                <el-option
                    v-for="item in tableData"
                    :disabled="item.disabled"
                    :key="item.id"
                    :label="item.staffMsg"
                    :value="item.id">
                    </el-option>
                </el-select>
                <div class='edit-msg' v-if='!createFlag'> 
                    当前员工：
                    <p>姓名： {{ staffName }} </p>
                    <p>工号： {{ staffCode }} </p>
                </div>
            </div>
            <div class='job-position'>
                <el-select v-model="jobPosition" filterable multiple size='medium' placeholder="请选择工位">
                <el-option
                    v-for="item in proceduresList"
                    :key="item.id"
                    :label="item.code"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div style='text-algin:center'>
            <el-button type="primary" @click='onSubmit'>提交</el-button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .create-connect{
        padding: 50px 100px;
    }
    .edit-msg {
        font-family: sans-serif !important;
    }
    .show-msg{
        margin-top:20px;
    }
    .sel-content {
        display:flex;
        justify-content: space-between;
        margin: 20px 0px;
        height:500px;
        border:1px solid #DCDFE6;
    }
    .sel-user {
        width:50%;
        margin:20px;
        border-right:1px solid #DCDFE6;
    }
    .job-position {
        width:50%;
        padding:20px;
    }
    .el-button {
        
    }
    .el-select {
        width:70% !important;
    }
</style>
<script>
    import {getUserMsg, createConnect, changeConnect} from '@/api/table';
    export default {
        name:'createConnect',
        data () {
            return {
                formInline:{
                    name:'小小白'
                },
                createrId:'',// 当前操作者的id
                listLoading: false,
                createFlag: true,
                // 编辑关联 当前编辑员工的id和name
                staffId:'',
                staffCode:'',
                staffName:'',
                // 创建关联
                tableData: [], 
                proceduresList:[],
                staff: [],// 当前所选中的员工姓名
                jobPosition: [],//已经绑定的工位
                editCatchPos:[],
                // 分页相关
                listQuery: {
                    total: 0,
                    currPage: 1,
                    pageSize: 8,
                    limit: 8
                },
            }
        },
        created() {
            let param = this.$route.params;
            // 编辑而非创建
            if (param.id) {
                this.createFlag = false;
                this.staffName = param.name;
                this.staffId = param.id;
                this.staffCode = param.code;
                this.jobPosition = param.proceduresNameList.split(',');// 已经绑定员工的工位   
                for (let i = 0; i < this.jobPosition.length; i++) {
                    if (this.jobPosition[i].trim()==''){
                        this.jobPosition.splice(i,1);
                    }
                }  
                this.editCatchPos = param.procedures;
                // this.fetchData(false);
            } else {
                // this.fetchData();
            }
            
            if (sessionStorage.getItem('userMsg')) {
                let userMsg = JSON.parse(sessionStorage.getItem('userMsg'));
                this.createrId = userMsg.userId;
            } 
        },
        methods: {      
            fetchData(createFlag = true) {
                this.listLoading = true;
                this.tableData.splice(0,this.tableData.length);       
                    
                changeConnect({"page":1,"limit":10000}).then(res => {
                    let that = this;
                    if (res.code === 0) {
                        that.proceduresList = res.data.procedures; // 待选的工位
                    }
                })

                if (createFlag) {                        
                    let param = {
                        "page": 1,
                        "limit": 10000
                        };                
                    getUserMsg(false,param).then(res => {
                        console.log(res)
                        let that = this;
                        if (res.code === 0) {
                            res.data.forEach(function(item) {
                                if (item.procedures.length === 0 ){
                                    item.disabled = false
                                } else {
                                    item.disabled = true;
                                }
                                item.staffMsg = '姓名:'+ item.name + ' - 工号:' + item.code;
                                that.tableData.push(item);
                            });
                            that.listQuery.total = res.totalCount;
                            this.listLoading = false;
                        }
                    })
                }
            },
            findProceId (proceList,proceName) {
                for (let i = 0; i < proceList.length; i++) {
                    if (proceList[i].name == proceName) {
                        return proceList[i].id;
                    }
                }
            },
            onSubmit() {
                if (this.createFlag) {
                    let successFlag = true;
                    this.staff.forEach(item => {
                        let params = {
                            "userId":item,
                            "procedureIds":this.jobPosition,
                            "id":this.createrId
                        }
                        createConnect(params).then(res => {
                            if (res.code !== 0) {
                                successFlag = false;
                            }
                        })
                    })
                    if (successFlag) {
                        this.$notify({
                            title: '成功',
                            message: '添加成功',
                            type: 'success',
                            duration: 2000
                        })
                    }
                } else {        
                    let param = this.$route.params;
                    var lists = param.procedures;
                    var procedureNames = param.proceduresNameList;
                    let that = this;
                    for (let i = 0; i < this.jobPosition.length; i++) {
                     if (-1!=procedureNames.indexOf(this.jobPosition[i])){
                       for(let j of lists){
                         if(this.jobPosition[i]==j.name){
                           this.jobPosition[i] = j.id
                         }
                       }
                     }
                    }

                    let params = {
                        "userId":this.staffId,
                        "procedureIds":this.jobPosition,
                        "id":this.createrId
                    }
                    createConnect(params).then(res => {
                        if (res.code === 0) {
                            this.$notify({
                                title: '成功',
                                message: '添加成功',
                                type: 'success',
                                duration: 2000
                            })
                        }
                    })
                }
            }
        }
    }
</script>