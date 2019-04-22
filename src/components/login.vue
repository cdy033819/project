<template>
  <div id="login-container">
    <div id="login-box">
      <div id="logo-box">
        <img src="../assets/img/logo.png" alt>
      </div>
      <el-form :rules="loginFormRules" ref="loginFormRef" :model="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" show-password>
            <i slot="prefix" class="iconfont icon-3702mima"></i>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :push="15">
            <el-button type="primary" @click="login()">登录</el-button>
            <el-button type="info" @click="reset()">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFormRules: {
        //被校验字段名称[{校验规则}，{校验规则}]
        username: [
          {
            required: true,
            message: '用户名必填',
            trigger: 'blur'
          }
        ],
        //required:必填项目，message：错误提示，trigger：触发机制
        password: [
          {
            required: true,
            message: '密码必填',
            trigger: 'blur',
          }
        ]
      },

      //登录form表单数据对象
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    reset() {
      this.$refs.loginFormRef.resetFields()
    },
    //管理员登录系统
    login() {
      //对各个表单域进行再次验证
      this.$refs.loginFormRef.validate(async valid => {
        //valid的表单验证标志信息，true：成功，false：失败
        if (valid === true) {
          //用户名的、密码的真实性带着去服务器端完成
          const { data: dt } = await this.$http.post('/login', this.loginForm)
          console.log(dt)

          //用户、密码错误提示信息
          if (dt.meta.status !== 200) {
            return this.$message.error(dt.meta.msg)
          }
          window.sessionStorage.setItem('token', dt.data.token)
          // 成功，跳转到后台首页面
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#login-container {
  background-color: #2b4b6b;
  height: 100%;
  #login-box {
    width: 450px;
    height: 304px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    #logo-box {
      width: 130px;
      height: 130px;
      background-color: #fff;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 8px;
      box-shadow: 0 0 10px #eee;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .el-form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
    }
  }
}
</style>
