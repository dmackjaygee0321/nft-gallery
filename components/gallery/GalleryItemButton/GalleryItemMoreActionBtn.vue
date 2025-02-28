<template>
  <div>
    <Loader v-model="isLoading" :status="status" />
    <NeoDropdown position="bottom-left" :mobile-modal="false">
      <template #trigger="{ active }">
        <NeoButton
          class="icon-action"
          icon="ellipsis-vertical"
          :active="active" />
      </template>

      <NeoDropdownItem
        v-if="mimeType?.includes('image') && ipfsImage"
        @click="downloadMedia">
        Download
      </NeoDropdownItem>
      <template v-if="accountId === currentOwner">
        <NeoDropdownItem @click="burn">Burn</NeoDropdownItem>
        <NeoDropdownItem v-if="price !== '0'" @click="unlist">
          Delist
        </NeoDropdownItem>
      </template>
      <NeoDropdownItem disabled>Report</NeoDropdownItem>
    </NeoDropdown>
  </div>
</template>

<script setup lang="ts">
import { NeoButton, NeoDropdown, NeoDropdownItem } from '@kodadot1/brick'
import { Interaction } from '@kodadot1/minimark/v1'
import { downloadImage } from '@/utils/download'
import { toOriginalContentUrl } from '@/utils/ipfs'

const { $route, $i18n } = useNuxtApp()
const { accountId } = useAuth()
const { transaction, isLoading, status } = useTransaction()
const { urlPrefix } = usePrefix()

const props = defineProps<{
  mimeType?: string
  name?: string
  ipfsImage?: string
  currentOwner?: string
  price?: string
}>()

const downloadMedia = () => {
  props.ipfsImage &&
    downloadImage(toOriginalContentUrl(props.ipfsImage), props.name)
}

const burn = () => {
  transaction({
    interaction: Interaction.CONSUME,
    urlPrefix: urlPrefix.value,
    nftId: $route.params.id,
    successMessage: $i18n.t('transaction.consume.success') as string,
    errorMessage: $i18n.t('transaction.consume.error') as string,
  })
}

const unlist = () => {
  transaction({
    interaction: Interaction.LIST,
    urlPrefix: urlPrefix.value,
    nftId: $route.params.id,
    price: '0',
    successMessage: $i18n.t('transaction.unlist.success') as string,
    errorMessage: $i18n.t('transaction.unlist.error') as string,
  })
}
</script>
