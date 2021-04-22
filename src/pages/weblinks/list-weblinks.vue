<template>
  <q-page padding>
    <div>
      <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
        <h2>Weblinks</h2>
      </q-card>
         <q-card>
        <list-table
          name="pageTitle"
          :columns="columns"
          :data="data"
          sortBy="contents"
          :loading="loading"
          collection="Weblinks"
          createNewLink="add-weblink"
          editLink="edit-weblink"
        ></list-table>
       
      </q-card>
    </div>
    
   
  </q-page>
</template>

<script>
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
      weblinksRef: this.$firestore.collection("Weblinks")
    };
  },
  created() {
    this.loading = true;

    this.weblinksRef.onSnapshot(querySnapshot => {
      this.data = [];
      querySnapshot.forEach(doc => {
        // console.log(doc.id, doc.data());
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
