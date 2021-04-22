<template>
  <div>
  

    <template v-if="name == 'ebsco-searches'">
      
      <div>Cache New search</div>
      <q-card dark
        ><q-input
          label="Search Term(s)"
          v-model="cacheNewSearch_Ebsco.value"
          class="bg-dark text-white q-pa-md ch-input"
          dark
        ></q-input>
        <div class="row">
          <div class="col">
            <q-checkbox
              label="Full-text"
              v-model="cacheNewSearch_Ebsco.fulltext"
              color="dark"
              dark
            ></q-checkbox>
          </div>
          <div class="col">
            <q-checkbox
              label="Recent"
              v-model="cacheNewSearch_Ebsco.daterange"
              color="dark"
              dark
            ></q-checkbox>
          </div>
          <div class="col">
            <q-checkbox
              label="Scholarly"
              v-model="cacheNewSearch_Ebsco.scholarly"
              color="dark"
              dark
            ></q-checkbox>
          </div>
        </div>
         <q-btn
            flat
            label="Cache Search"
            style="background: #FF0080; color: white"
            class="q-ma-sm"
            v-close-popup
             @click="cacheSearch(name, cacheNewSearch_Ebsco)"
            
          />
      </q-card>
    </template>
    <template v-if="name == 'primo-article-searches'">
     <div>Cache New search</div>
      <q-card dark
        ><q-input
          label="Search Term(s)"
          v-model="cacheNewSearch_PrimoArticles.value"
          class="bg-dark text-white q-pa-md ch-input"
          dark
        ></q-input>
        <div class="row">
          <div class="col">
             dropdown with PRECISION options
             
          </div>
          <div class="col">
            dropdown with FIELD options
          </div>
          <div class="col">
            <q-checkbox
              label="Full-text"
              v-model="cacheNewSearch_PrimoArticles.fulltext"
              color="dark"
              dark
            ></q-checkbox>
          </div>
        </div>
         <q-btn
            flat
            label="Cache Search"
            style="background: #FF0080; color: white"
            class="q-ma-sm"
            v-close-popup
             @click="cacheSearch(name, cacheNewSearch_Ebsco)"
            
          />
      </q-card>
    </template>
    <template v-if="name == 'primo-book-searches'">
     
       <div>Cache New search</div>
      <q-card dark
        ><q-input
          label="Search Term(s)"
          v-model="cacheNewSearch_PrimoBooks.value"
          class="bg-dark text-white q-pa-md ch-input"
          dark
        ></q-input>
        <div class="row">
          <div class="col">
             <q-select v-model="cacheNewSearch_PrimoBooks.precision" :options="booksPrecision" label="Precision" bg-color="secondary" class="q-ma-md"/>
            
          </div>
          <div class="col">
             <q-select v-model="cacheNewSearch_PrimoBooks.field" :options="booksField" label="Field" bg-color="secondary" class="q-ma-md"/>
          </div>
   
        </div>
         <q-btn
            flat
            label="Cache Search"
            style="background: #FF0080; color: white"
            class="q-ma-sm"
            v-close-popup
             @click="cacheSearch(name, cacheNewSearch_Ebsco)"
            
          />
      </q-card>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      booksPrecision: ["exact", "begins_with", "contains"],
      booksPrecisionChosen: null,
      booksField:["any", "title", "creator", "sub"],
      booksFieldChosen:null,
      processedName: "",
      data: [],
      cacheNewSearch_Ebsco: {
        fulltext: false,
        daterange: false,
        scholarly: false,
        value: ""
      },
      cacheNewSearch_PrimoBooks: {
        field: "",
        precision: "",
        value: ""
      },
      cacheNewSearch_PrimoArticles: {
        field: "",
        precision: "",
        value: "",
        fulltext: false
      }
    };
  },
  created() {
    if (this.name === "ebsco-searches ")
      this.processedName = "EBSCO / Academic Search Complete";
    if (this.name === "primo-article-searches ")
      this.processedName = "Primo / Articles";
    if (this.name === "primo-book-searches ")
      this.processedName = "Primo / Books";
  },
  methods: {
    cacheSearch(target, optionsObject) {
      console.log("hi", "TARGET=", target, "OPTIONSOBJECT=", optionsObject);
      const urlBase = "https://rmc-proxy-server.herokuapp.com/api";
      const field = optionsObject.field;
      const precision = optionsObject.precision;
      const value = optionsObject.value;
      const fulltext = optionsObject.fulltext || false;
      const scholarly = optionsObject.scholarly;
      const daterange = optionsObject.daterange;
      if (target == "primo-book-search") {
        runCache(
          `${urlBase}/cache-primo-book-search/${field}/${precision}/${value}`
        );
      }
      if (target == "primo-article-search") {
        runCache(
          `${urlBase}/cache-primo-article-search/${field}/${precision}/${value}/${fulltext}`
        );
      }
      if (target == "ebsco-searches") {
        runCache(
          `${urlBase}/cache-ebsco-search/${value}?scholarly=${scholarly}&fulltext=${fulltext}&daterange=${daterange}`
        );
      }
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
