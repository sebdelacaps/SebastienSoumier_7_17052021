<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    
  <div class="content-panel">
                   
                    <form class="form-horizontal">
                        <fieldset class="fieldset">
                            
                            <div class="form-group">
                                <label  class="col-md-2 col-sm-3 col-xs-12 control-label">Username</label>
                                <div class="col-md-10 col-sm-9 col-xs-12">
                                    <input type="text" class="form-control" v-model="username">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2  col-sm-3 col-xs-12 control-label">Email</label>
                                <div class="col-md-10 col-sm-9 col-xs-12">
                                    <input type="email" class="form-control" v-model="email">
                                   
                                </div>
                            </div>
                           
                            
                        </fieldset>
                        <hr>
                        <div class="form-group">
                            <div class="col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0">
                                <input @click="onUpdate" class="btn btn-primary" type="submit" value="Update Profile">
                            </div>
                        </div>
                    </form>
                </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Profile',
  computed: {
    currentUser() {
      console.log(this.$store.state)
      return this.$store.state.auth.user;
    }
  },
  data() {
    return {
      username : '',
      email : '',
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods : {
  onUpdate(e) {

    e.preventDefault()

     axios({
      method: 'put',
      url: "http://localhost:3000/api/users/me",
      headers: { Authorization: this.$store.state.auth.user.token },
      data: {
        "username" : this.username,
        "email" : this.email
      }
     })
   .then((response) => {
     console.log(response.data.userUpdated.username)
       this.username = response.data.userUpdated.username
      this.email = response.data.userUpdated.email
    })
    .catch((err) => console.log(err))
  }
  },
  created() {
    console.log('1')
      axios({
      method: 'get',
      url: "http://localhost:3000/api/users/me",
      headers: { Authorization: this.$store.state.auth.user.token },
     })
    .then((response) => {
      this.username = response.data.username
      this.email = response.data.email
    })
    .catch((err) => console.log(err))
  }
};
</script>