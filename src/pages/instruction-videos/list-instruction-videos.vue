<template>
  <q-page padding>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2>Instruction Videos</h2>
    </q-card>
    <q-card
      >
      
       <q-btn color="secondary" label="Add Video" to="/videos/add-instruction-video" class="q-ma-xl"/>
      </q-card>
  </q-page>
</template>

<script>
export default {
 data() {
    return {
        dataStore: {
        name: "",
        updated: "",
        url:"",
        tags:[]
    }}
}}
</script>

<style></style>