<template>
    <div class="addNote input-group mb-3">
        <input v-model="newPostit" v-on:keyup.enter="addPostit(category.id)" type="text" class="form-control" placeholder="Add new task" aria-describedby="basic-addon2">
    </div>
</template>

<script>
export default {
  name: 'AddNote',
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
  props: ['category'],
  methods: {
    addPostit(category_id){
      if (!this.newPostit) {
        return;
      }
      this.categories[category_id].content.push(this.newPostit);
      this.newPostit = '';
      this.savePosts();
      this.reloadPage();
    },
    savePosts(){
      const parsed = JSON.stringify(this.categories);
      localStorage.setItem('categories', parsed);
    },
    reloadPage(){
          window.location.reload();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
