<template>
	<!-- INICIO DE CONTAINER PRINCIPAL CON LOS PRODUCTOS -->
    <v-container fluid ma-0 pa-10 mb-10 grid-list-xl>
    	<!-- CREACIÓN DE LAYOUT PARA CARD CON MENSAJE Y BOTÓN AL CARRO DE COMPRAS -->
		<v-layout>
			<v-flex>
				<!-- CARD PRINCIPAL -->
	    		<v-card
					color="accent"
				    class="fixed-top d-flex pa-6"
				    shaped
				  >
			
		    		<h3 class="text-center white pa-4">
		    			Bienvenido a BSALE Distribuidora
		    		</h3>
					
				</v-card>
				<!-- END CARD -->		
			</v-flex>
		</v-layout>
		<!-- END LAYOUT -->

		<!-- CREACIÓN ROW CON BUSCADOR DE PRODUCTOS -->
    	<v-row>
			<div class="text-center pa-6" xs="12" sm="6" lg="6" xl="6">
				<!-- BOTON PARA BUSCAR PRODUCTOS POR NOMBRE CON EL EVENTO @CLICK-->
  		        <v-btn rounded color="primary"
					v-on:click="buscarLicor">
					<v-icon>mdi-magnify</v-icon>
					Buscar productos
				</v-btn>
				<!-- END BTN -->
		    </div>
			<v-col cols="12" xs="12" sm="8" lg="8" xl="8">
				<!-- CAMPO DE TEXTO PARA ESCRIBIR EL NOMBRE A BUSCAR, SE BUSCA TAMBIÉN AL PRESIONAR EL BOTON ENTER -->
				<v-text-field
					:rules="rules"
					v-model="search"
		            label="Ingresar nombre"
		            v-on:keyup.enter="buscarLicor">
	            </v-text-field>
				<!-- END CAMPO DE TEXTO -->
	        </v-col>
    	</v-row>
		<!-- END ROW -->
		
		<v-col cols="12">
			<ListaProductos />
		</v-col>

		<!-- CREACIÓN LAYOUT CON PRODUICTOS -->
		<v-layout row wrap>

			<!-- SE GENERA UNA ETIQUETA V-FLEX PARA EL USO DE GRILLAS DE DISEÑO RESPONSIVE LA CUAL SE RECORRE POR CADA PRODUCTO A MOSTRAR -->
			<v-flex 
			    v-for="card in licores"
		        :key="card.variant.id"
		        :unitValue="card.variant.finalPrice"
		        :cols="3"
		        xs12 sm6 md4 lg3
		        >

		        <!-- ESQUELETO PRINCIPAL DEL PRODUCTO -->
				<v-card 
		        	color="accent"
				    shaped
				 	>
				    <v-list-item>
				      <v-list-item-content>
				      	<!-- TITULO DEL PRODUCTO, SE LIMPIA LA CADENA DE TEXTO AL MOMENTO DE SER RENDERIZADA -->
				        <v-list-item-title><h3>{{ card.name | striphtml }}</h3></v-list-item-title>
				      </v-list-item-content>
				    </v-list-item>
					
					<!-- IMAGEN DEL PRODUCTO, SE VALIDA QUE EXISTA LA URL DE LA IMAGEN, SI NO EXISTE SE MUESTRA UNA IMAGEN ALEATOREA -->
				    <v-img
				      :src=" card.urlImg ? card.urlImg : 'https://picsum.photos/200/300?grayscale' "
				      height="400"
				    ></v-img>
					
					<!-- DESCRIPCIÓN DEL PRODUCTO -->
				    <v-card-text>
				    	<h3>
				      		{{ card.description | striphtml }}
				    	</h3>
				    </v-card-text>

					<!-- VALOR DEL PRODUCTO EL CUAL ES FORMATEADO Y REDONDEADO -->
				    <v-card-subtitle>
				    	<p>
				    		{{ card.variant.description ? card.variant.description : 'Sin descripción.' }}
				    	</p>
					    <span>
						    Valor unitario: $ {{ formatPrice(Math.ceil(card.variant.finalPrice)) }}
					    </span>
				    </v-card-subtitle>
					
					<!-- El stock no está implementado -->
				    <v-btn class="ma-2" outlined color="error">Stock disponible 0</v-btn>

					<!-- SECCIÓN DE BOTONES Y ACCIONES EN EL CARD -->
				    <v-card-actions>				      

						<!-- BOTÓN ME GUSTA -->
				      	<v-tooltip bottom>
					      <template v-slot:activator="{ on, attrs }">
					        <v-btn icon
					        	color="red"
					            dark
					            v-bind="attrs"
					            v-on="on"
					          >
				                <v-icon>mdi-heart</v-icon>
				              </v-btn>
					      </template>
					      <span>Me gusta</span>
					    </v-tooltip>

						<!-- BOTON PARA AGREGAR AL CARRO DE COMPRAS -->
					    <v-tooltip bottom>
					      	<template v-slot:activator="{ on, attrs }">
						      	<!-- SE UTILIZA EL EVENTO CLICK PARA OBTENER Y GUARDAR LOS DATOS EN UN STORAGE -->
						        <v-btn icon
						        	color="success"
						            dark
						            v-bind="attrs"
						            v-on="on"
						            v-on:click="agregarProducto"
						            >
					                <v-icon>mdi-cart-plus</v-icon>
					            </v-btn>
					        </template>
					    <span>Agregar al carro</span>
					    </v-tooltip>
						<!-- END BTN CARRO DE COMPRAS -->
				    </v-card-actions>
				</v-card>
				<!-- END CARD -->
			</v-flex>

		</v-layout>

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


    </v-container>

