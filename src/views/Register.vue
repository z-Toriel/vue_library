<template>
  <div class="wrapper">
    <!-- header部分 -->
    <header>
      <p>用户注册</p>
    </header>

    <!-- 表单部分 -->
    <ul class="form-box">
      <li>
        <div class="title">手机号码：</div>
        <div class="content">
          <input
            type="text"
            @blur="checkUserId"
            v-model="fans.id"
            placeholder="输入手机号码"
          />
        </div>
      </li>
      <li>
        <div class="title">邮箱：</div>
        <div class="content">
          <input type="email" v-model="fans.email" placeholder="输入邮箱" />
        </div>
        <button @click="getCheckCode()">获取验证码</button>
      </li>
      <li>
        <div class="title">验证码：</div>
        <div class="content">
          <input
            type="text"
            v-model="userCheckCode"
            @blur="judgeCheckCode()"
            placeholder="输入验证码"
          />
        </div>
        <div class="repass" v-if="isCheckCode">
          <span>验证码错误</span>
        </div>
      </li>
      <li>
        <div class="title">密码：</div>
        <div class="content">
          <input
            type="password"
            v-model="fans.password"
            placeholder="输入密码"
          />
        </div>
      </li>
      <li>
        <div class="title">确认密码：</div>
        <div class="content">
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="输入确认密码"
            @blur="reconfirmPassword"
          />
        </div>
        <div class="repass" v-if="isconfirmPassword">
          <span>密码不一样</span>
        </div>
      </li>
      <li>
        <div class="title">用户名称：</div>
        <div class="content">
          <input
            type="text"
            v-model="fans.username"
            placeholder="输入用户昵称"
          />
        </div>
      </li>
      <li>
        <div class="title">性别：</div>
        <div class="content" style="font-size: 3.5vw">
          <input
            type="radio"
            name="sex"
            v-model="fans.userSex"
            value="1"
            style="width: 6vw; height: 3.2vw"
          />男
          <input
            type="radio"
            name="sex"
            v-model="fans.userSex"
            value="0"
            style="width: 6vw; height: 3.2vw"
          />女
        </div>
      </li>
    </ul>

    <div class="button-login">
      <button @click="register">确认注册</button>

      <button style="background-color: red; margin-top: 2vw">
        <router-link to="/" style="color: #fff">返回登录页</router-link>
      </button>
    </div>

    <!-- 底部菜单部分 -->
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";

export default {
  name: "Register",
  data() {
    return {
      //定义JSON用户对象user，注册请求直接发送至 服务器端
      fans: {
        id: "",
        email: "",
        password: "",
        username: "",
        userSex: 1,
      },
      confirmPassword: "", //确认密码无需录入数据库，不需要传递给服务器端，独立定义一个变量
      isconfirmPassword: false, //判断重复密码
      isPhone: false, //判断重复手机

      checkCode: "", // 用于存放服务端传过来的验证码
      userCheckCode: "", // 用于保存用户输入的验证码
      isCheckCode: false,
    };
  },
  methods: {
    //验证手机号是否重复
    checkUserId() {
      //路径 /fans/check/手机号
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (reg.test(this.fans.id)) {
        this.$axios.get("/fans/check/" + this.fans.id).then((response) => {
          if (response.data.code == 20005) {
            this.isPhone = true;
            this.$message({
              showClose: true,
              message: response.data.message,
              type: "warning",
              onClose: () => {
                this.fans.id = "";
                return;
              },
            });
          } else {
            this.isPhone = false;
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: "请输入正确的手机号",
          type: "warning",
          onClose: () => {
            this.fans.id = "";
            return;
          },
        });
      }
    },

    // 判断两次密码是否相等
    reconfirmPassword() {
      if (this.fans.password != this.confirmPassword) {
        this.isconfirmPassword = true;
      } else {
        this.isconfirmPassword = false;
      }
    },

    // 获取验证码
    getCheckCode() {
      this.$axios
        .get("/fans/getCheckCode/" + this.fans.email)
        .then((response) => {
          if (response.data.code == 1) {
            console.log(response);
            this.checkCode = response.data.data.checkCode;
            this.$message({
              showClose: true,
              message: "验证码发送成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: response.data.message,
              type: "warning",
            });
          }
        });
    },

    // 判断用户输入的验证码是否正确
    judgeCheckCode() {
      if (this.checkCode == this.userCheckCode) {
        this.isCheckCode = false;
      } else {
        this.isCheckCode = true;
      }
    },

    register() {
      if (
        this.isconfirmPassword == false &&
        this.isPhone == false &&
        this.isCheckCode == false &&
        this.userCheckCode != ""
      ) {
        this.$axios.post("/fans/register", this.fans).then((response) => {
          if (response.data.code == 1) {
            this.$message({
              showClose: true,
              message: response.data.message,
              type: "success",
              onClose: () => {
                this.$router.push("/");
              },
            });
          } else {
            this.$message({
              showClose: true,
              message: response.data.message,
              type: "warning",
            });
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: "输入的信息有误",
          type: "warning",
        });
      }
    },
  },
  components: {
    Footer,
  },
};
</script>

<style scoped>
/****************** 总容器 ******************/
.wrapper {
  width: 100%;
  height: 100%;
}

/****************** header部分 ******************/
.wrapper header {
  width: 100%;
  height: 12vw;
  background-color: #eff3f4;
  color: #2d2d2d;
  font-size: 4.8vw;

  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
}

/****************** 表单部分 ******************/
.wrapper .form-box {
  width: 100%;
  margin-top: 0;
}

.wrapper .form-box li {
  box-sizing: border-box;
  padding: 4vw 3vw 0 3vw;
  display: flex;
  align-items: center;
}

.wrapper .form-box li .title {
  flex: 0 0 18vw;
  font-size: 3.5vw;
  font-weight: 700;
  color: #666;
}

.wrapper .form-box li .content {
  flex: 1;
}

.wrapper .form-box li .content input {
  border: none;
  outline: none;
  width: 100%;
  height: 4vw;
  font-size: 3.5vw;
}

.wrapper .button-login {
  width: 100%;
  box-sizing: border-box;
  padding: 4vw 3vw 0 3vw;
}

.wrapper .button-login button {
  width: 100%;
  height: 10vw;
  font-size: 3.8vw;
  font-weight: 700;
  color: #fff;
  background-color: #138bde;
  border-radius: 4px;
  border: none;
  outline: none;
}

.wrapper .button-register {
  width: 100%;
  box-sizing: border-box;
  padding: 4vw 3vw 0 3vw;
}

.wrapper .button-register button {
  width: 100%;
  height: 10vw;
  font-size: 3.8vw;
  font-weight: 700;
  color: #666;
  background-color: #eee;
  border-radius: 4px;

  border: none;
  outline: none;
  border: solid 1px #ddd;
}

.repass {
  color: red;
  font-size: 3.5vw;
}
</style>
