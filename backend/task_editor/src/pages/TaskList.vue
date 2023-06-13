<template>
    <div>
        <div class="card mb-4" v-for="task in tasks" :key="task.pk">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <b-image
                            :src="task.image"
                            alt="A random image"
                        ></b-image>
                    </div>
                    <div class="media-content">
                        <p class="title is-4"><router-link :to="'/editor/'+task.pk">{{ task.title }}</router-link></p>
                        <p class="subtitle is-6">{{ task.category }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {HTTP} from "@/plugins/axios";

export default {
    name: "TaskList",
    data() {
        return {
            tasks: []
        }
    },
    methods: {
        loadTasks() {
            HTTP.get('tasks')
                .then(response => {
                    this.tasks = response.data
                })
        },
    },
    created() {
        this.loadTasks()
    }
}
</script>

<style scoped>

</style>
