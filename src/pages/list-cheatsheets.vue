<template>
  <q-page padding>
    <div>
      <h2 style="font-size:48px;font-weight:bold;border-bottom:2px dotted">List Cheatsheets</h2>
      <br /><br /> 
      <q-card>
        <q-table
          row-key="key"
          :columns="columns"
          :data="data"
          color="primary"
          :filter="filter"
          dark
        >`  @`
          <template v-slot:top>
            <q-space />
            <q-input outlined bg-color="secondary" debounce="300" color="grey" v-model="filter" label="Search">
              <template v-slot:append>
                <q-icon name="search" color="grey"/>
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
              ></q-btn>
              <q-btn
                dense
                round
                flat
                color="grey"
                @click="deleteItem(props)"
                icon="delete"
              ></q-btn>
            </q-td>
          </template>
  
          <!-- <template q-slot:item.actions="{ item }">
            <q-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </q-icon>
            <q-icon small @click="deleteItem(item)"> mdi-delete </q-icon>
            <q-dialog q-model="dialogDelete" max-width="500px">
              <q-card>
                <q-card-title class="headline"
                  >Are you sure you want to delete this item?</q-card-title
                >
                <q-card-actions>
                  <q-spacer></q-spacer>
                  <q-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</q-btn
                  >
                  <q-btn color="blue darken-1" text @click="deleteItemConfirm()"
                    >OK</q-btn
                  >
                  <q-spacer></q-spacer>
                </q-card-actions>
              </q-card>
            </q-dialog>
          </template> -->
        </q-table>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
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
            classes: 'bg-accent ellipsis',
          style: 'max-width: 100px',
          headerClasses: 'bg-primary text-black'
        },
        {
          name: "updated",
          label: "Updated",
          field: "updatedPretty",
          sortable: true,
           align: "left",
        },
        { name: "actions", label: "Actions", field: "", align: "center" }
        // { label: 'Actions', field: 'actions', sortable: false },
        //   { text: 'Calories', value: 'calories' },
        //   { text: 'Fat (g)', value: 'fat' },
        //   { text: 'Carbs (g)', value: 'carbs' },
        //   { text: 'Protein (g)', value: 'protein' },
        //   { text: 'Iron (%)', value: 'iron' },
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
    this.isLoading = true;

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
      this.isLoading = false;
    });
  },
  methods: {
    editItem(item) {
      console.log(item);
      //   let itemIndex = this.data.indexOf(item);
      //   console.log(this.data[itemIndex].key);
      //   this.$router.push({
      //     name: "edit-cheatsheet",
      //     params: { id: this.data[itemIndex].key }
      //   });
    },
    deleteItem(item) {
      console.log(item);
      //   let itemIndex = this.data.indexOf(item);
      //   let itemKey = this.data[itemIndex].key;
      //   this.deleteItemKey = itemKey;
      //   this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    //deleteItemConfirm = We are hitting okay in dialog to actually delete item. So this is where we actually delete it.
    deleteItemConfirm() {
      this.ref
        .doc(this.deleteItemKey)
        .delete()
        .then(function() {
          // console.log("uid", firebase.auth().user.uid);
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          // console.log("uid", firebase.auth().user.uid);
          console.log(firebase.auth().currentUser.email);
          console.error("Error removing document: ", error);
        });

      this.closeDelete();
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
          console.log(firebase.auth().currentUser.email);
          console.error("Error removing document: ", error);
        });
    }
  }
};
</script>

<style scoped>
.text-right{text-align: left!important;}
</style>
