<template>
  <q-page padding>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2>Edit eBook</h2>
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
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-card-section>
        <div class="text-h4 text-white text-bold ">
          Cheatsheet Association
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
              Select which cheatsheets on which this video should be included.
            </q-tooltip></q-icon
          >
        </div>

        <hr dark />
      </q-card-section>
      <q-card-section>
        <template v-if="existingCheatsheetsController.length > 0">
          <div class="row">
            <div
              style="font-size: 16px;"
              class="col-6"
              v-for="(item, index) in existingCheatsheetsController"
              :key="index"
            >
              <q-checkbox
                :label="item.name"
                v-model="item.selected"
                color="dark"
                dark
              ></q-checkbox>
            </div>
          </div>

          <!-- </li> -->
        </template>
      </q-card-section>
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
          <span class="q-ml-sm">Successfully edited!!</span>
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
import _ from "lodash";
export default {
  data() {
    return {
      successDialog: false,
      errorDialog: false,
      existingCheatsheets: [],
      existingCheatsheetsController: [],
      dataStore: {
        title: "",
        updated: "",
        url: "",
        useProxy: true,
        associatedSubjects: []
      },

      ref: this.$firestore.collection("eBooks"),
      ref2: this.$firestore.collection("proxyServerUrl"),
      refCheatsheets: this.$firestore.collection("Cheatsheets")
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

      // grab needed data bits from different places and get them all into datastore bc it is what goes to firestore
      // this.dataStore.pageHeading = this.selectedHeading;
      // this.dataStore.pageSubheading = this.selectedSubheading;
      this.dataStore.updated = this.getDate();
      // filter this.tags for selected and map just the names of those ones into this.dataStore.tags
      // this.dataStore.tags = this.tags
      //   .filter(i => i.selected == true)
      //   .map(i => i.name);

      this.existingCheatsheetsController.forEach(q => {
        if (q.selected === true) {
          this.dataStore.associatedSubjects.push(q.name);
        }
      });
      let deDupedArray = _.uniq(this.dataStore.associatedSubjects);

      try {
        this.ref
          .doc(this.dataStore.title)
          .set(this.dataStore, { merge: true })
          .then(function() {
            this.dataStore.associatedSubjects = []
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
        useProxy: true,
        associatedSubjects: []
      };
      this.existingCheatsheetsController.forEach(i => {
        i.selected = false;
      });
    }
  },

  created() {
    console.log("eh", this.$route.params.id);
    console.log("created");
    let getProxyServerUrl = () => {
      this.ref2.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, doc.data());
        });
      });
    };
    let getAndProcessExistingCheatsheets = () => {
      this.refCheatsheets
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.existingCheatsheets.push(doc.id);
          });
        })
        .then(() => {
          this.existingCheatsheetsController = this.existingCheatsheets.map(
            item => {
              let rObj = {};
              rObj.name = item;
              rObj.selected = false;
              // console.log(rObj);
              return rObj;
            }
          );
        });
    };
    let getEbookWeAreEditing = () => {
      this.ref
        .doc(this.$route.params.id)
        .get()
        .then(doc => {
          if (doc.exists) {
            console.log("here");
            this.dataStore = doc.data();

            if (doc.data().associatedSubjects && doc.data().associatedSubjects.length > 0) {
              doc.data().associatedSubjects.forEach(subj => {
                this.existingCheatsheetsController.forEach(i => {
                  if (i.name == subj) {
                    i.selected = true;
                  }
                });
              });
            }
          }
        });
    };
    getAndProcessExistingCheatsheets();
    getProxyServerUrl();
    getEbookWeAreEditing()
  }
};
</script>

<style></style>
