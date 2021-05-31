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
              placeholder="Publier un post"
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
   
  },
  methods: {
    addPost(e) {
      e.preventDefault()

      if(!this.comment) {
        return alert('Merci d\'ajouter un commentaire avant envoi')
      }
      
      const newPost = {
      content: this.comment
    

      }
      
          
      this.$emit('add-post', newPost)

      this.comment =''
    }
  }
};
</script>

<style></style>
