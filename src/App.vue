<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Torre Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="60"
        />

        <v-toolbar-title>Torre Notifications</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/Hadza/torre-notifications"
        target="_blank"
        icon
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Home/>
      <v-snackbar v-model="snackbar" app  class="text-center" tile text top right :color="snackbarColor" :timeout="5000">
        {{snackbarMessage}}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    snackbar: false,
    snackbarColor: '',
    snackbarMessage: '',
  }),
  created(){
    this.$vuetify.theme.dark = true
    document.addEventListener('showSnack',this.showSnackbar)
  },
  methods:{
    showSnackbar(data){
      this.snackbarColor = data.detail.color
      this.snackbarMessage = data.detail.message
      this.snackbar = true
    },
  },
};
</script>
