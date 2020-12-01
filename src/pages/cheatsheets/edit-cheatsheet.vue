<template>
  <q-page padding>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2>Edit Cheatsheet</h2>
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
        <div class="text-h4 text-white text-bold ">
          <q-checkbox
             color="dark" dark
            v-model="dataStore.databases.metadata.useInProduction"
            label=""
          />
          Databases
          <q-icon
            name="far fa-question-circle"
            dark
            style="font-size: 18px;"
            class="text-accent"
          >
            <q-tooltip
              content-class="bg-secondary"
              content-style="font-size: 16px"
            >
              Includes the "Best Bets" databases earmarked for this discipline.
            </q-tooltip></q-icon
          >
        </div>
        <!-- <hr dark> -->
      </q-card-section>
    </q-card>

    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-card-section>
        <div class="text-h4 text-white text-bold ">
          <q-checkbox
            color="dark" dark
            v-model="dataStore.primo_quick_search.metadata.useInProduction"
            label=""
          />
          Primo Quick Search
          <q-icon
            name="far fa-question-circle"
            dark
            style="font-size: 18px;"
            class="text-accent"
          >
            <q-tooltip
              content-class="bg-secondary"
              content-style="font-size: 16px"
            >
              Includes a Primo search bar.
            </q-tooltip></q-icon
          >
        </div>
        <!-- <hr dark> -->
      </q-card-section>
    </q-card>

    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-card-section>
        <div class="text-h4 text-white text-bold ">
          <q-checkbox
        color="dark" dark
            v-model="dataStore.weblinks_block.metadata.useInProduction"
            label=""
          />
          Weblinks
          <q-icon
            name="far fa-question-circle"
            dark
            style="font-size: 18px;"
            class="text-accent"
          >
            <q-tooltip
              content-class="bg-secondary"
              content-style="font-size: 16px"
            >
              Include all of the weblinks associated with this area.
            </q-tooltip></q-icon
          >
        </div>
        <!-- <hr dark> -->
      </q-card-section>
    </q-card>

    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-card-section>
        <div class="text-h4 text-white text-bold ">
          <q-checkbox
          color="dark" dark
            v-model="dataStore.citation_styles.metadata.useInProduction"
            label=""
          />
          Citation Styles
          <q-icon
            name="far fa-question-circle"
            dark
            style="font-size: 18px;"
            class="text-accent"
          >
            <q-tooltip
              content-class="bg-secondary"
              content-style="font-size: 16px"
            >
              Include useful content for selected citation styles.
            </q-tooltip></q-icon
          >
        </div>
        <hr dark />
      </q-card-section>
      <q-card-section>
        <template v-if="citationStylesController.length > 0">
          <div class="row">
            <div
              class="col"
              v-for="(item, index) in citationStylesController"
              :key="index"
            >
              <q-checkbox
              color="dark" dark
                :label="item.name"
                v-model="item.selected"
               
              ></q-checkbox>
            </div>
          </div>

          <!-- </li> -->
        </template>
      </q-card-section>
    </q-card>

    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-card-section>
        <div class="text-h4 text-white text-bold ">
          <q-checkbox
       color="dark" dark
            v-model="dataStore.ebsco_api_a9h.metadata.useInProduction"
            label=""
          />
          Academic Search Complete Articles
          <q-icon
            name="far fa-question-circle"
            dark
            style="font-size: 18px;"
            class="text-accent"
          >
            <q-tooltip
              content-class="bg-secondary"
              content-style="font-size: 16px"
            >
              Scholarly articles based on the selected search query.
            </q-tooltip></q-icon
          >
        </div>
        <hr dark />
      </q-card-section>
      <q-card-section>
        <template v-if="ebscoCachedSearchesController.length > 0">
          <q-select
            dark
            :options="ebscoCachedSearchesController"
            v-model="ebscoTemp"
            filled
            label="Cached Search to Use"
          >
          </q-select>
        </template>
      </q-card-section>
    </q-card>

    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-card-section>
        <div class="text-h4 text-white text-bold ">
          <q-checkbox
           color="dark" dark
            v-model="dataStore.primo_article_searches.metadata.useInProduction"
            label=""
          />
          Primo Articles
          <q-icon
            name="far fa-question-circle"
            dark
            style="font-size: 18px;"
            class="text-accent"
          >
            <q-tooltip
              content-class="bg-secondary"
              content-style="font-size: 16px"
            >
              Scholarly articles based on the selected search query.
            </q-tooltip></q-icon
          >
        </div>
        <hr dark />
      </q-card-section>
      <q-card-section>
        <template v-if="primoArticleSearchesController.length > 0">
          <q-select
            ref="selectRef"
            dark
            :options="primoArticleSearchesController"
            v-model="primoArticlesTemp"
            filled
            label="Cached Search to Use"
          >
          </q-select>
        </template>
      </q-card-section>
    </q-card>

    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-card-section>
        <div class="text-h4 text-white text-bold ">
          <q-checkbox
         color="dark" dark
            v-model="dataStore.primo_book_searches.metadata.useInProduction"
            label=""
          />
          Primo Books
          <q-icon
            name="far fa-question-circle"
            dark
            style="font-size: 18px;"
            class="text-accent"
          >
            <q-tooltip
              content-class="bg-secondary"
              content-style="font-size: 16px"
            >
              Books based on the selected search query.
            </q-tooltip></q-icon
          >
        </div>
        <hr dark />
      </q-card-section>
      <q-card-section>
        <template v-if="primoBookSearchesController.length > 0">
          <q-select
            ref="selectRef"
            dark
            :options="primoBookSearchesController"
            v-model="primoBooksTemp"
            filled
            label="Cached Search to Use"
          >
          </q-select>
        </template>
      </q-card-section>
    </q-card>

    <q-btn
      class="q-mt-md"
      label="Submit"
      type="submit"
      color="accent"
      padding="md xl"
      @click="sendUpdate"
    />

    <!-- err/suc dialogs -->
    <q-dialog v-model="successDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="done_outline" color="dark" dark text-color="white" />
          <span class="q-ml-sm">Cheatsheet successfully edited!</span>
        </q-card-section>

        <q-card-actions align="right">
          <!-- <q-btn
            flat
            label="Create Another"
            color="secondary"
            v-close-popup
            @click="clearDatastore"
          /> -->
          <q-btn flat label="Go Home" color="secondary" v-close-popup to="/" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="errorDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="error_outline" color="dark" dark text-color="white" />
          <span class="q-ml-sm">Error Creating Cheatsheet</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Clear Form"
            color="secondary"
            v-close-popup
            @click="clearDatastore"
          />

          <q-btn flat label="Close" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
        cheatsheetWeAreEditing:"",
      successDialog: false,
      errorDialog: false,
      citation_loading: true,
      primo_books_loading: true,
      ebsco_a9h_loading: true,
      ebsco_a9h_loading: true,
      primo_articles_loading: true,
      ebscoCachedSearchesController: [],
      primoArticleSearchesController: [],
      primoBookSearchesController: [],
      citationStylesController: [],
      ebscoTemp: {label: "Please choose", value: null},
      primoArticlesTemp: {label: "Please choose", value: null},
      primoBooksTemp: {label: "Please choose", value: null},

 

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
    console.log("eh",this.$route.params.id, this.$store.state.store.editCheatsheetID)
