<template>
<form @submit="addPost">
  <div class="card gedf-card">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="posts-tab"
            data-toggle="tab"
            href="#posts"
            role="tab"
            aria-controls="posts"
            aria-selected="true"
            >Publier</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="images-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="images"
            aria-selected="false"
            href="#images"
            >Images</a
          >
        </li>
      </ul>
    </div>
    <div class="card-body">
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="posts"
          role="tabpanel"
          aria-labelledby="posts-tab"
        >
          <div class="form-group">
            <label class="sr-only" for="message">post</label>
            <textarea v-model="comment"
              class="form-control"
              id="message"
              rows="3"
              :placeholder="currentUser.username"
            ></textarea>
           
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="images"
          role="tabpanel"
          aria-labelledby="images-tab"
        >
          <div class="form-group">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="customFile" />
              <label class="custom-file-label" for="customFile"
                >Chercher une image/gif</label
              >
            </div>
          </div>
          <div class="py-4"></div>
        </div>
      </div>
      <div class="btn-toolbar justify-content-between">
        <div class="btn-group">
          <button ontype="submit" class="btn btn-primary">Publier</button>
             
        </div>
    
      </div>
    </div>
  </div>

</form>


</template>

<script>



export default {
  
  name: "Header",
  components : {

  },
  data () {
    return {
    
      comment:'',

    }
  },
  computed: {
    currentUser() {
      return `Que voulez-vous poster ${this.$store.state.auth.user} ?`;
     
    }
  },
  methods: {
    addPost(e) {
      e.preventDefault()

      if(!this.comment) {
        return alert('Merci d\'ajouter un commentaire avant envoi')
      }
      
      const newPost = {
        id_post: "8",
       id_user: this.$store.state.auth.user.id,
        comment : this.comment

      }
      this.comment =''
     
      this.$emit('add-post', newPost)
    }
  }
};
</script>

<style></style>
