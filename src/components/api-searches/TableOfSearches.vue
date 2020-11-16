<template>
  <div>
    hi  {{name}}
    <q-table
      row-key="id"
      :columns="columns"
      :data="data"
      :loading="loading"
      :filter="filter"
      dark
      >` @`
      <template v-slot:top>
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
          <!-- <q-btn
                dense
                round
                flat
                color="grey"
                @click="editItem(props)"
                icon="edit"
                ><q-tooltip content-style="font-size: 16px"
                  >Edit Cheatsheet</q-tooltip
                ></q-btn
              > -->
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

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="secondary" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="white"
            class="bg-red"
            v-close-popup
            @click="deleteItemConfirm"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Item Deletion Err/Succ -->
    <q-dialog v-model="deleteSuccess" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="done_outline" color="dark" text-color="white" />
          <span class="q-ml-sm">Cheatsheet successfully deleted.</span>
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
          <span class="q-ml-sm">Error deleting cheatsheet.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {

props: {
    name: {
      type: String,
      required: true
    }},
  data() {
    return {
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
        console.log("hi", doc.id, doc.data().results);

        this.data.push({
          key: doc.id,
          searchTerm: doc.data().searchTerm,
          //   results: doc.data().results,
          resultsLength: doc.data().results.length
          //   searchOptions: doc.data().searchOptions
        });
      });
      this.loading = false;
    });
  },
  methods: {
    ...mapActions("store", ["updateEditCheatsheet"]),

    // editItem(item) {
    //   console.log(item);
    //   this.updateEditCheatsheet(item.key);
    //   this.$router.push({
    //     name: "edit-cheatsheet"
    //     // params: { id: item.key }
    //   });
    // },
    deleteItem(item) {
      this.dialogDelete = true;
      this.deleteItemKey = item.key;
    },

    //deleteItemConfirm = We are hitting okay in dialog to actually delete item. So this is where we actually delete it.
    deleteItemConfirm(item) {
      this.ref2
        .doc(this.deleteItemKey)
        .delete()
        .then(function() {
          // console.log("uid", firebase.auth().user.uid);
          console.log("Document successfully deleted!");
          this.deleteSuccess = true;
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
          this.deleteFailure = true;
        });
    },
    deleteCheatsheet(id) {
      this.ref
        .doc(id)
        .delete()
        .then(function() {
          // console.log("uid", firebase.auth().user.uid);
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          // console.log("uid", firebase.auth().user.uid);

          console.error("Error removing document: ", error);
        });
    }
  }
};
</script>

<style></style>
