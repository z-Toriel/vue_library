<template>
  <div class="wrapper">
    <Header :title=title></Header>

    <div class="main">
      <div class="book-item" v-for="(item,index) in booksList" :key="index" @click="toDetails(item.id)">
        <div class="left">
          <div class="cover">
            <img :src="item.cover" alt="">
          </div>
        </div>
        <div class="center">
          <div class="info">
            <h2 class="bookName info-item">{{item.name}}</h2>
            <div class="author info-item">{{item.author}}</div>
            <div class="press info-item">{{item.press}}</div>
          </div>
        </div>
        <div class="right">
          <div class="remain">
            剩：{{item.remain}}本
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
  components:{
    Header,
    Footer,
  },
  data(){
    return {
      title: this.$route.query.categoryName,  // 从路由中获取数据
      categoryId: this.$route.query.categoryId,
      booksList: []
    }
  },
  created(){
    this.getBooksList()
  },
  methods:{
    getBooksList(){
      this.$axios.get("/books/listByCategory/" + this.categoryId).then((response) => {
        console.log(response)
        if(response.data.code == 1){
          this.booksList = response.data.data.list
        }
      })
    },

    toDetails(id){
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
.wrapper .main {
  width: 100%;
  height: 200vw;
  /* background-color: red; */
  padding-top: 14vw;
  
}
.book-item{
  display: flex;
  width: 100%;
  /* height: 43vw; */
  /* background-color: green; */
  margin: 7vw 0;
}

.book-item .left{
  height: 100%;
  width: 30vw;
  /* background-color: orange; */
}

.book-item .left .cover img{
  width: 30vw;
}

.book-item .center{
  flex:1;
  height: 100%;
  /* background-color: blue; */
  display: flex;
}

.book-item .center .info{
  /* background-color: #fff; */
  margin: auto 5vw auto;
}

.book-item .center .info .info-item{
  margin: 3vw 0;
}

.book-item .center .info .author {
  color: rgb(83, 83, 83);
}

.book-item .center .info .press {
  color: gray;
}



.book-item .right{
  height: 100%;
  width: 18vw;
  /* background-color: #fff; */
}
</style>