import Vue from 'vue'
import Router from 'vue-router'
import Category from './views/Category.vue'
import Notes from './views/Notes.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Category,
      children: [
        {
          meta: {
            showModal: true
          },
          path: ':categoryId',
          component: Notes,
          props: true
        }
      ]
    },
  ]
})
