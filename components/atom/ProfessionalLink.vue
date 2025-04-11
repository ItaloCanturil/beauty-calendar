<script lang="ts" setup>
  const { profile } = useProfileStore();
  const { copy, copied } = useClipboard();

  const profileId = computed(() => profile?.id);
  const link = ref('');
  const fomartLink = computed(() => link.value + profileId.value)

  onMounted(() => {
    link.value = `${window.origin}/available/`
  })
</script>

<template>
  <div class="flex items-center justify-between gap-2 bg-white w-full p-2 rounded-lg">
    <InputText type="text" v-model="fomartLink" filled readonly />

    <Button :label="copied ? 'Copiado' : 'Copiar link'" :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
      @click="copy(fomartLink)" />
  </div>
</template>