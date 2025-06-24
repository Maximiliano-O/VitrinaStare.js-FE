import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/repos/registrarRepositorio',
      name: 'registrarRepositorio',
      component: () => import('../views/VistaRegistrarRepo.vue'),
      meta: { hideNavbar: true },
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
      path: '/contribuidores/:userID/edit',
      name: 'editarContribuidor',
      component: () => import('../views/VistaEditarUsuario.vue'),
      props: true,
      meta: { hideNavbar: true },
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
      path: '/repos/:repositoryID/edit',
      name: 'editarRepo',
      component: () => import('../views/VistaEditarRepo.vue'),
      props: true,
      meta: { hideNavbar: true },
    },

    {
      path: '/repos/:repositoryID/newRelease',
      name: 'newreleaseRepo',
      component: () => import('../views/VistaRegistrarRelease.vue'),
      props: true
    },

    {
      path: '/sandbox/:releaseID',
      name: 'sandbox',
      component: () => import('../views/VistaSandbox.vue'),
      props: true
    },

    {
      path: '/verificacion/:releaseID',
      name: 'verificacion',
      component: () => import('../views/VistaVerificacion.vue'),
      props: true
    },


    {
      path: '/registrarse',
      name: 'registrarse',
      component: () => import('../views/VistaRegistrarUsuario.vue'),
      meta: { hideNavbar: true },
    },

    {
      path: '/aboutStare',
      name: 'aboutStare',
      component: () => import('../views/VistaAboutStare.vue'),
      
    },

    {
      path: '/staticObservable',
      name: 'staticObservable',
      component: () => import('../views/demoObservableStatic.vue'),
      
    },

    {
      path: '/dynamicObservable',
      name: 'dynamicObservable',
      component: () => import('../views/demoObservableDynamic.vue'),
      
    }
  ]
})

export default router
