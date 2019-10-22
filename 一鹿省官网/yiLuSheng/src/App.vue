<template>
  <div id="app">
    <myNav></myNav>
    <router-view/>
    
    <myFooter></myFooter>
      
  </div>
</template>

<script>
import myNav from './view/myNav/myNav'
import myFooter from './view/myFooter/myFooter'
export default {
  name: 'App',
  components: {
    myNav,
    myFooter
  },
}
</script>

<style>

</style>
