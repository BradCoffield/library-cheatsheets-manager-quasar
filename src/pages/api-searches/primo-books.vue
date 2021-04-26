<template>
  <q-page padding>
    <page-heading text="Primo Books"></page-heading>

    <q-card
      class="q-pl-md q-pt-sm q-pb-sm bg-dark q-mb-sm q-mt-xl text-primary  "
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
        label="Cache Search"
        color="secondary"
        class="q-ma-sm"
        v-close-popup
        @click="cacheSearch(cacheNewSearch_PrimoBooks)"
      />
    </q-card>
    <q-card
      class="q-pl-md q-pt-sm q-pb-sm bg-dark q-mb-sm q-mt-xl text-primary  "
    >
      <h4 class="q-ma-xs">Cached Searches</h4>
    </q-card>

    <table-of-searches name="primo-book-searches"></table-of-searches>
  </q-page>
</template>

<script>
import ApiTableWrap from "components/api-searches/ApiSearchTableWrapper";
import PageHeading from "components/PageHeading";
import listTable from "components/ListItemsTable";
import TableOfSearches from "components/api-searches/TableOfSearches";

export default {
  components: { ApiTableWrap, PageHeading, listTable, TableOfSearches },
  data() {
    return {
      loading: false,
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
      data: [],
      columns: [
        {
          label: "Search",
          name: "searchTerm",
          sortable: true,
          field: "searchTerm",
          align: "left",
          // classes: 'bg-accent ellipsis',
          style: "max-width: 150px"
          // headerClasses: 'bg-secondary text-bold text-black'
          // headerClasses: ' text-italic '
        },
        {
          name: "key",
          label: "Key",
          field: "key",
          sortable: true,
          align: "left"
        },
        {
          name: "resultsLength",
          label: "# of Results",
          field: "resultsLength",
          sortable: true,
          align: "left"
        },
        { name: "actions", label: "Actions", field: "", align: "center" }
      ]
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
  },
  created() {
    this.loading = true;
    this.$firestore
      .collection("primo-book-searches")
      .onSnapshot(querySnapshot => {
        this.data = [];
        querySnapshot.forEach(doc => {
          this.data.push({
            key: doc.id,
            searchTerm: doc.data().searchTerm,
            resultsLength: doc.data().results.length
          });
        });
        this.data.sort((a, b) => {
          let fa = a.searchTerm.toUpperCase(),
            fb = b.searchTerm.toUpperCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
        this.loading = false;
      });
  }
};
</script>

<style></style>
