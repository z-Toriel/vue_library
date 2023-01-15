<template>
  <div class="wrapper">

    <!-- header部分 -->
    <header>
      <p><i @click="$router.back()" class="el-icon-back"></i> {{ filmdata.name }}</p>
    </header>
    <div class="header-logo">
      <div>
        <img :src="filmdata.cover">
      </div>
      <div class="header-list">
        <div class="bookName">{{ filmdata.name }}</div>
        <span style="height:5px">作者：{{ filmdata.author }}</span>
        <ul>
          <li>{{ filmdata.categoryName }}</li>
          <li>{{ filmdata.location }}</li>
          <li>{{ filmdata.region }}</li>
          <li>
            <h3>剩余：{{ filmdata.remain }}</h3>
          </li>
        </ul>
      </div>
    </div>
    <div class="scroll">
      <ul>
        <li class="scrollLeft">
          <p>{{ filmdata.star }}</p>
          <el-rate v-model="filmdata.star" disabled text-color="#ff9900" score-template="{value}"></el-rate>
        </li>
        <li class="scrollRight">
          <el-progress :percentage="70" color="orange" :format="format"></el-progress>
          <el-progress :percentage="15" color="orange" :format="format"></el-progress>
          <el-progress :percentage="10" color="orange" :format="format"></el-progress>
          <el-progress :percentage="3" color="orange" :format="format"></el-progress>
          <el-progress :percentage="2" color="orange" :format="format"></el-progress>
        </li>
      </ul>


    </div>
    <div class="BtnDiv">
      <el-button type="primary" class="btn" @click="toArrangement(filmdata.id)">点击购票</el-button>
    </div>
    <ul class="arrangement_time">
      <li class="active">简介</li>
      <li>影评</li>
    </ul>

    <div class="sessions">
      <ul>
        <li>
          <div class="introKuang">
            <p class="intro">剧情简介</p>
            <!-- {{film.text|ellipsis}} -->
            <p id="box">&nbsp;&nbsp; {{ filmdata.introduce }}</p>
            <!-- <el-button type="text">&lt;展开&gt;</el-button> -->
          </div>
        </li>
      </ul>
      <ul class="hot">
        <li class="hotTitle">
          <p class="na">观众热评</p>
        </li>
        <li class="hot-item" v-for=" item in evaluatedata" :key="item.id">
          <ul>
            <li>
              <p class="ava"><el-avatar :size="60" :src="item.avatar"></el-avatar></p>
            </li>
            <li>
              <p class="hotName">{{ item.username }}</p>
            </li>

            <li>
              <div class="hotdis">
                <!-- <p>2022.11.1</p> -->
                <el-divider direction="vertical"></el-divider>
                &nbsp;
                <p>个人评分</p>
                <p><el-rate v-model="item.star" disabled text-color="#ff9900" score-template="{value}">
                  </el-rate></p>
              </div>
            </li>
            <li>
              <p class="pingjia">{{ item.comment }}</p>
            </li>
          </ul>
          <!-- <br> -->
          <div class="zhan">&nbsp;</div>
        </li>

        <br>

        <br>

      </ul>
      <br>
      <ul class="commet">
        <li>
          <el-avatar :size="60" :src="fans.avatar"></el-avatar>
          <p class="wrt">写影评</p>
          <p class="shing"><el-rate v-model="evaobj.star" :colors="colors">
            </el-rate></p>

        </li>
        <br>
        <li>
          <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="evaobj.comment">
          </el-input>
        </li>
        <li class="type">
          <el-button type="danger" @click="saveEva">发布</el-button>
          <el-button plain>重置</el-button>
        </li>
      </ul>
      <br>
      <br>
    </div>

    <!-- <Footer></Footer> -->
  </div>
</template>
  
