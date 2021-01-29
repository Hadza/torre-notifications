<template>
  <v-col cols="12" sm="8" md="6">
    <h3 class="mb-2">{{this.user.jobs.length > 0 ? 'Your latest job alerts':'Nothing here yet'}}</h3>
    <v-list two-line v-if="user.jobs.length > 0" class="mb-2">
      <template v-for="(job, index) in this.user.jobs">
        <v-divider v-if="index !== 0" :key="index"></v-divider>
        <v-list-item :key="job.id" class="text-start">
          <v-list-item-avatar>
            <v-img :src="job.organization.picture"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="job.objective"></v-list-item-title>
            <v-list-item-subtitle v-html="job.organization.name"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon v-if="!test_mode"
                   :href="'https://torre.co/jobs/' + job.id"
                   target="_blank"
            >
              <v-icon color="secondary lighten-1">mdi-open-in-new</v-icon>
            </v-btn>
            <v-btn icon v-else @click="deleteJobRecord(job)" :loading="loading">
              <v-icon color="error lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
  </v-col>
</template>

<script>
export default {
name: "JobList",
  props:{
    test_mode: Boolean,
    user: Object,
  },
  data: () => ({
    loading: false,
  }),
  methods:{
    deleteJobRecord(job){
      this.$emit('delete-job', job)
    }
  }
}
</script>

<style scoped>

</style>
