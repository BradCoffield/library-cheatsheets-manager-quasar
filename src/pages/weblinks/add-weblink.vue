<template>
  <q-page padding>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2>Add Weblink</h2>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-input
        label="Title"
        v-model="dataStore.displayName"
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
      <q-card-section>
        <div class="row">
          <div
            style="font-size: 16px;"
            class="col-6"
            v-for="(item, index) in cheatsheetsData"
            :key="index"
          >
            <q-checkbox
              :label="item.name"
              v-model="item.selected"
              color="dark"
              dark
            ></q-checkbox>
          </div></div
      ></q-card-section>
    </q-card>

    <q-btn
      label="Submit"
      color="secondary"
      @click="toFirestore"
      class="q-mt-md"
    ></q-btn>

    <!-- err/suc dialogs -->

    <success-dialog
      :show="successDialogShow"
      :showClearForm="true"
      @clearForm="this.onReset"
      @closeDialog="this.successDialogShow = false"
    ></success-dialog>
    <error-dialog
      :show="errorDialogShow"
      @closeDialog="this.errorDialogShow = false"
    ></error-dialog>
  </q-page>
</template>

<script>
import { nanoid } from "nanoid";
import SuccessDialog from "components/SuccessDialog.vue";
import ErrorDialog from "components/ErrorDialog.vue";
export default {
  components: { SuccessDialog, ErrorDialog },
  name: "AddWeblink",
  data() {
    return {
      successDialogShow: false,
      errorDialogShow: false,
      cheatsheetsData: [],
      dataStore: {
        displayName: "",
        updated: "",
        url: "",
        description: "",
        AssociatedSubjects: [],
        key: ""
      },
      cheatsheetsRef: this.$firestore.collection("Cheatsheets"),
      weblinksRef: this.$firestore.collection("Weblinks")
    };
  },
  created() {
    this.cheatsheetsRef.onSnapshot(querySnapshot => {
      this.cheatsheetsData = [];
      querySnapshot.forEach(doc => {
        this.cheatsheetsData.push({
          key: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          url: doc.data().url,
          updated: doc.data().updated,
          selected: false,
          categories: doc.data().categories
        });
      });
    });
  },
  methods: {
    toFirestore(evt) {
      let self = this;
      evt.preventDefault();
      let key = nanoid();
      this.dataStore.key = key;
      this.cheatsheetsData.forEach(q => {
        if (q.selected === true) {
          this.dataStore.AssociatedSubjects.push(q.name);
        }
      });
      this.dataStore.updated = this.getDate();
      try {
        this.weblinksRef
          .doc(key)
          .set(this.dataStore)
          .then(function() {
            console.log("Document successfully written!");
            self.successDialogShow = true;
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
            self.errorDialogShow = true;
          });
      } catch (error) {
        console.error(error, "errorr");
        self.errorDialogShow = true;
      }
    },
    getDate() {
      let date = new Date();
      return date.toISOString();
    },
    onReset() {
      this.successDialogShow = false;
      this.dataStore.displayName = "";
      this.dataStore.updated = "";
      this.dataStore.url = "";
      this.dataStore.description = "";
      this.cheatsheetsData.forEach(q => {
        if (q.selected === true) {
         q.selected = false;
        }
      });
    }
  }
};
</script>

<style></style>
