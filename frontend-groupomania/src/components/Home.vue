<template>
  <div class="container">
    <header class="jumbotron text-center h3">PARTAGER VOS PHOTOS AVEC VOS COLLEGUES</header>
    <Header @add-post="addPost" @add-file="addFile"/>
    <Posts @delete-post="deletePost" @like-post="likePost" @dislike-post="dislikePost" @select-post="selectPost" :posts-content="posts"/>
   
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
    addFile(fileAdded){
      this.posts.attachment = fileAdded
    
    },
    addPost(postAdded) {




    const fd = new FormData();
    fd.append('image', this.posts.attachment, this.posts.attachment.name);
     fd.append('content', postAdded.content);
  
   axios ({
     method: "post",
     url : 'http://localhost:3000/api/messages/new',
     data : fd,
    headers: { Authorization: this.$store.state.auth.user.token,
    'Content-Type': 'multipart/form-data'}, 
     })
  .then(() => {

UserService.getPublicContent().then(
      (response) => {
        this.posts = response.data
     
       
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
    
  axios({
     method: 'post',
      url: `http://localhost:3000/api/messages/${id}/vote/like`,
      headers: { Authorization: this.$store.state.auth.user.token },
      
  }).then(() => {

UserService.getPublicContent().then(
      (response) => {
        this.posts = response.data
       
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    )})},
    selectPost (id) {
     
     this.posts = this.posts.filter((post) => post.UserId == id)
    },
  dislikePost(id) {
   
  axios({
     method: 'post',
      url: `http://localhost:3000/api/messages/${id}/vote/dislike`,
      headers: { Authorization: this.$store.state.auth.user.token },
      
  }).then(() => {

UserService.getPublicContent().then(
      (response) => {
        this.posts = response.data
    
       
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    )})},
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

<style scoped>

.jumbotron {
  background-color: #fcd6d5;

}
</style>