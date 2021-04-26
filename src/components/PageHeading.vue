<template>
   <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2>{{text}}</h2>
    </q-card>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }, 
 
  },
}
</script>

<style>

</style>