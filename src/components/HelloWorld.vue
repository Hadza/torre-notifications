<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
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
        <p class="subheading font-weight-regular text--secondary">
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
      <v-col cols="12" md="4" class="py-0">
        <v-text-field
            v-model="username"
            color="secondary"
            placeholder="Type your Torre username"
        >
          <template v-slot:append>
            <v-btn color="secondary" icon>
              <v-icon>
                mdi-magnify
              </v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>

<!--      <v-col-->
<!--        class="mb-5"-->
<!--        cols="12"-->
<!--      >-->
<!--        <h2 class="headline font-weight-bold mb-3">-->
<!--          Made with-->
<!--        </h2>-->

<!--        <v-row justify="center">-->
<!--          <a-->
<!--            v-for="(eco, i) in ecosystem"-->
<!--            :key="i"-->
<!--            :href="eco.href"-->
<!--            class="subheading mx-3"-->
<!--            target="_blank"-->
<!--          >-->
<!--            {{ eco.text }}-->
<!--          </a>-->
<!--        </v-row>-->
<!--      </v-col>-->
    </v-row>
  </v-container>
</template>

<script>
import {db} from "@/db";

export default {
    name: 'HelloWorld',

    data: () => ({
      documents:[],
      username: '',
      ecosystem: [
        {
          text: 'VueJS',
          href: 'https://vuejs.org',
        },
        {
          text: 'Vuetify',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'Firebase',
          href: 'https://firebase.google.com',
        },
      ],
    }),
    firestore: {
      documents: db.collection('users')
    },
    methods: {

    }
  }
</script>
