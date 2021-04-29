<template>
  <div>
    <!-- <cache-new-api-search :name="name"></cache-new-api-search> -->
    <!-- <div>Existing Cached Searches</div> -->
    <q-table
      :columns="columns"
      :data="data"
      :loading="loading"
      :filter="filter"
      row-key="key"
      title="Existing Cached Searches"
      dark
      >` @`
      <template v-slot:top-left>
        <q-space />
        <q-input
          outlined
          bg-color="accent"
          debounce="300"
          color="grey"
          v-model="filter"
          label="Search"
        >
          <template v-slot:append>
            <q-icon name="search" color="grey" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="deleteItem(props)"
            icon="delete"
            ><q-tooltip content-style="font-size: 16px"
              >Delete Cached Search</q-tooltip
            ></q-btn
          >
        </q-td>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
    <!-- Dialogs -->
    <!-- Delete Item Confirmation -->
    <q-dialog v-model="dialogDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-sm"
            >Are you sure you want to delete this cached search?</span
          >
        </q-card-section>

        <q-card-actions align="left">
          <q-btn flat label="Cancel" color="secondary" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="white"
            class="bg-red"
            v-close-popup
            @click="deleteItem"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Item Deletion Err/Succ -->
    <!-- <q-dialog v-model="deleteSuccess" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="done_outline" color="dark" text-color="white" />
          <span class="q-ml-sm">Item successfully deleted.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deleteSuccess" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="" color="dark" text-color="white" />
          <span class="q-ml-sm">Error deleting item.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
    <delete-dialog
      :show="showDeleteDialog"
      :itemID="deleteItemData"
      :collectionName="name"
    ></delete-dialog>
  </div>
</template>

<script>
import cacheNewApiSearch from "./CacheNewApiSearch.vue";
import DeleteDialog from "components/DeleteDialog.vue";
export default {
  components: { cacheNewApiSearch, DeleteDialog },

  props: {
    name: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      showDeleteDialog: false,
      deleteItemData: "",
      data: [],
      loading: false,
      deleteSuccess: false,
      deleteFailure: false,
      filter: "",
      search: "",
      editedKey: "",
      deleteItemKey: "",
      dialogDelete: false,
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
      ],
      ref: this.$firestore.collection("Cheatsheets"),
      ref2: this.$firestore.collection(this.name)
    };
  },
  //
  created() {
    this.loading = true;
    this.ref2.onSnapshot(querySnapshot => {
      this.data = [];
      querySnapshot.forEach(doc => {
        // console.log("hi", doc.id, doc.data().results);

        this.data.push({
          key: doc.id,
          searchTerm: doc.data().searchTerm,
          //   results: doc.data().results,
          resultsLength: doc.data().results.length
          //   searchOptions: doc.data().searchOptions
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
  },
  methods: {
    deleteItem(item) {
      this.deleteItemData = item.key;
      this.showDeleteDialog = true;
    }

    //deleteItemConfirm = We are hitting okay in dialog to actually delete item. So this is where we actually delete it.
    // deleteItemConfirm(item) {
    //   let here = this
    //   this.ref2
    //     .doc(this.deleteItemKey)
    //     .delete()
    //     .then(function() {
    //       // console.log("uid", firebase.auth().user.uid);
    //       console.log("Document successfully deleted!");
    //       here.deleteSuccess = true;
    //     })
    //     .catch(function(error) {
    //       console.error("Error removing document: ", error);
    //       here.deleteFailure = true;
    //     });
    // },
    // deleteCheatsheet(id) {
    //   this.ref
    //     .doc(id)
    //     .delete()
    //     .then(function() {
    //       // console.log("uid", firebase.auth().user.uid);
    //       console.log("Document successfully deleted!");
    //     })
    //     .catch(function(error) {
    //       // console.log("uid", firebase.auth().user.uid);

    //       console.error("Error removing document: ", error);
    //     });
    // }
  }
};
</script>

<style></style>
