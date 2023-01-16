<template>
  <div class="wrapper">
    <Header title='作者'></Header>
    <Footer></Footer>
    <div class="main">

      <div class="search">
      <!-- 当滚动条超过上面的定位块时，search-fixed-top块变成固定在顶部。 -->
      <div class="search-fixed-top" ref="fixedBox">
        <!-- 搜索框部分中间的白框 -->
        <div class="search-box">
          <el-input placeholder="输入作者" prefix-icon="el-icon-search" v-model="authorName" @input="searchBook">
          </el-input>
        </div>
      </div>
    </div>

      <div class="book-item" v-for="(item, index) in booksList" :key="index" @click="toDetails(item.id)">
        <div class="left">
          <div class="cover">
            <img :src="item.cover" alt="">
          </div>
        </div>
        <div class="center">
          <div class="info">
            <h2 class="bookNam info-item">{{ item.name }}</h2>
            <div class="author info-item">{{ item.author }}</div>
            <div class="press info-item">{{ item.press }}</div>
          </div>
        </div>
        <div class="right">
          <div class="remain">
            剩：{{ item.remain }}本
          </div>
        </div>
      </div>
    </div>
    
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
      booksList: [],
      authorName: "",
    }
  },
  created() {
    this.getBooksList()
  },
  methods: {
    //搜索
    searchBook() {
      if (this.authorName != '' || this.authorName != null) {
        this.booksList = []
        this.getBooksList()
      }
    },
    // 获取所有书籍
    getBooksList() {
      this.$axios.get("/books/listByauthor",
        {
          params: {
            authorName: this.authorName,
          },
        }
      ).then((response) => {
        console.log(response)
        if (response.data.code == 1) {
          this.booksList = response.data.data.list
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
    }
  }
}
</script>

<style scoped>
/****************** search ******************/
.wrapper .search {
  width: 100%;
  height: 15vw;
}

.wrapper .search .search-fixed-top {
  width: 100%;
  height: 15vw;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper .search .search-fixed-top .search-box {
  width: 90%;
  height: 9vw;
  background-color: #e9e9e9;
  border-radius: 6px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 3.5vw;
  color: #aeaeae;
  font-family: "宋体";
  /*此样式是让文本选中状态无效*/
  /*user-select: none;*/
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
  margin-top: 7vw;
  margin-bottom: 7vw;
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
  /* background-color: blue; */
  display: flex;
}

.book-item .center .info {
  /* background-color: #fff; */
  margin: auto 5vw auto 4vw;
}

.book-item .center .info .info-item {
  margin: 3vw 0;
}

.book-item .center .info .author {
  color: rgb(83, 83, 83);
}

.book-item .center .info .press {
  color: gray;
}



.book-item .right {
  height: 100%;
  width: 18vw;
  /* background-color: #fff; */
}
</style>