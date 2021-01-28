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
            Just type your username and select a notification criteria, don't worry you can update or delete this later.
        </p>
      </v-col>

      <v-col cols="6" sm="4" md="3" class="py-0">
        <v-text-field
            v-model="username"
            class="centered-input"
            color="secondary"
            placeholder="Type your Torre username"
            :error-messages="invalid_user ? 'Oops! I couldnt find you :(':undefined"
            :loading="loadingUserInfo"
            v-on:keyup.enter="getUserInfo(username)"
        >
          <template v-slot:append>
            <v-btn color="secondary" icon @click="getUserInfo(username)">
              <v-icon>
                mdi-magnify
              </v-icon>
            </v-btn>
          </template>
        </v-text-field>
        <h3>{{ message }}</h3>
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
          <v-btn
              v-if="user.preferences.token"
              color="warning"
              outlined
              @click="disableNotifications"
              :loading="loading"
          >
            Disable notifications
          </v-btn>
          <v-btn v-else color="secondary" outlined :loading="loading" @click="askForPermissions">Notify me!</v-btn>
        </v-col>
      </v-row>
    </v-fade-transition>
  </v-container>
</template>

<script>
import {db} from "@/db";

export default {
    name: 'HelloWorld',

    data: () => ({
      documents:[],
      username: '',
      message: 'Nothing yet...',
      user: undefined,
      invalid_user: false,
      loadingUserInfo: false,
      loading: false,
    }),
    firestore: {
      documents: db.collection('users')
    },
    methods: {
      async getUserInfo(username){
        this.loadingUserInfo = true

        const query = this.$functions.httpsCallable('getUserData')
        const res = await query({username})

        this.loadingUserInfo = false

        this.invalid_user = !res.data
        this.user = res.data ? res.data:undefined
        this.user.profile.username = username
        this.message = 'I found you!'
      },
      askForPermissions(){
        this.loading = true
        this.$messaging.requestPermission()
        .then(() => this.$messaging.getToken())
        .then(token => {
          this.user.preferences.token = token
          db.collection('users').doc(this.user.profile.username).set(this.user, { merge:true })
        })
        .finally(()=> {
          this.loading = false
        })
      },
      async disableNotifications(){
        this.loading = true
        db.collection('users').doc(this.user.profile.username).delete()
        .catch(() => {

        })
        .finally(() => {
          this.message = "Bye bye :(, you can always come back!"
          this.user = undefined
          this.loading = false
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
