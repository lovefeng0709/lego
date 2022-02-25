<template>
  <div class="props-table">
    <div v-for="(item,index) in finalProps" :key="index"  class="prop-item">
      <span class="label" v-if="item.text">{{item.text}}</span>
      <div class="prop-component">
        <component :is="item.component" :[item.valueProp]="item.value" v-bind="item.extraProps" v-on="item.events">
          <template v-if="item.options">
            <component :is="item.subComponent" v-for="(v,index) in item.options" :value="v.value"  :key="index" >{{v.text}}</component>
          </template>
        </component>
      </div>
      
    </div>
   
  </div>
</template>

<script lang="ts">
import { TextComponentProps } from "@/defaultProps"
import { mapPropsToForms } from "@/propsMap"
import { reduce } from "lodash-es"
import { computed, defineComponent, PropType, VNode } from "vue"
interface FormProps {
  component: string;
  subComponent?: string;
  value: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string | VNode; value: any }[];
  valueProp: string;
  eventName: string;
  events: { [key: string]: (e: any) => void };
}
export default defineComponent({
  name: 'props-table',
  props:{
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true
    }
  },
  emits: ['change'],
  setup (props,context) {
    const finalProps = computed(()=>{
      return reduce(props.props, function(result, value, key) {
      const newKey = key as keyof TextComponentProps
        const item = mapPropsToForms[newKey]
        if (item) {
         const { valueProp = 'value', eventName = 'change', initalTransform, afterTransform } = item
          const newItem: FormProps = {
            ...item,
            value: initalTransform ? initalTransform(value) : value,
            valueProp,
            eventName,
            events: {
              [eventName]: (e: any) => { context.emit('change', { key, value: afterTransform? afterTransform(e) : e  })}
            }
         }
          result[newKey] = newItem
        }
        return result
      }, {} as { [key: string]: FormProps })
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