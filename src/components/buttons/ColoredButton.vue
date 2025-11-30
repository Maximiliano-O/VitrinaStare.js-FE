<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import UserIcon from '../UserIcon.vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  onClick: {
    type: Function,
    default: () => {},
  },
  iconName: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'black',
  },
  to: {
    type: [String, Object],
    default: null,
  },
  useRouterLink: {
    type: Boolean,
    default: true,
  },
})

const isLink = computed(() => !!props.to)
const isRouterLink = computed(() =>
  props.useRouterLink && (typeof props.to === 'string' || typeof props.to === 'object')
)
const componentTag = computed(() => {
  if (!props.to) return 'button'

  // If it's a full URL (starts with http or https), use <a>
  if (typeof props.to === 'string' && /^https?:\/\//.test(props.to)) {
    return 'a'
  }

  // Otherwise, assume it's an internal route
  return props.useRouterLink ? 'router-link' : 'a'
})

const route = useRoute()

const isActive = computed(() => {
  if (!isRouterLink.value) return false
  // Handle if `to` is a string or object
  if (typeof props.to === 'string') {
    return route.path === props.to
  } else if (typeof props.to === 'object' && props.to.name) {
    return route.name === props.to.name
  }
  return false
})

function handleClick(event) {
  if (!isLink.value) {
    props.onClick(event)
  }
}
</script>

<template>
  <component
    :is="componentTag"
    class="base-button"
    :class="variant"
    :type="componentTag === 'button' ? type : undefined"
    :href="componentTag === 'a' ? to : undefined"
    :target="componentTag === 'a' ? '_blank' : undefined"
    :rel="componentTag === 'a' ? 'noopener noreferrer' : undefined"
    :to="componentTag === 'router-link' ? to : undefined"
    :active-class="componentTag === 'router-link' ? 'active' : undefined"
    @click="handleClick"
  >
    <UserIcon
      :imageUrl="imageUrl"
      :iconName="iconName"
    />
    <slot />
  </component>
</template>

<style scoped>
.base-button {
  display: flex;
  justify-content: center;
  padding: 10px;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Poppins-SemiBold', sans-serif;
  font-size: 20px;
  text-decoration: none;
  transition: background-color 0.2s;
  align-items: center;
  gap: 10px;
  height: 46px;
  white-space: nowrap;
}

/* Variant Styles by color*/

.wine {
  background-color: #702F5A;
}

.wine:hover {
  background-color: #A7538B;
}

.wine:active {
  background-color: #D49FC2;
  color: #000;
}

.night {
  background-color: #382F70;
}

.night:hover {
  background-color: #5F53AF;
}

.night:active {
  background-color: #AEA7D9;
  color: #000;
}

.black {
  background-color: #000000;
  color: #fff;
}

.black:hover {
  background-color: #565656;
  color: #fff;
}

.black:active {
  background-color: #F5F5F5;
  color: #000;
}

.white {
  background-color: #fff;
  color: #000;
}

.white:hover {
  background-color: #B2B2B2;
  color: #000;
}

.white:active {
  background-color: #3C3C3C;
  color: #fff;
}

.transparent {
  background-color: #ffffff00;
}

.transparent:hover {
  box-shadow: inset 0 -5px 0 0 #ffffff75;
}

.transparent:active {
  box-shadow: inset 0 -5px 0 0 #ffffff;
}

.base-button.transparent.active {
  box-shadow: inset 0 -5px 0 0 #ffffff;
}

.icon-button {
  border-radius: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
