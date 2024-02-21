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
  actions: {
    async fetchCategories() {
        const url = `http://localhost:13578/api/categories`
        this.$patch({ categories: await (await fetch(url)).json() })
    },
},
})
