<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@media screen and (max-width: 900px) {
 #app{
   /*width:100vw;*/
 }
}

</style>
