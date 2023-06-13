<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="">
                    <b-table :data="imageBlocks" default-sort="number">
                        <b-table-column field="number" label="Номер" width="20" numeric sortable v-slot="props">
                            <div class="">
                                <span :style="{background: props.row.getCssStyleColor()}" class="tag is-size-6">{{ props.row.number }}</span>
                            </div>
                        </b-table-column>
                        <b-table-column field="x" label="X" width="20" numeric v-slot="props">
                            <div class="">
                                <span class="is-size-5 mr-2">{{ props.row.x }}</span>
                                <b-button size="is-small" @click="props.row.x -= 1">-</b-button>
                                <b-button size="is-small" @click="props.row.x += 1">+</b-button>
                            </div>
                        </b-table-column>
                        <b-table-column field="y" label="Y" width="20" numeric v-slot="props">
                            <div class="">
                                <span class="is-size-5 mr-2">{{ props.row.y }}</span>
                                <b-button size="is-small" @click="props.row.y -= 1">-</b-button>
                                <b-button size="is-small" @click="props.row.y += 1">+</b-button>
                            </div>
                        </b-table-column>
                        <b-table-column field="width" label="Ширина" width="20" numeric v-slot="props">
                            <div class="">
                                <span class="is-size-5 mr-2">{{ props.row.width }}</span>
                                <b-button size="is-small" @click="props.row.width -= 1">-</b-button>
                                <b-button size="is-small" @click="props.row.width += 1">+</b-button>
                            </div>
                        </b-table-column>
                        <b-table-column field="height" label="Высота" width="20" numeric v-slot="props">
                            <div class="">
                                <span class="is-size-5 mr-2">{{ props.row.height }}</span>
                                <b-button size="is-small" @click="props.row.height -= 1">-</b-button>
                                <b-button size="is-small" @click="props.row.height += 1">+</b-button>
                            </div>
                        </b-table-column>
                        <b-table-column field="wqe" :visible="true" label="Удалить" width="20" numeric v-slot="props">
                            <div class="">
                                <b-button size="is-small" class="mr-4" @click="props.row.isLocked = !props.row.isLocked">
                                    <span v-show="props.row.isLocked"><i class="fa-solid fa-lock fa-lg"></i></span>
                                    <span v-show="!props.row.isLocked"><i class="fa-solid fa-lock-open fa-lg"></i></span>
                                </b-button>
                                <b-button size="is-small" @click="confirBlockDelete(props.row.number)">
                                    <span><i class="fa-solid fa-xmark fa-xl"></i></span>
                                </b-button>
                            </div>
                        </b-table-column>
                        <template #footer>
                            <div class="has-text-right">
                                <b-button class="mr-5" @click="addImageBlock">Добавить</b-button>
                                <b-button class="is-info" @click="saveImageBlocks">Сохранить</b-button>
                            </div>
                        </template>
                    </b-table>
                </div>
            </div>
        </div>
        <div ref="image_editor">
            <vue-p5
                @setup="setup"
                @draw="draw"
                @keypressed="keypressed"
                @mousepressed="mousePressed"
                @mousereleased="mouseReleased">
            </vue-p5>
        </div>
        <b-notification :closable="false">
            <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
        </b-notification>
    </div>
</template>

<script>
import VueP5 from "vue-p5";
import {HTTP} from "@/plugins/axios";
import {TaskImageBlock} from "@/imageEditor/taskImageBlock";


export default {
    name: "taskEditor",
    components: {
        "vue-p5": VueP5
    },
    data: function () {
        return {
            isLoading: true,
            isLocked: true,
            isSaving: false,
            pk: null,
            task: null,
            imageBlocks: [],
            img: null,
        }
    },
    methods: {
        loadTask() {
            if (this.pk) {
                HTTP.get('tasks/' + this.pk)
                    .then(response => {
                        this.task = response.data;
                        this.isLoading = false;
                        this.loadTaskBlocks(this.pk)
                        this.successNotify('Задача загружена')
                    })
            }
        },
        saveImageBlocks() {
            if (this.isSaving) return
            let data = []
            this.imageBlocks.forEach(block => {
                data.push({
                    number: block.number,
                    x: block.x,
                    y: block.y,
                    width: block.width,
                    height: block.height,
                    task: this.pk
                })
            })
            this.isSaving = true
            HTTP.post('/tasks/' + this.pk + '/save_image_blocks/', data)
                .then(response => {
                    console.log(response)
                    this.isSaving = false
                    this.successNotify('Задача сохранена')
                })
                .catch(error => {
                    console.log(error)
                    this.isSaving = false
                    this.dangerNotify('Ошибка при сохранении')
                })
        },
        loadTaskBlocks() {
            this.imageBlocks = []
            HTTP.get('tasks/' + this.pk + '/image_blocks')
                .then(response => {
                    if (Array.isArray(response.data)) {
                        response.data.forEach((block) => this.imageBlocks.push(new TaskImageBlock(block, this.task)))
                    }
                })
        },
        setup(sk) {
            sk.resizeCanvas(1100, 600)
        },
        loadImage(sk) {
            if (this.task) {
                this.img = sk.loadImage(this.task.image)
            }
        },
        draw(sk) {
            sk.strokeWeight(4);
            sk.background(255, 255, 255);
            sk.stroke(51);
            sk.fill(255, 255, 255);
            sk.rect(0, 0, 1100, 600);
            sk.strokeWeight(1);
            if (this.img) {
                sk.image(this.img, 2, 2)
            } else {
                this.loadImage(sk)
            }
            this.imageBlocks.forEach((imageBlock) => imageBlock.draw(sk))
        },
        keypressed(sk) {
            console.log(sk);
        },
        mousePressed(sk) {
            this.imageBlocks.forEach((block) => block.mousePressed(sk))
        },
        mouseReleased(sk) {
            this.imageBlocks.forEach((block) => block.mouseReleased(sk))
        },
        getFreeBlockNumber() {
            const existNumbers = this.imageBlocks.map(b => b.number)
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].find(el => !existNumbers.includes(el))
        },
        addImageBlock() {
            const num = this.getFreeBlockNumber()
            if (!num) {
                this.dangerNotify('Ограничение в 10 блоков')
                return
            }
            this.imageBlocks.push(new TaskImageBlock(
                {number: num, x: 0, y: 0, width: 100, height: 100},
                this.task
            ))
        },
        removeImageBlock(number) {
            this.imageBlocks = this.imageBlocks.filter(block => block.number !== number)
        },
        notify(message) {
            this.$buefy.toast.open(message)
        },
        successNotify(message) {
            this.$buefy.toast.open({
                message: message,
                type: 'is-success'
            })
        },
        dangerNotify(message) {
            this.$buefy.toast.open({
                duration: 5000,
                message: message,
                type: 'is-danger'
            })
        },
        confirBlockDelete(number) {
            this.$buefy.dialog.confirm({
                title: 'Удалить блок',
                message: '',
                confirmText: 'Удалить',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => {
                    this.removeImageBlock(number)
                    this.notify('Удален')
                }
            })
        }
    },
    created() {
        this.pk = this.$route.params.pk;
        this.loadTask(this.pk)
    }
}
</script>

<style scoped>
</style>
