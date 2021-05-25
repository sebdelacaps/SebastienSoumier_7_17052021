<template>
  <div class="container">
    <header class="jumbotron">
      <!-- <h3>{{ content }}</h3> -->
    </header>
    <Header @add-post="addPost"/>
    <Posts :posts="posts"/>
   
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
    }
  },
  data() {
    return {
      posts: []
    };
  
  },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.posts = response.data.messages;
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