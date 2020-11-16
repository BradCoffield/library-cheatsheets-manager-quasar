<template>
  <q-page padding>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary  ">
      <h3>EBSCO / Academic Search Complete</h3>
    </q-card>
    <table-of-searches name="ebsco-searches"></table-of-searches>
 
  </q-page>
</template>

<script>
import TableOfSearches from "./TableOfSearches";
 
export default {
  components: { TableOfSearches },
  data() {
    return {
      tab: "home",
      splitterModel: 20,
   
    };
  }
};
</script>

<style></style>
