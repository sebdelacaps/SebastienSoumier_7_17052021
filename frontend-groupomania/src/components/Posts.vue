<template>
  <div>
  <div :key="post.id_post" v-for="post in posts">

      <Post :post="post"/>
  </div>

</div>
</template>

<script>
import Post from './Post'

export default {
name: 'Posts',
props: {
    posts: Array,
},
components: {
  Post
}
}
</script>

<style>

</style>