<script>
import Footer from '../components/Footer.vue'
export default {
  data() {
    return {
      //获得电影的id
      id: '',

      //获得电影的对象
      film: {
        bid: this.$route.query.bid,   //从跳转的路由中获得电影编号 参数
        categoryName: '',  //电影分类的名称
        dateList: [],  //当前电影排片的日期
        typeList: [],  //电影的放映类型
      },
      evaobj: {
        // uid:this.fans.id,
        // fid:this.filmdata.id
      },
      filmdata: {
        
      },
      evaluatedata: {

      },
      fans: {

      },
      value: (9.3 * 0.5),   //评分的星星
      value2: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      textarea: ''
    }
  },
  created() {
    // this.film.bid=this.$route.query.bid
    this.categoryList = this.$getLocalStorage('categoryList')
    this.getFilm()
    this.fans = this.$getSessionStorage('fans')
  },
  methods: {

    //点击电影信息跳转到排片信息
    toArrangement(id) {
      //fid就是电影信息
      this.$router.push({
        path: '/arrangement',
        //携带参数
        query: {
          fid: id,
        }
      })
    },

    // 获得电影信息
    // 根据电影fid获得电影的详情信息
    getFilm() {
      this.$axios.get('/books/info/' + this.film.bid).then((response) => {
        if (response.data.code == 1) {
          //查询成功
          this.filmdata = response.data.data.book
          this.filmdata.star=5;
          this.$setSessionStorage('film', this.filmdata)
          //查询该电影的类别信息  从session取出类别对象 数组中找
          //举例：大话西游  categoryId = 2
          let obj = this.categoryList.find((item) => {
            //item 就是取出一个分类对象
            return item.id == this.filmdata.categoryId  //查找出该电影的分类对象信息 (爱情)
          })
          this.filmdata.categoryName = obj.name
        } else {
          this.$message({
            showClose: true,
            message: response.data.message,
            type: 'warning',
          })
        }
      })
    },
    //获得关于该电影和该用户的信息
    getUserFilmEvalueate() {
      //评论信息
      this.$axios.get('/evaluate/infoUser/' + this.film.bid).then((response) => {
        this.evaluatedata = response.data.data.evaluates
        console.log(response.data);

      })
    },

    // 提交喜爱
    tolove() {
      this.$axios.get('/love/toloveUpdate/', {
        params: {
          uid: this.fans.id,
          fid: this.filmdata.id,
        }

      }).then(response => {
        this.$message({
          showClose: true,
          message: response.data.message,
          type: 'success',
        })
      }
      )

    },

    //提交影评
    saveEva() {
      //评论信息
      this.$axios.get('/evaluate/save/', {
        params: {
          uid: this.fans.id,
          fid: this.filmdata.id,
          comment: this.evaobj.comment,
          star: this.evaobj.star
        },
      }).then(response => {
        this.$message({
          showClose: true,
          message: "评论成功",
          type: 'success',
        })
        this.getUserFilmEvalueate()
        this.evaobj = {}
      })
    },



    format(percentage) {
      return percentage === 100 ? '满' : '';
    }
  },
  components: {
    Footer,
  },
  mounted() {
    this.getUserFilmEvalueate()
  },
}
</script>
  
<style scoped>
.zhan {
  background-color: #fff;
}

.BtnDiv {
  min-width: 100%;
  height: 40px;
  position: relative;
  display: flex;
  justify-content: flex-end;
}

.btn {
  position: relative;
  width: 380px;
  text-align: center;
  right: 5px;
}

/****************** 总容器 ******************/
.wrapper {
  width: 100%;
  height: 100%;
}

