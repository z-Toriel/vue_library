<template>
  <div class="wrapper">
    <div class="personal-info">
      <div class="head-sculpture">
        <img :src="fans.avatar" alt="" />
        <h2 class="username">{{ fans.username }}</h2>
      </div>
    </div>
    <div class="my-order">
      <div class="order">
        <div class="order-item">
          <div class="order-item-img">{{borrowNum}}</div>
          <div class="order-item-info">借阅数量</div>
        </div>
        <div class="order-item">
          <div class="order-item-img">{{returnBooksNum}}</div>
          <div class="order-item-info">本书待还</div>
        </div>
        <div class="order-item">
          <div class="order-item-img">{{booksEvaluateNum}}</div>
          <div class="order-item-info">评论数量</div>
        </div>
      </div>
    </div>
    <div class="jump">
      <router-link to="/borrowList">
        <div class="serve">
          <div class="serve-item">
            <i class="el-icon-s-order"></i>
            <span>历史借阅</span>
          </div>
        </div>
      </router-link>

      <router-link to="/evaluateList">
        <div class="serve">
          <div class="serve-item">
            <i class="el-icon-s-comment"></i>
            <span>我的评论</span>
          </div>
        </div>
      </router-link>

      <router-link to="/userInfo">
        <div class="serve">
          <div class="serve-item">
            <i class="el-icon-s-custom"></i>
            <span>查看个人信息</span>
          </div>
        </div>
      </router-link>

      <router-link to="/editUserInfo">
        <div class="serve">
          <div class="serve-item">
            <i class="el-icon-edit"></i>
            <span>修改个人信息</span>
          </div>
        </div>
      </router-link>

      <router-link to="/rePassword">
        <div class="serve">
          <div class="serve-item">
            <i class="el-icon-edit-outline"></i>
            <span>修改密码</span>
          </div>
        </div>
      </router-link>

      <div class="serve" @click="logout">
        <div class="serve-item">
          <i class="el-icon-close"></i>
          <span>退出登录</span>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
export default {
  data() {
    return {
      fans: this.$getSessionStorage("fans"),
      borrowNum: 0, // 用于存放借阅
      booksEvaluateNum: 0, // 评论的数量
      returnBooksNum: 0,  // 待还书的数量
    };
  },
  created() {
    this.getNum()
  },
  methods: {
    getNum(){
      // 获取历史借阅数量
      this.$axios.get("/borrow/num/"+this.fans.id).then((response)=>{
        this.borrowNum = response.data.data.borrowNum
        console.log(response.data)
      })
      // 获取评论数量
      this.$axios.get("/evaluate/num/"+this.fans.id).then((response)=>{
        this.booksEvaluateNum = response.data.data.booksEvaluateNum
        console.log(response.data)
      })

      this.$axios.get("/borrow/returnBooksNum/"+this.fans.id).then((response)=>{
        this.returnBooksNum = response.data.data.returnBooksNum
        console.log(response.data)
      })
    },
    logout(){
      this.$router.push("/")
      this.$removeSessionStorage('fans')
      this.$removeSessionStorage('token')
      
    }
  },

  components: {
    Footer,
  },
};
</script>

<style scoped>
.wrapper {
  background-color: ghostwhite;
}
h2 {
  padding: 0;
  margin: 0;
}

.personal-info {
  width: 100%;
  background: url("../assets/carbg.png") #c5c5c5;
  padding: 2vw 0;
  height: 50vw;
  /* margin-bottom: 3vw; */
}

.personal-info .head-sculpture {
  margin: auto auto;
  text-align: center;
}
.personal-info .head-sculpture img {
  display: inline-block;
  height: 30vw;
  border-radius: 50%;
}

.personal-info .username {
  font-size: 15vw;
  line-height: 80px;
  color: #fff;
}

.serve {
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  height: 15vw;
  border-bottom: 1px solid rgb(238, 238, 238);

  margin-bottom: 3vw;
}
.serve i {
  font-size: 5vw;
  margin-right: 1vw;
}

.serve .serve-item {
  padding: 0 5vw;
  width: 100%;
}
.serve .serve-item .icon-right {
  float: right;
}
.serve span {
  font-size: 5vw;
  /* font-weight: 700; */
}

.my-order {
  /* margin-top: 10px; */
  box-sizing: border-box;
  width: 360px;
  height: 20vw;
  margin: auto;
  /*border-bottom: 1px solid #000;*/
  background-color: #fff;
  padding: 0 5px;
  margin-bottom: 7vw;
  margin-top: 20px;
  border-radius: 15px;
  /*box-shadow: 0px 15px 10px -15px #545353;*/
}

/* .text {
  font-size: 18px;
  font-weight: 700;
  margin: 10px 0;
  text-align: left;
} */

.my-order .order {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
}

.my-order .order-item-img {
  text-align: center;
  font-size: 5vw;
}

.order-item-info {
  color: #676363;
  font-size: 4vw;
}

.jump {
  background-color: #fff;
  width: 360px;
  border-radius: 15px;
  margin: auto;
}
</style>

