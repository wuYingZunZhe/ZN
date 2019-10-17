<template>
  <div>
    <table>
        <tr >
            <th width='40%'>
                Time
            </th>
            <th width='40%'>
                Alarm sound
            </th>
        </tr>
        <tr>
            <td><select-time ></select-time></td>
            <td><song-list></song-list></td>
        </tr>
        
        <tr>
            <td><select-time></select-time></td>
            <td><song-list></song-list></td>
        </tr>
        
        <tr>
            <td><select-time></select-time></td>
            <td><song-list></song-list></td>
        </tr>
    </table>
    
    
    
    

    
    
  </div>
</template>

<script>
import selectTime from '../compent/selectTime.vue';
import songList from '../compent/songList.vue';
export default {
  name: 'addsongList',
  components: {
    selectTime,  
    songList,
},
  data () {
    return {
      
    
    }
  },
 
}
</script>

<style scoped>
table{
    width:100%;
    background:#ddd;
}
table {
    border-collapse: collapse;
}
table, td, th {
    border: 1px solid black;
}



</style>
