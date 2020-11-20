<template>
  <q-page padding>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary  ">
      <h3>{{displayname}}</h3>
    </q-card>
    
    <table-of-searches :name="tablename"></table-of-searches>
 
  </q-page>
</template>

<script>
import TableOfSearches from "./TableOfSearches";
 
export default {
  components: { TableOfSearches },
  props: {
    displayname: {
      type: String,
      required: true
    },
    tablename: {
      type: String,
      required: true
    }},
  data() {
    return {
      tab: "home",
      splitterModel: 20,
   
    };
  }
};
</script>

<style></style>
