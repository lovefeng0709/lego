<template>
  <div class="props-table">
    <div v-for="(item,index) in finalProps" :key="index"  class="prop-item">
      <span class="label" v-if="item.text">{{item.text}}</span>
      <div class="prop-component">
        <component :is="item.component" :value="item.value" v-bind="item.extraProps">
          <template v-if="item.options">
            <component :is="item.subComponent" v-for="(v,index) in item.options" :value="v.value" :key="index" >{{v.text}}</component>
          </template>
        </component>
      </div>
      
    </div>
   
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
          item.value = item.initalTransform ? item.initalTransform(value) : value
          result[newKey] = item
        }
        return result
      },  {} as Required<PropsToForms>)
    })

    return {
      finalProps
    }
  }
})
</script>

<style  scoped>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
.label {
  width: 28%;
}
.prop-component {
  width: 70%;
}
</style>