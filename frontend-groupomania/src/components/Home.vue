<template>
  <div class="container">
    <header class="jumbotron">WELCOME</header>
    <Header @add-post="addPost"/>
    <Posts @delete-post="deletePost" @like-post="likePost" :posts-content="posts"/>
   
</div>


</template>

<script>
import UserService from "../services/user.service";
import Header from "./Header";
import Posts from "./Posts";
import axios from 'axios';

export default {
  name: "Home",
  components: {
    Header,
    Posts
  },
  methods: {
    addPost(postAdded) {
    
   axios({
      method: 'post',
      url: "http://localhost:3000/api/messages/new",
      headers: { Authorization: this.$store.state.auth.user.token },
      data: {
    "content": postAdded
  }})
  .then(() => {

UserService.getPublicContent().then(
      (response) => {
        this.posts = response.data
        console.log(this.posts)
       
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    )})}
    ,
  deletePost(id) {
  if (confirm('Are you sure?')) {
  
     axios.delete(`http://localhost:3000/api/messages/${id}`,
     {
  headers: {
    Authorization: this.$store.state.auth.user.token
   
  }})
     .then((response) => {
       if (response.status === 200) {
      (this.posts = this.posts.filter((post) => post.id !== id))
       }
       else if (response.status === 202) {
         return alert('you have to be admin')
       }
       else {
return alert('Error deleting task')
       }
      
     })
     .catch((error) => console.log(error))
      
   
    }

        
     
  },

  likePost(id) {
    console.log(this.$store.state.auth.user.token)
  axios({
     method: 'post',
      url: `http://localhost:3000/api/messages/${id}/vote/like`,
      headers: { Authorization: this.$store.state.auth.user.token },
      
  }).then(() => {

UserService.getPublicContent().then(
      (response) => {
        this.posts = response.data
        console.log(this.posts)
       
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    )})} 
  
  },
  data() {
    return {
      posts: []
      
    };
  
  },
  created() {

    UserService.getPublicContent().then(
      (response) => {
        this.posts = response.data
        console.log(this.posts)
       
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