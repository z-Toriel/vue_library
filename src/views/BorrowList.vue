<template>
  <div class="wrapper">
    <el-container>
      <div>&nbsp;</div>
      <el-header>
        <div class="want">
          &nbsp;
          <p>&nbsp;<i class="el-icon-goods"></i>&nbsp;订单</p>
        </div>
      </el-header>

      <el-main>
        <div class="main">
          <span>&nbsp;</span>
          <!-- 先循环没有归还的 -->
          <div class="movieD" v-for="borrow0 in borrowList0" :key="borrow0.id" @click="toDetails(borrow0.bid)">
            <img :src="borrow0.cover" alt="" />
            <div class="movieLeftD">
              <p class="movieNameD">
                {{ borrow0.bookName }}
                <span class="alrD">待归还</span>
              </p>
              <p><span>预计{{ borrow0.returnDate }}归还</span></p>
            </div>
          </div>
          <span>&nbsp;</span>

          <!-- 在循环正常归还的 -->
          <div class="movie" v-for="borrow1 in borrowList1" :key="borrow1.id" @click="toDetails(borrow1.bid)">
            <img :src="borrow1.cover" alt="" />
            <div class="movieLeft">
              <p class="movieName">
                <span class="bookName">{{ borrow1.bookName }}</span>
                <span class="alr" style="color: #67c23a;">正常归还</span>
              </p>
              <p><span>预计{{ borrow1.returnDate }}归还</span></p>
              <p><span>实际{{ borrow1.realReturnDate }}归还</span></p>
            </div>
          </div>
          <span>&nbsp;</span>

          <!-- 在循环逾期归还的 -->
          <div class="movie" v-for="borrow2 in borrowList2" :key="borrow2.id" @click="toDetails(borrow2.bid)">
            <img :src="borrow2.cover" alt="" />
            <div class="movieLeft">
              <p class="movieName">
                <span class="bookName">{{ borrow2.bookName }}</span>
                <span class="alr" style="color: #909399;">逾期归还</span>
              </p>
              <p><span>预计{{ borrow2.returnDate }}归还</span></p>
              <p><span>实际{{ borrow2.realReturnDate }}归还</span></p>
            </div>
          </div>
          <span>&nbsp;</span>

          <!-- 在循环书籍破损的 -->
          <div class="movie" v-for="borrow3 in borrowList3" :key="borrow3.id" @click="toDetails(borrow3.bid)">
            <img :src="borrow3.cover" alt="" />
            <div class="movieLeft">
              <p class="movieName">
                <span class="bookName">{{ borrow3.bookName }}</span>
                <span class="alr" style="color: ;">书籍破损</span>
              </p>
              <p><span>预计{{ borrow3.returnDate }}归还</span></p>
              <p><span>实际{{ borrow3.realReturnDate }}归还</span></p>
              <p><span>赔偿：{{ borrow3.compensation }}</span></p>
            </div>
          </div>
          <span>&nbsp;</span>

          <!-- 在循环书籍破损的 -->
          <div class="movie" v-for="borrow4 in borrowList4" :key="borrow4.id" @click="toDetails(borrow4.bid)">
            <img :src="borrow4.cover" alt="" />
            <div class="movieLeft">
              <p class="movieName">
                <span class="bookName">{{ borrow4.bookName }}</span>
                <span class="alr" style="color:red ;">书籍丢失</span>
              </p>
              <p><span>预计{{ borrow4.returnDate }}归还</span></p>
              <p><span>实际{{ borrow4.realReturnDate }}归还</span></p>
              <p><span>赔偿：{{ borrow4.compensation }}</span></p>
            </div>
          </div>
          <span>&nbsp;</span>
        </div>
      </el-main>
    </el-container>
    <Footer></Footer>
  </div>
</template>
  
<script>
import Footer from "../components/Footer.vue";
export default {
  data() {
    return {
      borrowList0: [],
      borrowList1: [],
      borrowList2: [],
      borrowList3: [],
      borrowList4: [],
      fans: this.$getSessionStorage('fans'),
      film: {
        startTime: "",
        endTime: ""
      }
    };
  },
  created() {
    this.getBorrowlist()
  },
  methods: {
    getBorrowlist() {
      this.$axios.get("/borrow/list/" + this.fans.id).then((response) => {
        this.borrowList1 = response.data.data.borrowsList1
        this.borrowList0 = response.data.data.borrowsList0
        this.borrowList2 = response.data.data.borrowsList2
        this.borrowList3 = response.data.data.borrowsList3
        this.borrowList4 = response.data.data.borrowsList4
        console.log(response.data.data)
      })
    },

    // 跳转到书籍详情页面
    toDetails(bid) {
      // console.log(bid)
      this.$router.push({
        path: '/details',
        query: {
          bid: bid,
        }
      });
    }
  },
  components: {
    Footer,
  },
};
</script>
  
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}

.wrapper header {
  width: 100%;
  height: 110px;
  z-index: -1;
  margin-top: 20px;
  background-color: #fff;
}

.want {
  background-color: rgb(255, 135, 44);
  width: 100%;
  height: 120px;
  color: #fff;
  font-size: 20px;
  z-index: -1;
}

.main {
  background-color: ghostwhite;
  height: 800px;
  border-radius: 25px 25px 0px 0px;
  margin-top: 10px;
}

.main img {
  height: 100px;
  width: 80px;
}

.movieD {
  height: 150px;
  background-color: #fff;
  width: 90%;
  margin: auto;
  margin-bottom: 3vw;
}

.movie {
  height: 150px;
  background-color: #fff;
  width: 90%;
  margin: auto;
}

.movieD p {
  font-size: 14px;
}

.movie p {
  font-size: 14px;
}

.main .movieD img {
  margin-top: 25px;
  margin-left: 10px;
}

.main .movie img {
  margin-top: 25px;
  margin-left: 10px;
  opacity: 0.5;
}

.main .movieD .movieLeftD {
  margin-left: 100px;
  margin-top: -90px;
}

.main .movie .movieLeft {
  margin-left: 100px;
  margin-top: -90px;
  color: rgb(21, 21, 21, 0.5);
}

.main .movieD .movieNameD {
  font-size: 18px;
  font-weight: bold;
  width: 50vw;
  height: 7vw;
  display: flex;
  justify-content: space-between;
}

.main .movie .movieName {
  font-size: 18px;
  font-weight: bold;
  width: 50vw;
  height: 7vw;
  display: flex;
  justify-content: space-between;
}

.main .movie .movieName .bookName {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.main .movie .movieName .alr {
  color: rgb(255, 174, 111, 0.5);
  font-size: 14px;
  width: 18vw;
  display: inline-block;

}

.main .movieD .movieLeftD button {
  margin-left: 95px;
}

.main .movie .movieLeft button {
  margin-left: 95px;
}

.down {
  margin-top: 15px;
}

.downD {
  margin-top: 15px;
}

.alrD {
  /* margin-left: 120px; */
  color: rgb(255, 30, 0);
  font-size: 14px;
}
</style>