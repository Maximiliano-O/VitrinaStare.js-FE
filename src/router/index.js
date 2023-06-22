import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
 
  
    {
      path: '/clientes',
      name: 'clientes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/VistaRepos.vue')
    },

    {
      path: '/repos/registrarRepositorio',
      name: 'registrarRepositorio',
      component: () => import('../views/VistaRegistrarRepo.vue')
    },
    {
      path: '/contribuidores',
      name: 'contribuidores',
      component: () => import('../views/VistaContribuidores.vue'),
    },

    {
      path: '/contribuidores/:userID',
      name: 'detalleContribuidor',
      component: () => import('../views/VistaDetalleUsuario.vue'),
      props: true
    },

    {
      path: '/',
      name: 'repos',
      component: () => import('../views/VistaRepos.vue'),
      
      
    },

    {
      path: '/repos/:repositoryID',
      name: 'detalleRepo',
      component: () => import('../views/VistaDetalleRepo.vue'),
      props: true
    },


    
    {
      path: '/contribuciones',
      name: 'contribuciones',
      component: () => import('../views/VistaContribuciones.vue'),
      
      
    },

    {
      path: '/ejemplo',
      name: 'ejemplo',
      component: () => import('../views/Ejemplo.vue'),
      
      
    },

    {
      path: '/registrarse',
      name: 'registrarse',
      component: () => import('../views/VistaRegistrarse.vue'),
      
      
    }
  ]
})

export default router
