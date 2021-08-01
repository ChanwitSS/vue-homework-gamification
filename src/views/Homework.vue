<template>
  <div>
    <div v-for="(homework, index) in homeworks" v-bind:key="index">
        <Card :homework="homework"/>
    </div>
  </div>
</template>

<script>
import HomeworkStore from '@/store/HomeworkStore'
import Card from '../components/cards/HomeworkCard.vue'
export default {
    components: { Card },
    data() {
        return {
            userRole: null,
            homeworks: []
        }
    },
    created() {
        this.fetch()
    },
    methods: {
        async fetch() {
            await HomeworkStore.dispatch("fetch")
            this.homeworks = HomeworkStore.getters.homeworks
        },
    }
}
</script>


<style>

</style>