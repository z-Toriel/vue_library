<template>
  <div>
    <!-- 头部分 -->
    <header>
      <div class="left"> <i @click="$router.back()" class="el-icon-back"></i> </div>
      <div class="right">{{ title }}</div>
    </header>
  </div>
</template>

<script>
export default {
  props:["title"],
  data(){
    return {

    }
  },
  methods:{
    
  }
}
</script>

<style scoped>
/* 头部份开始 */
.wrapper header{
  justify-content: space-between;
}

.wrapper header .left{
  width: 10vw;
  text-align: center;
}

.wrapper header .right{
  flex:1;
  text-align: center;
  padding-right: 10vw;
}
/* 头部份结束 */

</style>