<template>
  <v-app>
    
    <!-- Contenedor principal -->
    <v-main>
      <Appbar />
      <router-view>
      </router-view>
      <Footer />
    </v-main>

  </v-app>

</template>

<script>

  import Appbar from "./components/Appbar";
  import Footer from "./components/Footer";

  export default {
    name: 'App',
    components: {
      Appbar,
      Footer
    },
    data (){
      return {

      }
    }
  }

</script>
