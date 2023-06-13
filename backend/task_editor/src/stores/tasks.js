import { defineStore } from 'pinia'
import HTTP from '@/plugins/axios'

export const useTaskStore = defineStore("task", {
    state: () => ({
        task: null
    }),
    getters: {
        getTask(state) {
            return state.task
        }
    },
    actions: {
        async fetchTask() {
            try {
                const data = await HTTP.get()
                this.task = data.data
            }
            catch (error) {
                alert(error)
            }
        }
    }
})
