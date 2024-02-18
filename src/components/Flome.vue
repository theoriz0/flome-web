<script setup>
import { computed } from '@vue/reactivity'
import { ref, watchEffect } from 'vue'
import { usePostsStore } from '@/store/posts'
import { useDate } from 'vuetify'

const API_URL = `http://38.207.160.50:13578/api/blog`

const posts = usePostsStore()

const content = ref("")
const tagsStr = ref("")
const category = ref("")
const tags = computed(() => tagsStr.value.split(','))
const date = useDate()

watchEffect(get)

async function get() {
    const url = `${API_URL}?page=${posts.page}&limit=${posts.limit}&category=${posts.category}`
    const data = await (await fetch(url)).json()
    posts.total = data.Total
    posts.posts = data.Posts
    posts.totalPages = Math.ceil(posts.total / posts.limit)
    posts.pagesArr = Array.from({ length: totalPages }, (_, index) => index + 1);
}

async function post() {
    if (content.value === "") {
        alert("Empty content")
        return
    }
    let data = {
        Content: content.value,
        Tags: tags.value,
        Category: category.value
    }
    console.log(JSON.stringify(data))
    try {
        const response = await fetch(API_URL, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
                "Authorization": "ekrifwbbmmPrWr0"
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert("Success:", result);
    } catch (error) {
        alert("Error:", error);
    }
}

function formatDate(v) {
    return date.format(date.date(v), 'keyboardDateTime24h')
}

function changeCategory(category) {
    return async () => {
        posts.category = category
        posts.page = 1
        await get()
    }
}

function getDev() {
    changeCategory("dev")()
}

function getOther() {
    changeCategory("other")()
}

function getAll() {
    changeCategory("all")()
}

async function setPage(i) {
    posts.page = parseInt(i.target.text)
    await get()
}
</script>


<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar title="floME" density="compact"></v-app-bar>
        <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
            <v-responsive class="align-center text-center fill-height">
                <p>{{ posts.category }} page: {{ posts.page }} of {{ posts.pagesArr }}</p>
                <div>
                    <a @click="getDev">dev</a> |
                    <a @click="getOther">other</a> |
                    <a @click="getAll">all</a>
                </div>
                <v-sheet>
                    <v-tabs>
                        <v-tab value="one" @click="getDev">Item One</v-tab>
                        <v-tab value="two" @click="getOther">Item Two</v-tab>
                        <v-tab value="three" @click="getAll">Item Three</v-tab>
                    </v-tabs>
                </v-sheet>
                <ul>
                    <li v-for="post in posts.posts">
                        <v-card max-width="800" :variant="text">
                            <v-card-text>
                                <p>{{ post.Content }}</p>
                                <v-chip size="small">
                                    {{ post.Category }}
                                </v-chip>
                                <v-chip size="small"> {{ formatDate(post.CreatedAt) }}</v-chip>
                            </v-card-text>
                        </v-card>
                    </li>
                </ul>
                <ul>
                    <li v-for="i in posts.pagesArr"><a @click="setPage">{{ i }}</a></li>
                </ul>
                <v-pagination :length="posts.totalPages"></v-pagination>
                <v-form>
                    <v-textarea col="20" rows="8" name="content" v-model="content" v-on:input="changed"
                        placeholder="Content"></v-textarea>
                    <v-combobox v-model="category"
                        :items="['dev', 'other']"></v-combobox>
                    <v-btn @click.prevent="post">Post</v-btn>
                </v-form>
                <v-footer class="text-center">
                    {{ new Date().getFullYear() }} — theoriz0
                </v-footer>
            </v-responsive>

        </v-main>

    </v-layout>
</template>