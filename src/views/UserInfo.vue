<template>
  <div class="wrapper">
    <!-- header部分 -->
    <!-- <header>
      <h1 style="margin-top: 100px; text-algin: center">修改密码</h1>
    </header> -->
    <Header title="个人信息"></Header>

    <div class="cal">
      <!-- 表单部分 -->
      <ul class="form-box">
        <li>
          <div class="title">头像：</div>
          <div>
            <img :src="fans.avatar" alt="">
          </div>
        </li>
        <li>
          <div class="title">昵称：</div>
          <div class="content">
            <input type="email" v-model="fans.username" disabled style="color:rgb(164, 164, 164)" />
          </div>
        </li>
        <li>
          <div class="title">性别：</div>
          <div>
            <label for="male">
              <input type="radio" id="male" value="1" name="sex" v-model="fans.sex" disabled> 男
            </label>

            <label for="female">
              <input type="radio" id="female" value="0" name="sex" v-model="fans.sex" disabled> 女
            </label>
          </div>
        </li>
        <li>
          <div class="title">邮箱：</div>
          <div class="content">
            <input type="email" v-model="fans.email" disabled style="color:rgb(164, 164, 164)" />
          </div>
        </li>
      </ul>
      <br />
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
      fans: this.$getSessionStorage("fans"),
    };
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

.wrapper .form-box li img{
  width: 30vw;
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
