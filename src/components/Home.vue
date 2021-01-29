<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="100"
        />
      </v-col>

      <v-col>
        <h1 class="display-2 font-weight-bold mb-3">
          Tired of checking your email?
        </h1>

        <p class="subheading font-weight-regular text--secondary">
          Keep that unread mail number stacking up and show off to your friends your sick 9000+ count.
        </p>
      </v-col>
      <v-expand-transition>
        <div v-show="!user_loaded">
          <v-col
            cols="12"
          >
            <h2 class="headline font-weight-bold mb-3">
              Really? but how does it works?
            </h2>
            <p class="subheading font-weight-regular text--secondary mb-2">
              You only need to subscribe using your Torre username,
              grant notification permissions and you will start receiving
              new job alerts directly on your device (phone, tablet, desktop, etc.).
            </p>
          </v-col>

          <v-col
              cols="12"
          >
            <h2 class="headline font-weight-bold mb-3">
              I'm in, where do I sign?
            </h2>
            <p class="subheading font-weight-regular text--secondary mb-0">
                Just type your Torre username give us permission to notify you, don't worry you can disable this later.
            </p>
          </v-col>
        </div>
      </v-expand-transition>
    </v-row>
    <v-row justify="center" class="text-center">
      <v-col cols="6" sm="5" md="4" class="py-0">
        <v-text-field
            v-model="username"
            class="centered-input"
            color="secondary"
            placeholder="Type your Torre username"
            outlined
            :error-messages="user_not_found ? 'Oops! I couldnt find you :(':undefined"
            :loading="loading_user_info"
            v-on:keyup.enter="getUserInfo(username)"
        >
          <template v-slot:append>
            <v-btn color="secondary" small icon @click="getUserInfo(username)">
              <v-icon>
                mdi-magnify
              </v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-fade-transition>
      <v-row justify="center" class="text-center" v-show="user">
        <v-col cols="12"  v-if="user">
          <v-avatar size="86">
            <img
                 :src="user.profile.picture"
            >
          </v-avatar>
          <h3 v-if="user" class="headline font-weight-bold mb-3">{{ user.profile.name }}</h3>

          <template v-if="user.preferences.token">
            <v-expand-transition>
              <v-row justify="center" v-show="user_loaded">
                <JobList v-if="user.jobs" :user="user" :test_mode="test_mode" @delete-job="deleteJobRecord"></JobList>
              </v-row>
            </v-expand-transition>
            <p class="subheading font-weight-regular text--secondary" v-show="test_mode">
              Delete any job you want and you should be receiving the
              notification on your registered device in around 1-5 minutes.
            </p>
            <p class="subheading font-weight-regular text--secondary" v-show="test_mode">
              Push notifications are sent only in the background to avoid spamming the user,
              you must close this tab or select another one in your browser in order to receive the
              notification.
            </p>
            <v-btn v-if="user.jobs && user.jobs.length > 0" color="secondary" text small @click="test_mode = !test_mode">
              {{ test_mode ? 'Disable test mode':'Enable test mode' }}
            </v-btn>
            <v-btn
                color="error"
                text
                small
                @click="disableNotifications"
                :loading="loading"
            >
              Disable notifications
            </v-btn>
          </template>

          <v-btn v-else color="secondary" outlined :loading="loading" @click="askForPermissions">Notify me!</v-btn>
        </v-col>
      </v-row>
    </v-fade-transition>
  </v-container>
</template>

<script>
import {db, arrayRemove} from "@/db";
import JobList from "@/components/JobList";
const users = db.collection('users')


export default {
    name: 'Home',
    components:{
      JobList
    },
    data: () => ({
      username: '',
      user: undefined,
      user_loaded: false,
      user_not_found: false,
      loading_user_info: false,
      loading: false,
      test_mode: false,
    }),
    methods: {
      async getUserInfo(username){
        this.loading_user_info = true

        const query = this.$functions.httpsCallable('getUserData')
        const res = await query({username})

        this.loading_user_info = false

        this.user_not_found = !res.data
        if(this.user_not_found){
          this.user_loaded = false
          this.$unbind('user')
        }else{
          this.user = res.data
          this.user.profile.username = this.username
          if(this.user.preferences.token){
            this.user_loaded = true
            this.$bind('user', users.doc(this.username))
          }else{
            this.user_loaded = false
          }
        }
      },
      askForPermissions(){
        this.loading = true
        this.$messaging.requestPermission()
        .then(() => this.$messaging.getToken())
        .then(token => {
          this.user.preferences.token = token
          this.user.jobs = []
          console.log(this.user)
          users.doc(this.user.profile.username).set(this.user, { merge:true })
        })
        .finally(()=> {
          this.$bind('user', users.doc(this.user.profile.username))
          this.user_loaded = true
          this.loading = false
        })
      },
      async disableNotifications(){
        this.loading = true
        users.doc(this.user.profile.username).delete()
        .catch(err => {
          document.dispatchEvent(new CustomEvent('showSnack', {
            detail: {
              color: 'error darken-2',
              message: err.code + ' - There was an error when trying to disable notifications, try again later.'
            }
          }))
        })
        .finally(() => {
          this.user = undefined
          this.user_loaded = this.loading = this.test_mode = false
        })

      },
      deleteJobRecord(job){
        users.doc(this.user.profile.username).update({ jobs: arrayRemove(job)})
        .catch(err => {
          document.dispatchEvent(new CustomEvent('showSnack', {
            detail: {
              color: 'error darken-2',
              message: err.code + ' - There was an error when trying to delete this job, try again later.'
            }
          }))
        })
      }
    }
  }
</script>
<style lang="scss">
.centered-input input {
  text-align: center
}
</style>
