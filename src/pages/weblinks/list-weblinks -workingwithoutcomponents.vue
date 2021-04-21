<template>
  <q-page padding>
    <div>
      <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
        <h2>Weblinks</h2>
      </q-card>
      <q-card>
        <q-table
          row-key="key"
          :columns="columns"
          :data="data"
          :loading="loading"
          :filter="filter"
            :pagination="initialPagination"
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
          <template v-slot:top-right>
            <q-btn
              label="Add Weblink"
              outline
              v-close-popup
              to="add-weblink"
          /></template>

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
                  >Delete Video</q-tooltip
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
          <span class="q-ml-sm"
            >Are you sure you want to delete this video?</span
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
          <span class="q-ml-sm">eBook successfully deleted.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deleteFailure" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="" color="dark" text-color="white" />
          <span class="q-ml-sm">Error deleting ebook.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      deleteSuccess: false,
      deleteFailure: false,
      filter: "",
      search: "",
      editedKey: "",
      deleteItemKey: "",
      dialogDelete: false,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },

      data: [],
      dataStore: {
        name: "",
        updated: "",
        url: "",
        length: "",
        tags: [],
        pageHeading: "",
        pageSubheading: "",
        key: ""
      },
      columns: [
        {
          label: "Name",
          name: "name",
          sortable: true,
          field: "name",
          align: "left",
          // classes: 'bg-accent ellipsis',
          style: "max-width: 250px"
          // headerClasses: 'bg-secondary text-bold text-black'
          // headerClasses: ' text-italic '
        },
            {    name: "url",
          label: "URL",
          field: "url",
          sortable: true,
           style: "max-width: 300px",
          align: "left"},
        
       
        { name: "actions", label: "Actions", field: "", align: "center" }
      ],
      ref: this.$firestore.collection("Weblinks")
    };
  },
  created() {
    this.loading = true;

    this.ref.onSnapshot(querySnapshot => {
      this.data = [];
      querySnapshot.forEach(doc => {
        console.log(doc.id, doc.data());
        let ddate;
        if (doc.data().updated) {
          ddate = new Date(doc.data().updated.toString());
          console.log(ddate.toDateString());
        }
        //grabs the individual pieces of our individual records. So they can be table-ified
        this.data.push({
          key: doc.id,
          name: doc.data().displayName,
          url: doc.data().url,
          updated: doc.data().updated,
          updatedPretty: doc.data().updated ? ddate.toDateString() : " ",
           
        });
      });
      this.loading = false;
    });
  },
  methods: {
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
    }
  }
};
</script>

<style></style>
