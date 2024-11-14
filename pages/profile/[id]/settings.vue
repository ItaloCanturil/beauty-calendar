<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';

definePageMeta({
  middleware: 'auth',
  layout: 'admin'
});

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const serviceTime = ref(null);
const phoneNumber = ref<string>('');

const resolver = ref(zodResolver(
  z.object({
    phoneNumber: z.string().regex(phoneRegex, 'Número Inválido'),
  })
));

const onFormSubmit = ({ valid }: { valid: boolean }) => {
  if (valid) {
    /* TODO
      API Post to update the profile table
     */
  }
}
</script>

<template>
  <div class="h-full w-full">
    <Onboarding title="Configurações" guide=""/>

    <div class="mt-4">
      <Form v-slot="$form" :resolver="resolver" class="flex flex-col gap-2 items-center">
        <div class="flex-auto">
          <label for="serviceTime">Tempo de serviço</label>
          <DatePicker v-model="serviceTime" timeOnly fluid iconDisplay="input" showIcon icon="pi pi-clock"></DatePicker>
          <span class="text-xs text-gray-400">Em horas</span>
        </div>
        
        <div class="flex flex-col">
          <label for="phoneNumber">Número do WhatsApp</label>
          <InputMask v-model="phoneNumber" mask="99-999999999"/>
          <Message v-if="$form.phoneNumber?.invalid" serverity="error" size="small" variant="simple">{{ $form.phoneNUmber.message }}</Message>
        </div>


        <Button type="submit" severity="secondary" label="Confirmar" />
      </Form>
    </div>
  </div>
</template>