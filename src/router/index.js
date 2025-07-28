import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'repositories',
      component: () => import('../views/RepositoriesView.vue'), 
    },

    {
      path: '/aboutStare',
      name: 'aboutStare',
      component: () => import('../views/AboutStareView.vue'),
      
    },

    {
      path: '/staticObservable',
      name: 'staticObservable',
      component: () => import('../views/demoObservableStatic.vue'),
      
    },

    {
      path: '/singup',
      name: 'signup',
      component: () => import('../views/UserSignupView.vue'),
      meta: { hideNavbar: true },
    },

    {
      path: '/user/:userID',
      name: 'userProfile',
      component: () => import('../views/UserProfileView.vue'),
      props: true
    },


    {
      path: '/user/:userID/edit',
      name: 'editUser',
      component: () => import('../views/UserEditView.vue'),
      props: true,
      meta: { hideNavbar: true },
    },

    {
      path: '/repository/repositoryCreate',
      name: 'repositoryCreate',
      component: () => import('../views/RepositoryCreateView.vue'),
      meta: { hideNavbar: true },
    },

    {
      path: '/repository/:repositoryID',
      name: 'repositoryDetails',
      component: () => import('../views/RepositoryDetailedView.vue'),
      props: true
    },


    {
      path: '/repository/:repositoryID/edit',
      name: 'editRepository',
      component: () => import('../views/RepositoryEditView.vue'),
      props: true,
      meta: { hideNavbar: true },
    },

    {
      path: '/sandbox/:releaseID',
      name: 'sandbox',
      component: () => import('../views/ReleaseCodeSandboxView.vue'),
      props: true
    },

    {
      path: '/verification/:releaseID',
      name: 'verification',
      component: () => import('../views/ReleaseVerificationView.vue'),
      props: true
    },

    {
      path: '/testDrive',
      name: 'testDrive',
      component: () => import('../views/TestDriveView.vue'),
    },

  ]
})

export default router
