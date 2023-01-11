<template>
  <div class="wrapper">

    <!-- header部分 -->
    <header>
      <p><i class="el-icon-back"></i> 独行月球</p>
    </header>

    <div class="header-logo">
      <div>
        <img src="../assets/m01.png">
      </div>
      <div class="header-list">
        <p>独行月球</p>
        <span><i class="el-icon-star-on"></i> 8.1</span>
        <ul>
          <li>科幻，喜剧</li>
          <li>中国大陆/99分钟</li>
          <li>2022-11-11 18:00中国大陆上映</li>
          <li>
            <div class="tag">2D</div>
          </li>
        </ul>
      </div>
    </div>

    <ul class="arrangement_time">
      <li class="active">周一12月5日</li>
      <li>周二12月6日</li>
      <li>周三12月6日</li>
      <li>周四12月6日</li>
    </ul>

    <div class="sessions">
      <ul>
        <li class="time"> 15:25</li>
        <li class="time">17:04</li>
        <li class="type">原版2D</li>
        <li class="price">￥38</li>
        <li class="btn">
          购票
        </li>
      </ul>
      <ul>
        <li class="time">15:25</li>
        <li class="time">17:04</li>
        <li class="type">原版2D</li>
        <li class="price">￥38</li>
        <li class="btn">
          购票
        </li>
      </ul>
      <ul>
        <li class="time">15:25</li>
        <li class="time">17:04</li>
        <li class="type">原版2D</li>
        <li class="price">￥38</li>
        <li class="btn">
          购票
        </li>
      </ul>
      <ul>
        <li class="time">15:25</li>
        <li class="time">17:04</li>
        <li class="type">原版2D</li>
        <li class="price">￥38</li>
        <li class="btn">
          购票
        </li>
      </ul>
      <ul>
        <li class="time">15:25</li>
        <li class="time">17:04</li>
        <li class="type">原版2D</li>
        <li class="price">￥38</li>
        <li class="btn">
          购票
        </li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '../components/Footer.vue'
  export default {
    data() {
      return {}
    },
    created() {},
    methods: {},
    components: {
      Footer,
    },
  }
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
    /* background-color: #d3dce6; */
    background-color: #181818;
    color: #fff;
    font-size: 4.8vw;
    padding-left: 2vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;

    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .wrapper .sessions ul {
    width: 100%;
    /* background-color: #ffc300; */

    display: flex;
    justify-content: space-around;
    flex-shrink: 1;
    border-bottom: 0.1vw solid #cecece;
  }
  /* .wrapper .sessions ul button {
                                                                                                                                                                font-size: 3.5vw;
                                                                                                                                                                background-color: #dedede;
                                                                                                                                                                border: 0vw none #fff;
                                                                                                                                                                color: #2d2d2d;
                                                                                                                                                                padding: 1vw 3vw;

                                                                                                                                                                border-radius: 10vw;
                                                                                                                                                              } */
  /* .wrapper .sessions .active {
                                                                                                                                                background-color: #0068ff;
                                                                                                                                                color: #fff;
                                                                                                                                              } */

  .wrapper .sessions ul li {
    display: flex;
    width: 20vw;
    /* background-color: aqua; */
    align-items: center;
    margin: 5vw 3vw;
  }
  .wrapper .sessions .time {
    font-size: 5.5vw;
    font-family: Arial, Helvetica, sans-serif;
  }
  .wrapper .sessions .type {
    font-size: 3vw;
  }
  .wrapper .sessions .price {
    font-size: 5vw;
    color: #ffc300;
    justify-content: flex-end;
    font-family: Arial, Helvetica, sans-serif;
  }
  .wrapper .sessions .btn {
    border: none;
    border-radius: 1.5vw;
    padding: 1vw 1vw;
    background-color: #0068ff;
    font-size: 3vw;
    color: #fff;
    justify-content: center;
  }
  .wrapper .arrangement_time {
    width: 100%;
    height: 5vw;
    margin-top: 4vw;
    margin-bottom: 2vw;

    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .wrapper .arrangement_time .active {
    border-bottom: 3px solid #5202ff;
  }

  .wrapper .arrangement_time li {
    font-size: 3.5vw;
    color: #292929;
    padding: 3vw 0;
  }

  .wrapper .header-logo {
    width: 100%;
    height: 58vw;
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
  .wrapper .header-logo .header-list p {
    font-size: 6vw;
    margin-bottom: 5vw;
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
</style>
