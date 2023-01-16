<template>
  <div class="wrapper">
    <Header title='我的评论'></Header>

    <div class="main">
      <div class="book-item" v-for="(item, index) in evaluateList" :key="index">
        <div class="left" @click="toDetails(item.bid)">
          <div class="cover">
            <img :src="item.cover" alt="">
          </div>
        </div>
        <div class="center">
          <div class="info">
            <div class="top">
              <h2>{{ item.bookName }}</h2>
              <div>
                <!-- <button @click="delEvaluate()">删除</button> -->
                <el-popconfirm title="确定删除该评论吗？" @confirm="delEvaluate(item.id)">
                  <el-button slot="reference">删除</el-button>
                </el-popconfirm>
              </div>
            </div>
            <span>&nbsp;&nbsp;{{ item.comment }}</span>
          </div>
        </div>
      </div>

    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      title: this.$route.query.categoryName,  // 从路由中获取数据
      categoryId: this.$route.query.categoryId,
      evaluateList: [],
      fans: this.$getSessionStorage('fans'),
    }
  },
  created() {
    this.getEvaluateList()
  },
  methods: {
    getEvaluateList() {
      this.$axios.get("/evaluate/list/" + this.fans.id).then((response) => {
        console.log(response)
        if (response.data.code == 1) {
          this.evaluateList = response.data.data.booksEvaluateList
        }
      })
    },

    toDetails(id) {
      this.$router.push({
        path: '/details',
        query: {
          bid: id,
        }
      })
    },
    delEvaluate(id) {
      this.$axios.post("/evaluate/delEvaluate/" + id).then((response) => {
        if (response.data.code == 1) {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success",
            onClose: () => {
              // 删除成功之后，重新请求用户列表
              this.getEvaluateList();
            },
          });
        }
      })
    }
  }
}
</script>

<style scoped>
h2 {
  padding: 0;
  margin: 0;
}

.wrapper .main {
  width: 100%;
  height: 200vw;
  /* background-color: red; */
  padding-top: 14vw;

}

.book-item {
  display: flex;
  width: 100%;
  /* height: 43vw; */
  /* background-color: green; */
  margin: 7vw 0;
}

.book-item .left {
  height: 100%;
  width: 30vw;
  /* background-color: orange; */
}

.book-item .left .cover img {
  width: 30vw;
}

.book-item .center {
  flex: 1;
  height: 100%;
  display: flex;
}

.book-item .center .info {
  width: 90%;
}

.book-item .top {
  margin-left: 3vw;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
</style>