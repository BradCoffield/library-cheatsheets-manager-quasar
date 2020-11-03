<template>
  <q-page padding>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2>Create Cheatsheet</h2>
    </q-card>
    <q-card
      ><q-input
        label="Name"
        v-model="dataStore.name"
        class="bg-dark text-white q-pa-md"
        dark
      ></q-input
    ></q-card>

    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-card-section>
        <div class="text-h4 ">
          <q-checkbox
            dark
            v-model="dataStore.databases.metadata.useInProduction"
            label=""
          />
          Databases
          <span class="text-body2"
            >Includes the "Best Bets" databases earmarked for this discipline.
          </span>
        </div>
        <!-- <hr dark> -->
      </q-card-section>
   </q-card>

   
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-card-section>
        <div class="text-h4 ">
          <q-checkbox
            dark
            v-model="dataStore.primo_quick_search.metadata.useInProduction"
            label=""
          />
          Primo Quick Search
          <span class="text-body2"
            >Includes a Primo search bar.
          </span>
        </div>
        <!-- <hr dark> -->
      </q-card-section>
   </q-card>


    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-card-section>
        <div class="text-h4 ">
          <q-checkbox
            dark
            v-model="dataStore.weblinks_block.metadata.useInProduction"
            label=""
          />
          Weblinks
          <span class="text-body2"
            >Include all of the weblinks associated with this area. 
          </span>
        </div>
        <!-- <hr dark> -->
      </q-card-section>
   </q-card>


    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-card-section>
        <div class="text-h4 text-primary ">
          <q-checkbox
            dark
            v-model="dataStore.citation_styles.metadata.useInProduction"
            label=""
          />
          Citation Styles
          <span class="text-body2 text-secondary"
            > Include useful content for selected citation styles. 
          </span>
        </div>
        <!-- <hr dark> -->
      </q-card-section>
   </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      citation_loading: true,
      primo_books_loading: true,
      ebsco_a9h_loading: true,
      ebsco_a9h_loading: true,
      primo_articles_loading: true,
      ebscoCachedSearchesController: [],
      primoArticleSearchesController: [],
      primoBookSearchesController: [],
      citationStylesController: [],

      dataStore: {
        name: "",
        updated: "",
        citation_styles: {
          metadata: {
            useInProduction: false
          },
          toUse: []
        },
        databases: {
          metadata: { useInProduction: false }
        },
        dpla: { metadata: { useInProduction: false }, topics: "" },
        ebsco_api_a9h: { metadata: { useInProduction: false }, toUse: [] },
        primo_article_searches: {
          metadata: { useInProduction: false },
          toUse: []
        },
        primo_book_searches: {
          metadata: { useInProduction: false },
          toUse: []
        },
        primo_quick_search: { metadata: { useInProduction: false } },
        weblinks_block: { metadata: { useInProduction: false } }
      },
      ref: this.$firestore.collection("Cheatsheets"), //name of the collection in firestore that contains all your real data
      ref2: this.$firestore.collection("CitationStylesRepository")
    };
  },
  created() {
    this.getCached_Ebsco();
    this.getCached_PrimoBooks();
    this.getCached_PrimoArticles();
    this.citationStylesWanted();
  },

  methods: {
    getDate() {
      let date = new Date();
      return date.toISOString();
    },
    getCached_Ebsco() {
      this.$firestore.collection("ebsco-searches").onSnapshot(querySnapshot => {
        this.ebscoCachedSearchesController = [];
        querySnapshot.forEach(doc => {
          // doc.data().searchTerm
          let rObj = {};
          rObj.name = doc.data().searchTerm;
          rObj.id = doc.id;
          rObj.selected = false;
          this.ebscoCachedSearchesController.push(rObj);
          this.ebsco_a9h_loading = false;
        });

        this.ebscoCachedSearchesController.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      });
    },
    getCached_PrimoBooks() {
      this.$firestore
        .collection("primo-book-searches")
        .onSnapshot(querySnapshot => {
          this.primoBookSearchesController = [];
          querySnapshot.forEach(doc => {
            // doc.data().searchTerm
            // console.log(doc.data());
            let rObj = {};
            rObj.name = doc.data().searchTerm;
            rObj.id = doc.id;
            rObj.selected = false;
            this.primoBookSearchesController.push(rObj);

            this.primo_books_loading = false;
          });
          this.primoBookSearchesController.sort((a, b) => {
            let fa = a.name.toLowerCase(),
              fb = b.name.toLowerCase();
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          });
        });
    },
    getCached_PrimoArticles() {
      // this.primoArticleSearchesController = [];
      this.$firestore
        .collection("primo-article-searches")
        .onSnapshot(querySnapshot => {
          this.primoArticleSearchesController = [];
          querySnapshot.forEach(doc => {
            // doc.data().searchTerm
            // console.log(doc.data());
            let rObj = {};
            rObj.name = doc.data().searchTerm;
            rObj.id = doc.id;
            rObj.selected = false;
            this.primoArticleSearchesController.push(rObj);
            this.primo_articles_loading = false;
          });
          this.primoArticleSearchesController.sort((a, b) => {
            let fa = a.name.toUpperCase(),
              fb = b.name.toUpperCase();

            if (fa.charAt(0) === " ") fa = fa.substring(1);
            if (fb.charAt(0) === " ") fb = fb.substring(1);

            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          });
        });
    },

    citationStylesWanted() {
      this.ref2.onSnapshot(querySnapshot => {
        this.data = [];
        querySnapshot.forEach(doc => {
          // console.log(doc.id, doc.data())
          let rObj = {};
          rObj.name = doc.id;
          rObj.selected = false;
          this.citationStylesController.push(rObj);
          this.citation_loading = false;
        });
      });

      console.log("hihi");
    },
    goHome() {
      router.push("/");
    },
    sendUpdate(evt) {
      evt.preventDefault();

      this.iteratorForPrep("ebscoCachedSearchesController");
      this.iteratorForPrep("primoArticleSearchesController");
      this.iteratorForPrep("primoBookSearchesController");
      this.iteratorForPrep("citationStylesController");
      this.dataStore.updated = this.getDate();
      this.ref.doc(this.dataStore.name).set(this.dataStore, { merge: true });
    },
    iteratorForPrep: function(targetArray) {
      console.log(targetArray);
      let self = this;

      if (targetArray == "ebscoCachedSearchesController") {
        self.ebscoCachedSearchesController.forEach(function(i) {
          if (i.selected == true) {
            self.dataStore.ebsco_api_a9h.toUse.push(i.id);
          }
        });
      }
      if (targetArray == "primoArticleSearchesController") {
        self.primoArticleSearchesController.forEach(function(i) {
          if (i.selected == true) {
            self.dataStore.primo_article_searches.toUse.push(i.id);
          }
        });
      }
      if (targetArray == "primoBookSearchesController") {
        self.primoBookSearchesController.forEach(function(i) {
          if (i.selected == true) {
            self.dataStore.primo_book_searches.toUse.push(i.id);
          }
        });
      }
      if (targetArray == "citationStylesController") {
        self.citationStylesController.forEach(function(i) {
          if (i.selected == true) {
            self.dataStore.citation_styles.toUse.push(i.name);
          }
        });
      }
    },
    sortAlphabeticallyByObjectKey(arr, key) {
      arr.sort((a, b) => {
        let fa = a[key].toUpperCase(),
          fb = a[key].toUpperCase();

        if (fa.charAt(0) === " ") fa = fa.substring(1);
        if (fb.charAt(0) === " ") fb = fb.substring(1);

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    }
  }
};
</script>

<style></style>
