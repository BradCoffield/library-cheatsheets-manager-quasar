<template>
  <q-page padding>
    <page-heading text="Primo Books"></page-heading>

    <q-card
      class="q-pl-md q-pt-sm q-pb-sm bg-dark q-mb-xl q-mt-xl text-primary  "
    >
      <h4 class="q-ma-xs">Cache New Search</h4>
    </q-card>
    <q-card dark
      ><q-input
        label="Search Term(s)"
        v-model="cacheNewSearch_PrimoBooks.value"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
      <div class="row">
        <div class="col">
          <q-select
            dark
            v-model="cacheNewSearch_PrimoBooks.precision"
            :options="booksPrecision"
            label="Precision"
            bg-color="accent"
            class="q-ma-md"
          />
        </div>
        <div class="col">
          <q-select
            dark
            v-model="cacheNewSearch_PrimoBooks.field"
            :options="booksField"
            label="Field"
            bg-color="accent"
            class="q-ma-md"
          />
        </div>
      </div>
      <q-btn
        flat
        label="Cache Search"
        style="background: #FF0080; color: white"
        class="q-ma-sm"
        v-close-popup
        @click="cacheSearch(cacheNewSearch_PrimoBooks)"
      />
    </q-card>
  </q-page>
</template>

<script>
import ApiTableWrap from "components/api-searches/ApiSearchTableWrapper";
import PageHeading from "components/PageHeading";
export default {
  components: { ApiTableWrap, PageHeading },
  data() {
    return {
      cacheNewSearch_PrimoBooks: {
        field: "",
        precision: "",
        value: ""
      },
      booksPrecision: ["exact", "begins_with", "contains"],
      booksPrecisionChosen: null,
      booksField: ["any", "title", "creator", "sub"],
      booksFieldChosen: null,
      processedName: "",
      data: []
    };
  },
  methods: {
    cacheSearch(optionsObject) {
      console.log("hi", "OPTIONSOBJECT=", optionsObject);
      const urlBase = "https://rmc-proxy-server.herokuapp.com/api";
      const field = optionsObject.field;
      const precision = optionsObject.precision;
      const value = optionsObject.value;
      const fulltext = optionsObject.fulltext || false;
      const scholarly = optionsObject.scholarly;
      const daterange = optionsObject.daterange;

      runCache(
        `${urlBase}/cache-primo-book-search/${field}/${precision}/${value}`
      );

      function runCache(url) {
        console.log("yayay");
        fetch(url)
          .then(res => res.text())
          .then(function(body) {
            console.log(body, "eh!");
          });
      }
    }
  }
};
</script>

<style></style>