</template>

<script>


import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

import ListaProductos from "../components/ListaProductos";

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

/* PARA DISPONER LOS DATOS DE COMPONENTES EXTERNAMENTE */
export default {
	name: 'Inicio',
	data() {
		return {
			licores: [],
			cart: [],
			search: "",
			rules: [
		        value => !!value || 'Campo requerido.',
		        value => (value && value.length >= 1) || 'Min 1 characters',
		    ],
			store:store,
		    isActive: true,
	    	hasError: false,
	    	dialog: false
		}
	},

	components: {
		ListaProductos,
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

		/* MÉTODO UTILIZADO PARA TRAER LOS PRODUCTOS POR EL NOMBRE, SE ENVÍA A TRAVÉS DEL PARAMETRO search_text HACIA LA API PARA OBTENER LAS COINCIDENCIAS */
		fetch() {
			/* SE GUARDA LA INSTANCIA DE VUEJS EN VUE ANTES DE OBTENER LA INSTANCIA DE AXIOS */
			let vue = this;

			/* CONEXIÓN A API ENVIANDO HEADERS DE AUTENTICACIÓN Y PARAMS PARA LA BUSQUEDA DE PRODUCTOS */
			axios.get(
			'http://ec2-54-183-147-121.us-west-1.compute.amazonaws.com:8383/v2/markets/1/collection/2/market_info.json',
			{
			headers: {
			    access_token: '22636ca690d932cc523065f4b3dea68ed3184bdb',
			  },
			params: {
			    search_text: this.search,
  			  }
			}
			).then( function( response ) {
				/* SE RETORNAN LOS PRODUCTOS ENCONTRADOS */
				vue.licores = response.data.data;
			})
			.catch( function( error ) {
				console.log('Error: ', error);
			})

		},

		/* MÉTODO PARA BUSCAR LOS LICORES POR EL NOMBRE */
		buscarLicor() {
			this.fetch();
		},

		agregarProducto:  function() {
			store.commit('increment')
		},

		/* MÉTODO PARA FORMATEAR LOS NÚMEROS A RENDERIZAR EN EL COMPONENTE */
		formatPrice(value) {
	        let val = (value/1).toFixed(0).replace('.', ',')
	        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
	    }
	}
}


</script>
