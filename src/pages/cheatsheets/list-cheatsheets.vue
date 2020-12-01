<template>
  <q-page padding>
    <div>
      <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
        <h2>List Cheatsheets</h2>
      </q-card>
      <q-card>
        <q-table
          row-key="key"
          :columns="columns"
          :data="data"
            :loading="loading"
          :filter="filter"
          dark
          >` @`
          <template v-slot:top>
            <q-space />
            <q-input outlined bg-color="accent" debounce="300" color="grey" v-model="filter" label="Search">
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
                @click="editItem(props)"
                icon="edit"
                ><q-tooltip content-style="font-size: 16px"
                  >Edit Cheatsheet</q-tooltip
                ></q-btn
              >
              <q-btn
                dense
                round
                flat
                color="grey"
                @click="deleteItem(props)"
                icon="delete"
                ><q-tooltip content-style="font-size: 16px"
                  >Delete Cheatsheet</q-tooltip
                ></q-btn
              >
            </q-td>
          </template>

         <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
        </q-table>
      </q-card>
    </div>
    <!-- Dialogs -->
    <!-- Delete Item Confirmation -->
        <q-dialog v-model="dialogDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this cheatsheet?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="secondary"
            v-close-popup
             
          />
          <q-btn flat label="Delete" color="white" class="bg-red" v-close-popup @click="deleteItemConfirm"  />
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
          <q-btn
            flat
            label="Cancel"
            color="secondary"
            v-close-popup
             
          />
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
          <q-btn
            flat
            label="Cancel"
            color="secondary"
            v-close-popup
             
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading:false,
    deleteSuccess: false,
    deleteFailure: false,
      filter: "",
      search: "",
      editedKey: "",
      deleteItemKey: "",
      dialogDelete: false,
      columns: [
        {
          label: "Cheatsheet Name",
          name: "cheatsheets",
          sortable: true,
          field: "name",
          align: "left",
            // classes: 'bg-accent ellipsis',
          style: 'max-width: 100px',
          // headerClasses: 'bg-secondary text-bold text-black'
          // headerClasses: ' text-italic '
        },
        {
          name: "updated",
          label: "Updated",
          field: "updatedPretty",
          sortable: true,
          align: "left"
        },
        { name: "actions", label: "Actions", field: "", align: "center" }
      ],
      data: [],
      defaultOpenedDetails: [1],
      isPaginated: false,
      isPaginationSimple: false,
      paginationPosition: "bottom",
      currentPage: 1,
      perPage: 5,
      errors: [],
      ref: this.$firestore.collection("Cheatsheets") //name of the collection in firestore that contains all your real data
    };
  },
  created() {
    this.loading = true;

    this.ref.onSnapshot(querySnapshot => {
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
      this.loading = false;
    });
  },
  methods: {
    ...mapActions("store", ["updateEditCheatsheet"]),

    editItem(item) {
      console.log(item);
      this.updateEditCheatsheet(item.key);
      this.$router.push({
        name: "edit-cheatsheet"
        // params: { id: item.key }
      });
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.deleteItemKey = item.key;
    },
   
    //deleteItemConfirm = We are hitting okay in dialog to actually delete item. So this is where we actually delete it.
    deleteItemConfirm(item) {
      this.ref
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

<style scoped>
.text-right {
  text-align: left !important;
}
</style>
