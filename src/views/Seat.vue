<template>
  <div class="wrapper">
    <!-- header部分 -->
    <header>
      <p><i class="el-icon-back"></i> 独行月球 </p>
      <span><i class="el-icon-alarm-clock"></i> 2022年1月10日 17:30 2D</span>
    </header>

    <div class="scree"></div>
    <div class="seat">
      <div class="row" v-for="row in 9" :key="row">
        <div v-for="col in 9" :key="col">
          <div :class="seatStyle" :ref="col+'-'+row" @click="handleChooseSeat(col,row)"></div>
        </div>
      </div>
    </div>

    <div class="info">
      <div class="list">
        <ul>
          <li v-for="item,index in checkout" :key="index">
            {{item.p+'排'+item.z+'座'}}
          </li>
        </ul>
      </div>
      <div class="checkout">
        <ul>
          <li><i class="el-icon-thumb
"></i> 支付</li>
          <li><i class="el-icon-bank-card"> × {{checkout.length}}</i></li>
          <li>￥{{checkout.length*38}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        seatStyle: 'inner-seat',
        checkout: [],
      }
    },
    components: {},
    methods: {
      handleChooseSeat(c, r) {
        console.log(this.checkout.length)

        if (this.$refs[c + '-' + r][0].className == 'inner-seat') {
          if (this.checkout.length >= 4) {
            this.$message({
              showClose: true,
              message: '用户最多可以购买4张',
              type: 'warning',
              onClose: () => {
                return
              },
            })
            return
          } else {
            this.$refs[c + '-' + r][0].className = 'checked'
            this.checkout.push({ p: c, z: r })
          }
        } else {
          this.$refs[c + '-' + r][0].className = 'inner-seat'
          const arr = this.checkout
          this.checkout = arr.filter((item) => {
            console.log(item.p != c && item.z != r)
            if (!(item.p == c && item.z == r)) {
              return item
            }
          })
        }
      },
    },
  }
</script>

<style scoped>
  .wrapper {
    width: 100%;
  }
  .wrapper header {
    width: 100%;
    height: 22vw;
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
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .wrapper header span {
    font-size: 4vw;
    margin-top: 3vw;
    margin-left: 1vw;
  }

  .wrapper .scree {
    width: 100%;
    height: 30vw;
    background-image: url(../assets/screen.png);
    background-repeat: no-repeat;
    background-size: 100% 30vw;

    box-sizing: border-box;
    margin-top: 23vw;
  }

  .wrapper .seat {
    /* background-color: aqua; */
    margin: 5vw;
    width: 90vw;
    height: 100vw;
    display: flex;
    flex-direction: row;
  }
  .wrapper .info {
    width: 100%;
    height: 35vw;

    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
  }
  .wrapper .info .list {
    width: 100%;
    height: 15vw;
    /* background-color: aqua; */
  }

  .wrapper .info .list ul {
    display: flex;
    flex-direction: row;
  }

  .wrapper .info .list ul li {
    background-color: #fff;
    box-shadow: 0 1vw 0.5vw 0.5vw rgba(227, 231, 239, 0.8);
    border-radius: 2vw;
    margin-left: 5vw;
    padding: 2vw 2vw;
    color: #191919;
  }

  .wrapper .info .checkout {
    width: 100%;
    height: 20vw;
    background-image: linear-gradient(#0067ff, #5202ff);
  }
  .wrapper .info .checkout ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 20vw;
    align-items: center;
  }
  .wrapper .info .checkout ul li {
    color: #fff;
    font-size: 5vw;
  }

  .wrapper .seat .inner-seat {
    width: 7vw;
    height: 7vw;
    background-color: #bdbdbd;
    margin: 1.5vw;
    border: 0.1 solid #191919;
    border-radius: 1.5vw;
  }
  .wrapper .seat .checked {
    width: 7vw;
    height: 7vw;
    background-color: aliceblue;
    margin: 1.5vw;
    border: 0.1 solid #efefef;
    border-radius: 1.5vw;
    background-color: #0067ff;
  }

  .disabled {
    width: 7vw;
    height: 7vw;
    background-color: aliceblue;
    margin: 1.5vw;
    border: 0.1 solid #efefef;
    border-radius: 1.5vw;
    background-color: #efefef;
  }
</style>

