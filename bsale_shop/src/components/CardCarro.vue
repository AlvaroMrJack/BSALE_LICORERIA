<template>
	
	<div>
		
		<v-layout>
			<!-- INICIO DE BOTÓN EN DONDE SE MUESTRA LA CANDITAD DE ARTICULOS COMPRADOS Y SE PUEDE ACCEDER AL CARRO DE COMPRAS CON EL EVENTO @CLICK-->
		    <v-btn
		        color="error"
		        dark
		        absolute
		        bottom
		        right
		        fab
		        @click="dialog = true"
		    >
				<v-icon>mdi-cart</v-icon>
				<caption>
		  			<!-- {{ store.state.cantidad }} -->
		  			0
		        </caption>
		    </v-btn>
			<!-- END BTN -->
		</v-layout>

		<Carro />

		<div>
			
			<!-- CREACIÓN DE MODAL DE DIALOGO PARA MOSTRAR EL CARRO DE COMPRAS -->
			<v-dialog v-model="dialog" persistent  max-width="1000">
		        <v-card>
		        	<!-- TITULO DEL CARRO DE COMPRAS -->
		        	<v-card-title class="headline">List@ con las compras?</v-card-title>
		        	<v-card-text>A continuación hay un listado de lo que tiene su carrito de compras.</v-card-text>
		        	
		        	<!-- CREACIÓN CONTAINER PRINCIPAL DE LOS PRODUCTOS EN EL CARRO -->
			        <v-container>
			        	<v-layout>
			        		<v-flex>
			        			<!-- SE GENERA UN CARD PARA CONTENER UN LISTADO CON LOS PRODUCTOS -->
			        			<v-card mb60>
			        				<v-list>
			        					<!-- SE RECORREN LOS LICORES, LA FUNCIÓN @CLICK NO ESTÁ DEFINIDA SOLO POR EFECTOS ESTETICOS, PARA QUE LA LISTA TENGA UN ESTILO DIFERENTE.. -->
								        <template v-for="(item, index) in licores">
								            <v-list-item
									            v-if="item.variant.id"
									            :key="item.variant.id"
									            @click=""
									            >
												<!-- AVATAR DEL LICOR -->
									            <v-list-item-avatar>
									            	<v-img :src="item.urlImg"></v-img>
									            </v-list-item-avatar>

												<!-- CONTENIDO PRINCIPAL DEL LICOR -->
									            <v-list-item-content>
									                <v-list-item-title>
									                	<!-- NOMBRE -->
										              	<caption>		
										              		{{ item.name }}
										              	</caption>
									                </v-list-item-title>
									                <!-- SE MUESTRA EL PRECIO DEL PRODUCTO PREFIAMENTE FORMATEADO Y REDONDEADO -->
									                <v-list-item-subtitle>
									              		$ {{ formatPrice(Math.ceil(item.variant.finalPrice)) }}
									                </v-list-item-subtitle>
									            </v-list-item-content>

												<!-- SECCIÓN DE ACCIONES EN DONDE SE PUEDE VER LA CANTIDAD DEL PRODUCTO A COMPRAR Y UNA OPCIÓN PARA ELIMINAR DEL CARRO DE COMPRAS -->
									            <v-list-item-action>

									            	<!-- CANTIDAD QUE SE QUIERE COMPRAR DEL PRODUCTO -->
									                <v-chip
												        class="ma-2"
												        color="success"
												        outlined
												        pill
												        >
												        Cantidad {{ item.variant.id }}
												      	<v-icon right>mdi-cart-outline</v-icon>
												    </v-chip>
												    
												    <!-- BOTÓN PARA ELIMINAR DEL CARRO DE COMPRAS AL PRODUCTO -->
												    <v-btn class="ma-2" outlined color="error">
				  								        <v-icon>mdi-delete</v-icon>
											    	</v-btn>

									            </v-list-item-action>
									        </v-list-item>
											
								          	<v-divider
									            v-else-if="item.divider"
									            :key="index"
									            :inset="inset"
								            	>
								            </v-divider>
								        </template>
								      </v-list>
			        			</v-card>
			        		</v-flex>
			        	</v-layout>
			        </v-container>
			        <!-- END CONTAINER -->

			        <!-- CARD CON BOTONES -->
			        <v-card-actions>
				        <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
				        <v-btn color="green darken-1" text @click="dialog = false">Solicitar</v-btn>
			        </v-card-actions>
			        <!-- END CARD -->
			    </v-card>
		    </v-dialog>

		</div>

	</div>

</template>

<script>
	
	import axios from 'axios'
	import Vue from 'vue'
	import Vuex from 'vuex'
	import Carro from './Carro';

	Vue.use(Vuex)

	/* SE GENERA UNA NUEVA INSTANCIA DE VUEX.STORE PARA INCREMENTAR EL NÚMERO DE PRODUCTOS EN CARRO */
	const store = new Vuex.Store({
	  state: {
	    cantidad: 0
	  },
	  mutations: {
	    increment (state) {
	      state.cantidad++
	    }
	  }
	})

	/* FILTRO PARA LIMPIAR CADENAS DE TEXTO ANTES DE REDERIZARLAS */
	Vue.filter('striphtml', function (value) {
	  var div = document.createElement("div");
	  div.innerHTML = value;
	  var text = div.textContent || div.innerText || "";
	  return text;
	});

	export default {
		name: 'CardCarro',
		data () {
			return {
			    licores: [],
			    store:store,
			    dialog: false,
			}
		},

 	    components: {
	    	Carro
	    },

		mounted() {
			/* EN MOUNTED SE CARGAN TODOS LOS PRODUCTOS EN CADA INICIO O REINICIO DE LA PAGUINA */
			let vue = this;

			/* CONEXIÓN A API ENVIARDO LA UR Y HEADERS CON ACCESOS DE AUTORIZACIÓN */
			axios.get(
				'http://ec2-54-183-147-121.us-west-1.compute.amazonaws.com:8383/v2/markets/1/collection/2/market_info.json',
				{
				headers: {
				    access_token: '22636ca690d932cc523065f4b3dea68ed3184bdb'
				  }
				}
			).then( function( response ) {
				vue.licores = response.data.data;
			})
			.catch( function( error ) {
				console.log('Error: ', error);
			})
		},

		computed: {
			cartAmount() {
				return this.cart.length
			},
		},

		methods: {

			/* MÉTODO PARA FORMATEAR LOS NÚMEROS A RENDERIZAR EN EL COMPONENTE */
			formatPrice(value) {
		        let val = (value/1).toFixed(0).replace('.', ',')
		        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		    },

		}

	}
</script>