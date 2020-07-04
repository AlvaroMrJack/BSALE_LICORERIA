<template>
	
	<v-app-bar
      app
      color="primary"
      dark
    >

      <v-toolbar-title>Carro de compras</v-toolbar-title>
      <v-spacer></v-spacer>


      <CardCarro />

    </v-app-bar>


</template>

<script>

  import CardCarro from './CardCarro';

	export default {
	   components: {
      CardCarro
     }	
	}

</script>