<template>
  <NeoField grouped>
    <NeoButton
      v-if="!disabled"
      no-shadow
      size="medium"
      icon-left="times"
      @click.native="remove" />
    <NeoInput
      v-model="vKey"
      placeholder="Section"
      expanded
      :disabled="disabled"
      spellcheck="true" />
    <NeoInput
      v-model="vValue"
      placeholder="Value"
      expanded
      spellcheck="true"
      :disabled="disabled" />
  </NeoField>
</template>

<script setup lang="ts">
import { NeoButton, NeoField, NeoInput } from '@kodadot1/brick'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  index: Number,
  disabled: Boolean,
  trait_type: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Number],
    default: '',
  },
})

const emit = defineEmits(['remove', 'update:trait_type', 'update:value'])

const vKey = useVModel(props, 'trait_type', emit)

const vValue = useVModel(props, 'value', emit)

const remove = () => {
  emit('remove', props.index)
}
</script>
