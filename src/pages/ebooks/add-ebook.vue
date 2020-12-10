<template>
  <q-page padding>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2>Add eBook</h2>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-input
        label="Title"
        v-model="dataStore.title"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-input
        label="URL"
        v-model="dataStore.url"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-checkbox
            dark
            v-model="dataStore.useProxy"
             label="Needs Proxy Server Prepend"
            color="dark"
          />
          </q-select>
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
          <q-btn
            flat
            label="Create Another"
            color="secondary"
            v-close-popup
            @click="clearDatastore"
          />
          <q-btn flat label="Go Home" color="secondary" v-close-popup to="/" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="errorDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="error_outline" color="dark" text-color="white" />
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
export default {
  data() {
    return {
      successDialog: false,
      errorDialog: false,

      dataStore: {
        title: "",
        updated: "",
        url: "",
        useProxy: true
      },

      ref: this.$firestore.collection("eBooks"),
      ref2: this.$firestore.collection("proxyServerUrl")
    };
  },
  created() {
      console.log("created")
    let getProxyServerUrl = () => {
      this.ref2.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, doc.data());
        });
      });
    };

    getProxyServerUrl();
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

      // grab needed data bits from different places and get them all into datastore bc it is what goes to firestore
      // this.dataStore.pageHeading = this.selectedHeading;
      // this.dataStore.pageSubheading = this.selectedSubheading;
      this.dataStore.updated = this.getDate();
      // filter this.tags for selected and map just the names of those ones into this.dataStore.tags
      // this.dataStore.tags = this.tags
      //   .filter(i => i.selected == true)
      //   .map(i => i.name);

      try {
        this.ref
          .doc(this.dataStore.title)
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
    clearDatastore() {
      this.dataStore = {
        title: "",
        updated: "",
  useProxy: true
      };
 
    }
  },

  created() {}
};
</script>

<style></style>
