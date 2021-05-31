<template >
  <div>

   <div :key="post.id" v-for="post in postsContent"> 

        <Post @delete-post="$emit('delete-post', post.id)" @like-post="$emit('like-post', post.id)" :post="post"/>  
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
},
emits: ["delete-post", "like-post"],
}
</script>

<style>

</style>