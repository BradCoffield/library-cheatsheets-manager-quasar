<template>
  <q-page padding>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2>API Searches</h2>
    </q-card>
    <div class="text-h4 q-mb-md">Introduction</div>
    <p class="text-body1">
      On any cheatsheet you can display search results from various providers.
    </p>
    <p class="text-body1">
      First, you need to cache a search for the service. Then, you will, at the
      cheatsheet level, associate that search with that cheatsheet. Currently
      you may only associate one search per provider per cheatsheet.
    </p>
    <p class="text-body1">
      These help highlight relevant search providers while also giving them some
      idea, even if your topic isn't their topic, of the types of things they
      can expect from the service.
    </p>
    <div class="text-h4 q-mb-md">Available Services</div>
    <ul class="text-body1" style="list-style-type:none;padding-left:10px">
      <li class="q-mb-md">
        <q-btn
          to="/api-searches/primo-books"
          label="Primo Books"
          outline
          color="dark"
        /> 
      </li>
      <li class="q-mb-md">
        <q-btn
          to="/api-searches/primo-articles"
          label="Primo Articles"
          outline
          color="dark"
        /> 
         
      </li>
      <li class="q-mb-md">
        <q-btn
          to="/api-searches/ebsco-asc"
          label="EBSCO - Academic Search Complete"
          outline
          color="dark"
        /> 
        
      </li>
    </ul>
  </q-page>
</template>

<script>
import ApiTableWrap from "components/api-searches/ApiSearchTableWrapper";
export default {
  components: { ApiTableWrap },
  data() {
    return {
      tab: "home",
      splitterModel: 20
    };
  }
};
</script>

<style></style>
