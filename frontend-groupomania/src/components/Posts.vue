<template >
  <div>

   <div :key="post.id" v-for="post in postsContent"> 

        <Post @delete-post="$emit('delete-post', post.id)" @like-post="$emit('like-post', post.id)" @dislike-post="$emit('dislike-post', post.id)" @select-post="$emit('select-post', post.UserId)" :post="post"/>  
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
emits: ["delete-post", "like-post", "dislike-post","select-post"],
}
</script>

<style>

</style>