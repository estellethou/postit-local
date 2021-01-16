<template>
  <div class="categories d-flex flex-wrap">
      <div v-for="category in categories" :key="category.index">
        <div class="card text bg-warning mb-3 item " style="max-width: 25rem;">
          <div class="card-header header d-flex justify-content-between">{{category.header}} 
            <router-link :to="`/${category.id}`" >
              <img src="../assets/more.png" width="30" height="30" alt="dot">
            </router-link>
          </div>
          <div class="card-body card-style">
            <div class="subcard" v-bind:key="value.id" v-for="value in category.content">
              <p class="card-text">{{value}}</p>
            </div>
            <div id="add-post-it">
              <AddNote v-bind:category="category"/>
            </div>
        </div>
      </div>
     </div>

        <div class="addNote input-group mb-3">
        <input v-model="newCategory" type="text" class="form-control" placeholder="Add new category" aria-describedby="basic-addon2">
            <div class="input-group-append">
            <button @click="addCategory"  class="btn btn-outline-secondary" type="button">+ Add Category</button>
            </div>
        </div>

      <div v-if="showModal" class="modal-route">
        <div class="modal-content">
          <router-view></router-view>
        </div>
      </div>
    </div>  

</template>

<script>
import AddNote from '../components/AddNote.vue'
export default {
  watch: {
    $route: {
      immediate: true,
      handler: function(newVal, oldVal) {
        oldVal;
        this.showModal = newVal.meta && newVal.meta.showModal;
      }
    }
  },
  components: {
    AddNote,
  },
  props:["newNote"],
  mounted(){
    if (localStorage.getItem('categories')){
      try {
        this.categories = JSON.parse(localStorage.getItem('categories'));
      } catch(e) {
        localStorage.removeItem('categories');
      }
    }
  },
  data() {
        return {
          showModal: false,
          newPostit: null,
          newCategory: null,
          categories: {
        0:{id: 0, header: "Example", content:["your task"]},
      },
    };
  },
  methods: {
    addPostit(category_id){
      if (!this.newPostit) {
        return;
      }
      this.categories[category_id].content.push(this.newPostit);
      this.newPostit = '';
      this.savePosts();
    },
    savePosts(){
      const parsed = JSON.stringify(this.categories);
      localStorage.setItem('categories', parsed);
    },
    reloadPage(){
          window.location.reload();
        },
    addCategory(){
      if(!this.newCategory) {
        return; 
      }
      var idmax = Math.max(...Object.keys(this.categories));
      this.categories[idmax+1] = {
        id:idmax+1, header: this.newCategory, content:[]
      };
      this.newCategory ='';
      this.savePosts();
      this.reloadPage();
      }
    },
};

</script>

<style lang="scss">

.modal-route {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.6);

  .modal-content {
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgb(255, 255, 255);
  }
}

.add-post-it {
    border: dotted 1px;
    border-radius: 20px;
    margin : 0.4rem;
    padding: 0.5rem;
    width: 100%;
    background-color: white;
    color: grey;
}

.add-post-cat {
    width: 100%;
    height: 2rem;
    border: dotted 1px;
    border-radius: 20px;
    color: grey;
    text-align: center;

}

.card-style {
  background: white;
  border : #e1ad01 solid 2px;
  border-radius: 15px;
}

.item {
    border-radius: 20px;
    margin: 2rem;
}

.subcard {
  display: flex;
  flex-direction: row;
}

.header {
  font-size : 1.2rem;
  font-weight: bold;

}

.main {
  margin : 0rem;
  flex-direction: row;
  justify-content: space-around;
}

.categories {
  display: flex;
  flex-direction: row;

}
</style>