/****************** header部分 ******************/
.wrapper header {
  width: 100%;
  height: 12vw;
  /* background-color: #d3dce6; */
  background-color: #181818;
  color: #fff;
  font-size: 4.8vw;
  padding-left: 2vw;
  position: fixed;
  left: 0;
  /* top: -1.3vw; */
  z-index: 1000;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.wrapper .sessions ul {
  /* background-color: #ffc300; */
  justify-content: space-around;
  flex-shrink: 1;
}

.wrapper .sessions ul li {
  /*display: flex;
       background-color: aqua; */

  margin: 5vw 3vw;
}

.introKuang {
  background-color: rgb(248, 248, 248);
  border-radius: 4px;
  padding: 10px 10px;
}

.wrapper .sessions .intro {
  font-weight: bold;
  font-size: 20px;
  margin: 10px 10px;
}

.wrapper .arrangement_time {
  width: 100%;
  font-weight: bold;
  margin-bottom: 2vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.wrapper .arrangement_time .active {
  border-bottom: 3px solid #5202ff;
  font-size: 18px;
}

.wrapper .arrangement_time li {
  font-size: 3.5vw;
  color: #292929;
  padding: 3vw 0;
  font-size: 18px;
}

.wrapper .header-logo {
  width: 100%;
  /* height: 58vw; */
  /*使用上外边距避开header部分*/
  margin-top: 12vw;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #d3dce6;
  color: #2d2d2d;
}

.wrapper .header-logo .header-list {
  margin: 2vw 3vw 0vw 0vw;
  width: 100%;
  /* background-color: violet; */
  padding: 0vw 2vw 2vw 4vw;
  height: 48vw;
}

.wrapper .header-logo .header-list .bookName {
  font-size: 6vw;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
}

.wrapper .header-logo .header-list span {
  font-size: 4vw;
  color: #ffc300;
  font-weight: 600;
}

.wrapper .header-logo .header-list ul {
  margin-top: 4vw;
}

.wrapper .header-logo .header-list ul li {
  margin-top: 1.5vw;
  font-size: 3.5vw;
}

.wrapper .header-logo .header-list ul li .tag {
  width: 7vw;
  height: 4.3vw;
  background-color: #5202ff;
  font-size: 3vw;
  text-align: center;
  border-radius: 2vw;
  color: #fff;
}

.wrapper .header-logo img {
  width: 35vw;
  height: 50vw;
  margin: 2vw 0vw 0vw 3vw;
}

.scroll {
  background-color: rgb(255, 245, 220);
  width: 380px;
  height: 100px;
  margin: auto;
  margin-top: 10px;
  border-radius: 4px;
}

.scroll ul {
  width: 380px;
  height: 100px;
  padding: 10px 0px;
}

.scroll ul li {
  padding: 0;
  float: left;
}

.scroll .scrollLeft {
  width: 80px;
  height: 100px;
  padding: 0 20px;
}

.scroll .scrollLeft p {
  font-weight: bold;
  font-size: 40px;
  text-align: center;
}

.scroll .scrollRight {
  width: 260px;
  height: 100px;
  margin: auto;
  padding: 0;
}

.hot {
  background-color: rgb(248, 248, 248);
  border-radius: 4px;
  padding: 5px 5px;
  width: 360px;
  margin: auto;
}

li .hot-item {
  margin-bottom: 3vw;
  background-color: red;
}

.hot .hotTitle {
  font-weight: bold;
  font-size: 20px;
}

.na {
  margin: -10px 10px;
}

.hot .hotTitle li ul li .ava {
  width: 60px;
}

.hotName {
  font-weight: bold;
  font-size: 17px;
  margin-left: 75px;
  margin-top: -86px;
  height: 17px;
}

.hotdis {
  font-size: 14px;
  text-align: right;
  /* width: 42px; */
  display: flex;
  margin-left: 75px;
  margin-top: -10px;
}

.commet {
  background-color: rgb(248, 248, 248);
  border-radius: 4px;
  padding: 5px 5px;
  width: 360px;
  margin: auto;
}

.wrt {
  font-weight: bold;
  margin-top: -48px;
  margin-left: 80px;
}

.shing {
  margin-top: -20px;
  margin-left: 260px;
}

.commet button {
  text-align: center;
  width: 160px;
}
</style>