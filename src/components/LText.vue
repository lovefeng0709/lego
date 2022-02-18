<template>
  <component :is="tag" :style="styleProps" class="l-text-component">{{text}}</component>
</template>

<script lang="ts">
import { callWithErrorHandling, computed, defineComponent } from "vue"
import { pick } from "lodash-es"
import { transformToComponentProps, textDefaultProps, textStylePropNames } from '../defaultProps'
const defaultProps = transformToComponentProps(textDefaultProps)
console.log(defaultProps)
export default defineComponent({
  props:{
    tag:{
      type: String,
      default: 'div'
    },
    ...defaultProps
  },
  setup (props) {
    const styleProps = computed(()=>pick(props,textStylePropNames))
    return {
      styleProps
    }
  }
})
</script>

<style scoped>
h2.l-text-component, p.l-text-component {
  margin-bottom: 0;
}
button.l-text-component {
  padding: 5px 10px;
  cursor: pointer;
}
.l-text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important;
}
</style>