this.cheatsheetWeAreEditing = this.$store.state.store.editCheatsheetID
    /* these populate the possible cached searches and all citation styles available */
    Promise.all([
      this.getCached_Ebsco(),
      this.getCached_PrimoBooks(),
      this.getCached_PrimoArticles(),
      this.citationStylesWanted(),
    ]).then(() => this.getSingleCheatsheet())
  },

  methods: {
    getDate() {
      let date = new Date();
      return date.toISOString();
    },
    lodashThings: function (controllerName, otherArray, name) {
      //below iterates over the Controller objects and, using lodash, if the object.name is included in Firestore then change its selected (i.selected) to true

      controllerName.forEach((i) => {
        if (_.includes(otherArray, i.id)) {
            //  console.log(controllerName);
            if (name == "ebscoASC") {this.ebscoTemp = i}
            if (name == "primoArticles") {this.primoArticlesTemp = i}
            if (name == "primoBooks") {this.primoBooksTemp = i}
  
            i.selected = true;
           
        //   console.log('lodashtrue' , controllerName ,i)
        } else {
        //   console.log('lodashfalse')
          // console.log(i.name, "false");
        }
      })
    },
    getSingleCheatsheet: function () {
      this.ref
        .doc(this.cheatsheetWeAreEditing)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log('here')
            this.dataStore = doc.data()
            if (
              this.dataStore.citation_styles &&
              this.dataStore.citation_styles.toUse.length > 0
            ) {
              console.log('yooooo')
              this.citationStylesController.forEach((i) => {
                if (_.includes(this.dataStore.citation_styles.toUse, i.name)) {
                  i.selected = true
                } else {
                  // console.log(i.name, "false");
                }
              })
            }
            if (
              this.dataStore.ebsco_api_a9h &&
              this.dataStore.ebsco_api_a9h.toUse.length > 0
            ) {
              console.log('ebsco!')
              this.lodashThings(
                this.ebscoCachedSearchesController,
                this.dataStore.ebsco_api_a9h.toUse,
                "ebscoASC"
              )
            }
            if (
              this.dataStore.primo_article_searches &&
              this.dataStore.primo_article_searches.toUse.length > 0
            ) {
              console.log('primo articles!')
              this.lodashThings(
                this.primoArticleSearchesController,
                this.dataStore.primo_article_searches.toUse,
                "primoArticles"
              )
            }
            if (
              this.dataStore.primo_book_searches &&
              this.dataStore.primo_book_searches.toUse.length > 0
            ) {
              console.log('primo books')
              this.lodashThings(
                this.primoBookSearchesController,
                this.dataStore.primo_book_searches.toUse,
                "primoBooks"
              )
            }

            return true
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
            return false
          }
        })
        .catch(function (error) {
          console.log('Error:', error)
        })
    },
    getCached_Ebsco() {
      this.$firestore.collection("ebsco-searches").onSnapshot(querySnapshot => {
        this.ebscoCachedSearchesController = [];
        querySnapshot.forEach(doc => {
          let rObj = {};
          rObj.name = doc.data().searchTerm;
          rObj.label = doc.data().searchTerm;
          rObj.value = doc.data().searchTerm;
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
            rObj.label = doc.data().searchTerm;
            rObj.value = doc.data().searchTerm;
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
            rObj.label = doc.data().searchTerm;
            rObj.value = doc.data().searchTerm;
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
      let self = this;
      evt.preventDefault();

      this.iteratorForPrep("ebscoCachedSearchesController");
      this.iteratorForPrep("primoArticleSearchesController");
      this.iteratorForPrep("primoBookSearchesController");
      this.iteratorForPrep("citationStylesController");
      this.dataStore.updated = this.getDate();
      try {
   this.ref
        .doc(this.dataStore.name)
        .set(this.dataStore, { merge: true })
        .then(function() {
          console.log("Document successfully written!");
          self.successDialog = true;
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
          self.errorDialog = true;
        });
} catch (error) {
  console.error(error, "errorr");self.errorDialog = true;

}

    },
    iteratorForPrep: function(targetArray) {
      console.log(targetArray);
      let self = this;

      if (targetArray == "ebscoCachedSearchesController") {
        if (self.ebscoTemp.id) {
        //   self.dataStore.ebsco_api_a9h.toUse.push(self.ebscoTemp.id);
          self.dataStore.ebsco_api_a9h.toUse = [self.ebscoTemp.id];

        }
      }
      if (targetArray == "primoArticleSearchesController") {
        if (self.primoArticlesTemp.id) {
        //   self.dataStore.primo_article_searches.toUse.push(
        //     self.primoArticlesTemp.id
        //   );
        self.dataStore.primo_article_searches.toUse = [self.primoArticlesTemp.id]
        }
      }
      if (targetArray == "primoBookSearchesController") {
        // if (self.primoBooksTemp.id) {
        //   self.dataStore.primo_book_searches.toUse.push(self.primoBooksTemp.id);
        // }
          self.dataStore.primo_book_searches.toUse = [self.primoBooksTemp.id]
      }
      if (targetArray == "citationStylesController") {
          self.dataStore.citation_styles.toUse = []
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
    },
    clearDatastore() {
      this.dataStore = {
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
      };
      this.ebscoTemp = {};
      this.primoBooksTemp = {};
      this.primoArticlesTemp = {};
      this.citationStylesController.forEach(i => {
        i.selected = false;
      });
    }
  }
};
</script>

<style></style>
