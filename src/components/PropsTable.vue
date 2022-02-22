<template>
  <div class="props-table">
    <div v-for="(item,index) in finalProps" :key="index"  class="prop-item">
      <component :is="item?.component" :value="item?.value" ></component>
    </div>
    <pre>{{props}}</pre>
  </div>
</template>

<script lang="ts">
import { TextComponentProps } from "@/defaultProps"
import { mapPropsToForms, PropsToForms } from "@/propsMap"
import { reduce } from "lodash-es"
import { computed, defineComponent, PropType } from "vue"
export default defineComponent({
  name: 'props-table',
  props:{
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true
    }
  },
  setup (props) {
    const finalProps = computed(()=>{
      return reduce(props.props, function(result, value, key) {
      const newKey = key as keyof TextComponentProps
        const item = mapPropsToForms[newKey]
        if (item) {
          item.value = value
          result[newKey] = item
        }
        return result
      },  {} as PropsToForms)
    })

    return {
      finalProps
    }
  }
})
</script>

<style  scoped>

</style>