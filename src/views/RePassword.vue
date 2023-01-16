<template>
  <div class="wrapper">
    <!-- header部分 -->
    <!-- <header>
      <h1 style="margin-top: 100px; text-algin: center">修改密码</h1>
    </header> -->
    <Header title="修改密码"></Header>

    <div class="cal">
      <!-- 表单部分 -->
      <ul class="form-box">
        <li>
          <div class="title">旧密码：</div>
          <div class="content">
            <input
              type="password"
              v-model="oldPassword"
              placeholder="输入旧密码"
              @blur="checkOldPassword"
            />
          </div>
        </li>
        <li>
          <div class="title">邮箱：</div>
          <div class="content">
            <input type="email" v-model="fans.email" placeholder="输入邮箱" disabled style="color:rgb(164, 164, 164)"/>
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
          <div class="title">新密码：</div>
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
      </ul>
      <br />
      <div class="button-login">
        <button @click="repassword">修改密码</button>
      </div>
    </div>

    <!-- 底部菜单部分 -->
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";

export default {
  name: "Register",
  data() {
    return {
      //定义JSON用户对象user，注册请求直接发送至 服务器端
      fans: {
        id: this.$getSessionStorage("fans").id,
        email: this.$getSessionStorage("fans").email,
        password: "",
      },
      oldPassword: "",
      confirmPassword: "", //确认密码无需录入数据库，不需要传递给服务器端，独立定义一个变量
      isconfirmPassword: "", //判断重复密码
      isoldPassword: false,

      checkCode: "", // 用于存放服务端传过来的验证码
      userCheckCode: "",  // 用于保存用户输入的验证码
      isCheckCode: false,
    };
  },
  methods: {
    reconfirmPassword() {
      if (this.fans.password != this.confirmPassword) {
        this.isconfirmPassword = true;
      } else {
        this.isconfirmPassword = false;
      }
    },
    checkOldPassword() {
      this.$axios
        .get("/fans/checkOldPass/", {
          params: {
            oldPassword: this.oldPassword,
            fansId: this.fans.id,
          },
        })
        .then((response) => {
          if (response.data.code == 50001) {
            this.isoldPassword = true;
            this.$message({
              showClose: true,
              message: "旧密码错误",
              type: "warning",
              onClose: () => {
                this.oldPassword = "";
                return;
              },
            });
          } else {
            this.isoldPassword = false;
          }
        });
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
          }
        });
    },

    // 判断用户输入的验证码是否正确
    judgeCheckCode() {
      if(this.checkCode == this.userCheckCode){
        this.isCheckCode = false
      }else{
        this.isCheckCode = true
      }
    },

    repassword() {
      if (this.isconfirmPassword == false && this.isoldPassword == false && this.isCheckCode==false && this.userCheckCode!="") {
        this.$axios.post("/fans/repass", this.fans).then((response) => {
          if (response.data.code == 1) {
            this.$message({
              showClose: true,
              message: "修改密码成功，请重新登录",
              type: "success",
              onClose: () => {
                this.$router.push("/");
                this.$removeSessionStorage("fans")
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
    Header,
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
  width: 90%;
  height: 4vw;
  font-size: 3.5vw;
  border: rgb(202, 202, 202) 1px solid;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}
.cal {
  text-align: center;
  margin-top: 200px;
  width: 360px;
  margin-left: 15px;
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
