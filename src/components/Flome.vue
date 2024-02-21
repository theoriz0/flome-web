<script setup>
import { watchEffect } from 'vue'
import { usePostsStore } from '@/store/posts'
import { useDate } from 'vuetify'
import { useAppStore } from '@/store/app';

const API_URL = `http://localhost:13578/api`

const posts = usePostsStore()
const appData = useAppStore()
const date = useDate()

watchEffect(get)

async function get() {
    const url = `${API_URL}/posts?page=${posts.page}&limit=${posts.limit}&category=${appData.currentCategory}`
    const data = await (await fetch(url)).json()
    posts.total = data.Total
    posts.posts = data.Posts
    posts.totalPages = Math.ceil(posts.total / posts.limit)
    const categoriesUrl = `${API_URL}/categories`
    appData.categories = await (await fetch(categoriesUrl)).json()
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

async function changeCategory(category) {
    console.log("change category: " + category)
    
        appData.currentCategory = category
        posts.page = 1
        await get()
}
</script>


<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar title="floME" density="compact"></v-app-bar>
        <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
            <v-responsive class="align-center text-center fill-height">
                <v-sheet>
                    <v-tabs>
                        <v-tab :key="0" :value="'all'" @click="changeCategory('all')">
                            All
                        </v-tab>
                        <v-tab v-for="category,n in appData.categories" :key="n" :value="category" @click="changeCategory(category)">
                            {{ category }}
                        </v-tab>
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
                <v-pagination v-model="posts.page" :length="posts.totalPages" @click="get"></v-pagination>
                <v-form>
                    <v-textarea col="20" rows="8" name="content" v-model="appData.newPost.content" v-on:input="changed"
                        placeholder="Content"></v-textarea>
                    <v-combobox v-model="appData.newPost.category" :items="appData.categories"></v-combobox>
                    <v-btn @click.prevent="post">Post</v-btn>
                </v-form>
                <v-footer class="text-center">
                    {{ new Date().getFullYear() }} — theoriz0
                </v-footer>
            </v-responsive>

        </v-main>

    </v-layout>
</template>