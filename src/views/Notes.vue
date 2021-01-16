<template>
  <div class="note-info">
    <router-link to="/">X</router-link>
    <h2 class="d-flex justify-content-center">{{categories[categoryId].header}}</h2>
    <div v-bind:key="post.id" v-for="(post, post_index) in categories[categoryId].content">
      <div class="item d-flex justify-content-between align-items-center">
        <p style="font-size:1.5rem">{{post}}</p>
        <button type="button" class="btn btn-sm btn-outline-danger" v-on:click="reloadPage" @click="removePostit(categoryId, post_index)">Delete note</button>
      </div>
    </div>
    <button type="button" class="btn btn-danger" v-on:click="reloadPage" @click="removeCategory(categoryId)">Delete category</button>
  </div>
</template>

<script>
export default {
  props: ["categoryId"],
  data() {
    return {
      categories: {},
    };
  },
   mounted(){
    if (localStorage.getItem('categories')){
      try {
        this.categories = JSON.parse(localStorage.getItem('categories'));
      } catch(e) {
        localStorage.removeItem('categories');
      }
    }
  },
   methods: {
        removePostit(categoryId, post_index){
            this.categories[categoryId].content.splice(post_index, 1);
            this.savePosts();
        },
        removeCategory(categoryId){
          delete this.categories[categoryId];
          this.savePosts();
          window.location.href = "/";
        },
        savePosts(){
            const parsed = JSON.stringify(this.categories);
            localStorage.setItem('categories', parsed);
        },
        reloadPage(){
          window.location.reload();
        },
        clearDate(){
          localStorage.clear();
        }
    }
};
</script>

<style lang="scss" scoped>
.note-info {
    padding: 16px;
}
</style>