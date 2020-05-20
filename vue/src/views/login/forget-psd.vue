<template>
    <div class='forgetpsd-content'>
        <h1>拜腾虚拟装配后台管理系统找回密码</h1>
        <div class='find-box'>
            <div class='tip'>
                <span class='tip-text bl'>手机号验证</span>
                <span class='tip-text gy'>设置新密码</span>
            </div>
            <div class='f-input'>
                <el-input class='f-phone' v-model="phone" placeholder="手机号"></el-input><br>
                <el-input class='f-test' v-model="test" placeholder="验证码"></el-input>
                <el-button size='small'>获取验证码</el-button>
            </div>
            <el-button class='next' type="primary">下一步</el-button>
        </div>
    </div>
</template>
<script>
    export default{
        data () {
            return {
                phone:'',
                test:''
            }
        }
    }
</script>
<style>
    h1{
        text-align:center
    }
    .forgetpsd-content{
        width:100%;
        height:100%;
        padding:150px 400px 0px;

        background-color:#ccc;
    }
    .find-box{
        width:100%;
        height:400px;
        background:#fff;
        padding:50px 0px;
        text-align:center;
    }
    .find-box input {
    }
    .tip-text{
        display:inline-block;
        padding:10px 40px;
        color:#fff;
        font-weight:bolder;
    }
    .f-input {
        margin-bottom: 20px;
    }
    .f-phone {
        width:300px;
        margin-top:30px;
    }
    .f-test {
        width:200px;
        margin-top:20px;
    }
    .bl {
        background:#409EFF;
    }
    .gy {
        background:#666;
    }
    .next {
        width:300px;
    }
</style>