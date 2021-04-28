<template>
  <q-page padding>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2>Add Citation Style</h2>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-input
        label="Name"
        v-model="dataStore.styleDisplayName"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-input
        label="Description of Citation Style"
        v-model="dataStore.descriptionOfStyle"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-input
        label="Physical Style Book: Title"
        v-model="dataStore.styleBook.bookTitle"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-input
        label="Physical Style Book: Description"
        v-model="dataStore.styleBook.bookDescription"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-input
        label="Physical Style Book: Cover Image URL"
        v-model="dataStore.styleBook.imgURL"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-input
        label="Physical Style Book: Catalog Permalink"
        v-model="dataStore.styleBook.primoURL"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-input
        label="Online Guide: Top Level URL"
        v-model="dataStore.styleWebLinks.primaryLink"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-input
        label="Online Guide: Citing Book Sources URL"
        v-model="dataStore.styleWebLinks.citingBookSourcesLink"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-input
        label="Online Guide: Citing Online Sources URL"
        v-model="dataStore.styleWebLinks.citingOnlineSourcesLink"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
    </q-card>

    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-input
        label="Online Guide: Sample Paper URL"
        v-model="dataStore.styleWebLinks.samplePaperLink"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
    </q-card>

    <q-btn
      label="Submit"
      color="secondary"
      @click="toFirestore"
      class="q-mt-md"
    ></q-btn>

    <!-- err/suc dialogs -->
    <q-dialog v-model="successDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="done_outline" color="dark" text-color="white" />
          <span class="q-ml-sm">Successfully created!!</span>
        </q-card-section>

        <q-card-actions align="right">
         
          <q-btn flat label="Citation Styles" color="secondary" v-close-popup to="/list-citation-styles" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="errorDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="error_outline" color="dark" text-color="white" />
          <span class="q-ml-sm">Error</span>
        </q-card-section>

        <q-card-actions align="right">
     
          <q-btn flat label="Close" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import _ from "lodash";
import { nanoid } from "nanoid";
export default {
  data() {
    return {
      successDialog: false,
      errorDialog: false,
      existingCheatsheets: [],
      existingCheatsheetsController: [],
      dataStore: {
        descriptionOfStyle: "",
        id: "",
        styleBook: {
          bookDescription: "",
          bookTitle: "",
          imgURL: "",
          primoURL: "",
           
        },
        styleDisplayName: "",
        styleWebLinks: {
          citingBookSourcesLink: "",
          citingOnlineSourcesLink: "",
          primaryLink: "",
          samplePaperLink: ""
        }
      },

      ref: this.$firestore.collection("CitationStylesRepository")
    };
  },
  methods: {
    focusInput() {
      this.$nextTick(() => {
        this.$refs.editMetadataInput.focus();
      });
    },
    getDate() {
      let date = new Date();
      return date.toISOString();
    },
    toFirestore(evt) {
      let self = this;
      evt.preventDefault();
      self.dataStore.id = nanoid();
      try {
        this.ref
          .doc(this.dataStore.styleDisplayName)
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
        console.error(error, "errorr");
        self.errorDialog = true;
      }
    },

  }
};
</script>

<style></style>
