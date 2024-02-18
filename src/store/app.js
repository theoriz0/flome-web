// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    categories: [],
  }),
  actions: {
    async fetchCategories() {
        const url = `http://38.207.160.50:13578/api/blog`
        this.$patch({ categories: await (await fetch(url)).json() })
    },
},
})
