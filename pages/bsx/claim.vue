<template>
  <ClaimForm />
</template>

<script lang="ts">
export default {
  name: 'ClaimPage',
  components: {
    ClaimForm: () => import('@/components/poap/claim/ClaimForm.vue'),
  },
  layout() {
    return 'centered-half-layout'
  },
  head() {
    const title = 'Claim'
    const metaData = {
      title,
      type: 'article',
      description: 'Create carbonless NFTs with low on-chain fees',
      url: '/claim',
      image: `${this.$config.public.baseUrl}/k_card_mint.png`,
    }
    return {
      title,
      meta: [...this.$seoMeta(metaData)],
    }
  },
}
</script>
