<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Optional props in case a view needs extra data
const props = defineProps({
  title: String,
  parentName: String,
  parentLabel: String,
  repositoryID: String 
})

function go(to) {
  if (typeof to === 'string') {
    router.push({ name: to })
  } else {
    router.push(to) // In case an object for navigation is used
  }
}

const crumbs = computed(() => {
  const name = route.name

  switch (name) {
    case 'repositoryDetails':
      return [
        { label: 'Repositorios', to: 'repositories' },
        { label: `Repositorio detallado: ${props.title || 'Detalle'}` }
      ]

    case 'aboutStare':
      return [
        { label: 'Repositorios', to: 'repositories' },
        { label: 'Sobre Stare.js' }
      ]

    case 'sandbox':
        return [
            { label: 'Repositorios', to: 'repositories' },
            {
                label: props.parentLabel,
                to: { name: 'repositoryDetails', params: { repositoryID: props.repositoryID } }
            },
            { label: `Demo: ${props.title || ''}` }
        ]

    case 'userProfile':
      return [
        { label: 'Repositorios', to: 'repositories' },
        { label: `Perfil de usuario: ${props.title}` }
      ]
    
    case 'testDrive':
        return [
        { label: 'Repositorios', to: 'repositories' },
        { label: 'Test Drive'}
        ]

    default:
      return null
  }
})
</script>

<template>
  <div v-if="crumbs" class="breadcrumbs">
    <span
      v-for="(c, i) in crumbs"
      :key="c.to ? c.to + c.label : c.label"
      class="crumb"
      @click="c.to && go(c.to)"
      :class="{ link: !!c.to }"
    >
      {{ c.label }}
    </span>
  </div>
</template>

<style scoped>
.breadcrumbs {
  font-size: 14px;
  margin-left: 15px;
  user-select: none;
  color: #444;
  display: flex;
  flex-wrap: wrap;
  font-family: 'Poppins-SemiBold';

}

.crumb.link {
  cursor: pointer;
}

.crumb {
  position: relative;
  display: inline-flex;
  align-items: center;
}

/* Adds the separator automatically */
.crumb:not(:last-child)::after {
  content: "/";
  margin: 0 6px; /* Spacing control */
  opacity: 0.9;
}
</style>
