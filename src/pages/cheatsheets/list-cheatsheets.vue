<template>
  <q-page padding>
    <div>
      <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
        <h2>List Cheatsheets2</h2>
      </q-card>
      <q-card>
        <list-table
          name="pageTitle"
          :columns="columns"
          :data="data"
          sortBy="contents"
          :loading="loading"
          collection="Cheatsheets"
          createNewLink="create-cheatsheet"
        ></list-table>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import listTable from "components/ListItemsTable";
export default {
  components: { listTable },
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
      columns: [
        {
          label: "Cheatsheet Name",
          name: "cheatsheets",
          sortable: true,
          field: "name",
          align: "left",
          // classes: 'bg-accent ellipsis',
          style: "max-width: 100px"
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

      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 100
      },
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
          // this.deleteSuccess = true;
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
          // this.deleteFailure = true;
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
