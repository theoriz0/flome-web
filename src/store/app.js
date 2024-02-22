// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    categories: ["all"],
    currentCategory: "all",
    newPost: {
      content: "",
      category: "",
    }
  }),
  getters: {
    categoriesWithAll: (state) => ["all",...state.categories],
  },
  actions: {
    async fetchCategories() {
        const url = `http://localhost:13578/api/categories`
        this.$patch({ categories: await (await fetch(url)).json() })
    },
},
})
