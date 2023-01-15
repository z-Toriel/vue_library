<template>
  <div class="wrapper">
    <Header></Header>
    <!-- 主要部分 -->
    <div class="main">
      <div @click="toBooksList(item.id,item.name)" class="category" v-for="(item,index) in categoryList">
        <div class="category-item">
          <div><h2>{{item.name}}</h2></div>
          <div class="booksNumber">{{item.booksNumber}}本书籍</div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
  
</template>

<script>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue"
export default {
  data(){
    return {
      categoryList:[]
    }
  },
  created(){
    this.getCategoryList()
  },
  methods:{
    // 获取分类信息列表
    getCategoryList(){
      this.$axios.get('/category/list').then((response) => {
        console.log("categoryList:",response.data.data)
        this.categoryList = response.data.data.categorylist
      })
    },

    // 跳转到booksList，顺便带上该分类的名称和id
    toBooksList(categoryId,categoryName){
      this.$router.push({
        path: '/booksList',
        query: {
          categoryId: categoryId,
          categoryName: categoryName,
        }
      })
    }
  },
  components:{
    Footer,
    Header,
  }
}
</script>

<style scoped>


/* 主要部份开始 */
.wrapper .main{
  width: 100%;
  padding-top: 14vw;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.wrapper .main .category {
  width: 40vw;
  height: 20vw;
  background-color: #eff3f4;
  margin: 2vw;
  text-align: center;
}

.wrapper .main .category .category-item{
  height: 10vw;
  line-height: 10vw;
}

.wrapper .main .category .category-item .booksNumber{
  color: gray;
}
</style>