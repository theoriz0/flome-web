import { defineStore, acceptHMRUpdate } from 'pinia';
export const usePostsStore = defineStore({
    id: 'posts',
    state: () => ({
        page: 1,
        limit: 10,
        total: 100,
        posts: []
    }),
    actions: {
        nextPage() {
            if (this.page * this.limit >= this.total) {
                return
            }
            this.page++
            this.fetchPosts()
        },
        prevPage() {
            if (this.page === 1) {
                return
            }
            this.page--
            this.fetchPosts()

        },
        async fetchPosts() {
            const url = `http://localhost:13578/api/blog`
            this.$patch({ posts: await (await fetch(url)).json() })
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot));
}
