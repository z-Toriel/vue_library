<template>
  <div class="wrapper">
    <!-- header部分 -->
    <!-- <header>
      <h1 style="margin-top: 100px; text-algin: center">修改密码</h1>
    </header> -->
    <Header title="个人信息"></Header>

    <div class="cal">
      <!-- 表单部分 -->
      <el-form ref="fans" :model="fans" label-width="100px" :rules="rules">
        <el-form-item label="上传图片">
          <el-upload class="avatar-uploader" action="http://localhost:10003/upload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="fans.avatar" :src="fans.avatar" class="avatar" style="width: 30vw;" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- {{ imageUrl }} -->
        </el-form-item>
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="fans.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="fans.email"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="fans.sex">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFansForm('fans')">确定</el-button>
        </el-form-item>
      </el-form>

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
    var checkEmail = (rule, value, callback) => {
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (value == '') {
        callback(new Error("请输入邮箱"))
      } else if (!regEmail.test(value)) {
        callback(new Error("请输入正确的邮箱"))
      } else {
        callback()
      }
    }
    return {
      //定义JSON用户对象user，注册请求直接发送至 服务器端
      fans: this.$getSessionStorage("fans"),
      headers: {
        token: this.$getSessionStorage('token'),
      },
      rules: {
        username: [
          { required: true, message: "请输入昵称", trigger: "blur" },
        ],
        email: [
          { required: true, validator: checkEmail, trigger: "blur" },
        ]
      },
    };
  },
  methods: {
    // 图片的上传
    handleAvatarSuccess(res, file) {
      // console.log(res.data);
      // this.url = res.data; //存储到Java项目中图片的路径
      // this.imageUrl = URL.createObjectURL(file.raw);
      console.log("token:", this.headers)
      console.log("res", res)
      this.fans.avatar = res.data.url;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
    },
    submitFansForm(fansForm) {
      this.$refs[fansForm].validate((valid) => {
        if (valid) {
          this.$axios.post("/fans/update", this.fans).then((res) => {
            if (res.data.code == 1) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success",
                onClose: () => {
                  // 修改成功之后，将新的用户信息保存下来
                  this.$setSessionStorage('fans', this.fans)
                },
              });
            }else {
              console.log("发生了错误！！！")
            }

          });
          console.log("发送请求")
        } else {
          return false;
        }
      });
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

.wrapper .form-box li img {
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
