<template>
  <div>

   <div :key="post.id_post" v-for="post in postsContent"> 

        <Post :post="post"/>  
  </div>

</div>
</template>

<script>
import Post from './Post'

export default {
name: 'Posts',
props: {
    postsContent: Array,
},
components: {
  Post
}
}
</script>

<style>

</style>