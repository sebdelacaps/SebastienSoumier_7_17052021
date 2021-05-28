<template>
  <div class="container">
    <header class="jumbotron">
    </header>
    <Header @add-post="addPost"/>
    <Posts @delete-post="deletePost" :posts-content="posts"/>
   
</div>


</template>

<script>
import UserService from "../services/user.service";
import Header from "./Header";
import Posts from "./Posts";


export default {
  name: "Home",
  components: {
    Header,
    Posts
  },
  methods: {
    addPost(post) {
this.posts =[...this.posts, post]
    },
    deletePost(id) {
  console.log('post', id)
  },
  data() {
    return {
      posts: []
    };
  
  },

  },
  created() {
    UserService.getPublicContent().then(
      (response) => {
        this.posts = response.data
        console.log(response.data)
       
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};

</script>