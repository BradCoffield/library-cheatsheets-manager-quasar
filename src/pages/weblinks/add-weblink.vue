<template>
  <q-page padding>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2>Add Weblink</h2>
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
      <q-input
        label="Description"
        v-model="dataStore.description"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <div class="text-h4 text-white text-bold q-pa-sm">
        Associate with Existing Cheatsheets
      </div>
      <!-- <q-card-section>
        <div class="row">
          <div
            style="font-size: 16px;"
            class="col-6"
            v-for="(item, index) in tags"
            :key="index"
          >
            <q-checkbox
              :label="item.name"
              v-model="item.selected"
              color="dark"
              dark
            ></q-checkbox>
          </div></div
      ></q-card-section> -->
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
      data:[],

      dataStore: {
        title: "",
        updated: "",
        url: "",
        description: ""
      },
      cheatsheetsRef: this.$firestore.collection("Cheatsheets"),
      weblinksRef: this.$firestore.collection("Weblinks")
    };
  },
  created() {
    console.log("created");
      this.cheatsheetsRef.onSnapshot(querySnapshot => {
      this.data = [];
      querySnapshot.forEach(doc => {
        // console.log(doc.id, doc.data())
        let ddate;
        if (doc.data().updated) {
          ddate = new Date(doc.data().updated.toString());
          console.log(ddate.toDateString());
        }
        //grabs the individual pieces of our individual records. So they can be table-ified
        this.data.push({
          key: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          url: doc.data().url,
          updated: doc.data().updated,
          updatedPretty: doc.data().updated ? ddate.toDateString() : " ",

          categories: doc.data().categories
        });
      });
      console.log(this.data);
    });
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
