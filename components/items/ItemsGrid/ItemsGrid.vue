<template>
  <div class="is-flex-grow-1">
    <LoadPreviousPage
      v-if="startPage > 1 && !isLoading && total > 0"
      @click="reachTopHandler" />

    <DynamicGrid
      v-if="total !== 0 && !isLoading"
      :id="scrollContainerId"
      v-slot="slotProps"
      class="my-5">
      <div
        v-for="(nft, index) in nfts"
        :key="`${nft.id}=${index}`"
        :data-cy="index"
        :class="scrollItemClassName">
        <ItemsGridImage
          :nft="nft"
          :variant="
            (slotProps.isMobileVariant || slotProps.grid === 'small') &&
            'minimal'
          " />
      </div>
    </DynamicGrid>

    <DynamicGrid
      v-else-if="isLoading"
      :id="scrollContainerId"
      v-slot="slotProps"
      class="my-5">
      <NeoNftCard
        v-for="n in skeletonCount"
        :key="n"
        is-loading
        :variant="
          (slotProps.isMobileVariant || slotProps.grid === 'small') && 'minimal'
        " />
    </DynamicGrid>

    <EmptyResult v-else />
    <ScrollTopButton />
  </div>
</template>

<script setup lang="ts">
import { NeoNftCard } from '@kodadot1/brick'
import DynamicGrid from '@/components/shared/DynamicGrid.vue'
import ItemsGridImage from './ItemsGridImage.vue'
import { useFetchSearch } from './useItemsGrid'
import isEqual from 'lodash/isEqual'

const route = useRoute()
const props = defineProps<{
  search?: Record<string, string | number>
}>()

const emit = defineEmits(['total', 'loading'])

const isLoading = ref(true)
const gotoPage = (page: number) => {
  currentPage.value = page
  startPage.value = page
  endPage.value = page
  nfts.value = []
  isFetchingData.value = false
  isLoading.value = true

  fetchSearch({ page, search: parseSearch(props.search) })
}
const fetchPageData = async (page: number, loadDirection) => {
  return await fetchSearch({
    page,
    loadDirection,
    search: parseSearch(props.search),
  })
}
const {
  first,
  total,
  startPage,
  endPage,
  currentPage,
  scrollItemClassName,
  isFetchingData,
  scrollContainerId,
  reachTopHandler,
  prefetchNextPage,
} = useListInfiniteScroll({
  gotoPage,
  fetchPageData,
})

const skeletonCount = first.value

const resetPage = useDebounceFn(() => {
  gotoPage(1)
}, 500)

const { nfts, fetchSearch, refetch } = useFetchSearch({
  first,
  total,
  isFetchingData,
  isLoading,
  resetSearch: resetPage,
})

watch(total, () => {
  prefetchNextPage()
  emit('total', total.value)
})

watch(isLoading, () => {
  emit('loading', isLoading.value)
})

const parseSearch = (
  search?: Record<string, string | number>
): Record<string, string | number>[] =>
  Object.entries(search || {}).map(([key, value]) => ({ [key]: value }))

watch(
  () => props.search,
  (newSearch, oldSearch) => {
    if (newSearch === undefined || oldSearch === undefined) {
      return
    }
    if (!isEqual(newSearch, oldSearch)) {
      isLoading.value = true
      refetch(parseSearch(props.search))
    }
  },
  { deep: true }
)

watch(
  () => route.query.sort,
  () => {
    refetch(parseSearch(props.search))
  }
)

onBeforeMount(async () => {
  await fetchSearch({
    page: startPage.value,
    search: parseSearch(props.search),
  })
  isLoading.value = false
})
</script>
