<template>
<div class="post">
 
<div class="container mt-5 mb-5">
    <div class="row d-flex align-items-center justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="d-flex justify-content-between p-2 px-3">
                    <div class="d-flex flex-row align-items-center"> <img src="https://i.imgur.com/UXdKE3o.jpg" width="50" class="rounded-circle">
                        <div class="d-flex flex-column ml-2"> <span class="font-weight-bold">{{post.User.username}}</span> </div>
                    </div>
                    <div class="d-flex flex-row mt-1 ellipsis"> <small class="mr-2"> {{ duration }}</small> <font-awesome-icon :icon="['fas', 'ellipsis-h']" />  </div>
                </div> <img src="https://i.imgur.com/xhzhaGA.jpg" class="img-fluid">
                <div class="p-2">
                    <p class="text-justify">{{ post.content}}</p>
                    <hr>
                    <div class="d-flex justify-content-center">
                        <!-- <div class="d-flex flex-row icons d-flex align-items-center">   <font-awesome-icon :icon="['far', 'smile']" /> </div> -->
                        <div class="icons"> <span>{{post.likes}} </span> <font-awesome-icon :icon="['fas', 'heart']" /> </div>
                    </div>
                   
                   
                </div>
            </div>
        </div>
    </div>
</div>

  </div>
</template>

<script>
export default {
name: 'Post',
props: {
    post: Object
},
computed : {
    duration () {
        
        return this.post.createdAt
    }
}
}
</script>

<style>

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");

body {
    background-color: #eee;
    font-family: "Poppins", sans-serif;
    font-weight: 300
}

.card {
    border: none
}

.ellipsis {
    color: #a09c9c
}

hr {
    color: #a09c9c;
    margin-top: 4px;
    margin-bottom: 8px
}

.muted-color {
    color: #a09c9c;
    font-size: 13px
}

.ellipsis i {
    margin-top: 3px;
    cursor: pointer
}

.icons {
    font-size: 25px
}

.icons .fa-heart {
    color: red;
    
}

.icons .fa-smile {
    color: yellow;
   
}

.rounded-image {
    border-radius: 50% !important;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px
}

.name {
    font-weight: 600
}

.comment-text {
    font-size: 12px
}

.status small {
    margin-right: 10px;
    color: blue
}

.form-control {
    border-radius: 26px
}

.comment-input {
    position: relative
}

.fonts {
    position: absolute;
    right: 13px;
    top: 8px;
    color: #a09c9c
}

.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #8bbafe;
    outline: 0;
    box-shadow: none
}
</style>