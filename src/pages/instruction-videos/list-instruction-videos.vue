<template>
  <q-page padding>
    <div>
      <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
        <h2>Instruction Videos</h2>
      </q-card>
      <q-card>
         <list-table
          name="pageTitle"
          :columns="columns"
          :data="data"
          sortBy="contents"
          :loading="loading"
          collection="InstructionVideos"
          createNewLink="add-instruction-video"
          editLink="edit-instruction-video"
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
      updateEditVideo: "",
      loading: false,
      deleteSuccess: false,
      deleteFailure: false,
      filter: "",
      search: "",
      editedKey: "",
      deleteItemKey: "",
      dialogDelete: false,
      initialPagination: {
        sortBy: "desc",
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
          label: "Video Name",
          name: "videoName",
          sortable: true,
          field: "name",
          align: "left"
          // classes: 'bg-accent ellipsis',
          // style: "max-width: 250px"
          // headerClasses: 'bg-secondary text-bold text-black'
          // headerClasses: ' text-italic '
        },
        {
          name: "length",
          label: "Length",
          field: "length",
          sortable: true,
          align: "left"
        },
        {
          name: "updated",
          label: "Updated",
          field: "updatedPretty",
          sortable: true,
          align: "left"
        },
        {
          name: "pageHeading",
          label: "Page Heading",
          field: "pageHeading",
          sortable: true,
          align: "left"
        },
        {
          name: "pageSubheading",
          label: "Page Subheading",
          field: "pageSubheading",
          sortable: true,
          align: "left"
        },

        { name: "actions", label: "Actions", field: "", align: "center" }
      ],
      ref: this.$firestore.collection("InstructionVideos")
    };
  },
  created() {
    this.loading = true;

    this.ref.onSnapshot(querySnapshot => {
      this.data = [];
      querySnapshot.forEach(doc => {
        // console.log(doc.id, doc.data());
        let ddate;
        if (doc.data().updated) {
          ddate = new Date(doc.data().updated.toString());
          // console.log(ddate.toDateString());
        }
        //grabs the individual pieces of our individual records. So they can be table-ified
        this.data.push({
          key: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          updated: doc.data().updated,
          updatedPretty: doc.data().updated ? ddate.toDateString() : " ",
          pageHeading: doc.data().pageHeading,
          pageSubheading: doc.data().pageSubheading,
          length: doc.data().length
        });
      });
      this.loading = false;
    });
  },
  methods: {
    editItem(item) {
      console.log(item);
      // this.updateEditCheatsheet(item.key);
      this.$router.push({
        name: "edit-instruction-video",
        params: { id: item.key }
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
    }
  }
};
</script>

<style></style>
