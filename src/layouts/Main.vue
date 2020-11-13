<template>
  <q-layout view="lHh Lpr fff" class="bg-primary">
    <q-header elevated class="bg-dark text-grey-1" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mx-md"
        />

        <q-toolbar-title shrink class="row items-center no-wrap">
          <!-- <img src="https://cdn.quasar.dev/img/layout-gallery/logo-google.svg"> -->
          <span class="q-ml-sm  ">Library Cheatsheets Manager</span>
        </q-toolbar-title>

        <q-space />
 
        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <template v-if="!this.$store.state.store.user"
            ><q-btn flat label="Sign In" to="/login"></q-btn
          ></template>
          <template v-if="this.$store.state.store.user">
            <q-btn flat label="Sign Out" @click="signOut"></q-btn>
          </template>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
  elevated
      
      behavior="mobile"
      @click="leftDrawerOpen = false"
    >
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar bg-dark" >
          <q-toolbar-title class="row items-center text-grey-8 bg-dark q-pa-sm">
           <span class=" text-white">Library Cheatsheets</span>
          </q-toolbar-title>
                
        </q-toolbar>
        
         <!-- <q-separator   /> -->
<!-- This is where we are populating the drawer navigation -->
        <q-list padding>
          <q-item><span class="text-h5 text-grey-7">Cheatsheets</span></q-item>
          <q-item
            v-for="link in links1"
            :key="link.text"
            clickable
            
            :to="link.destination"
            class="GPL__drawer-item"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label >{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />
     <q-item><span class="text-h5 text-grey-7">API Searches</span></q-item>
          <q-item
            v-for="link in links2"
            :key="link.text"
            clickable
            :to="link.destination"
            class="GPL__drawer-item"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item
            v-for="link in links3"
            :key="link.text"
            clickable
            class="GPL__drawer-item"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />


        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="GPL__page-container">
      <router-view />

      <q-page-sticky v-if="$q.screen.gt.sm" expand position="left">
        <div class="fit q-pt-xl q-px-sm column">
          <q-btn
            round
            flat
            color="grey-9"
            stack
            no-caps
            size="26px"
            class="GPL__side-btn"
            to="/list-cheatsheets"
          >
            <q-icon size="22px" name="list" />
            <div class="GPL__side-btn__label">List All</div>
          </q-btn>

          <q-btn
            round
            flat
            color="grey-9"
            stack
            no-caps
            size="26px"
            class="GPL__side-btn"
            to="/create-cheatsheet"
          >
            <q-icon size="22px" name="add_circle" />
            <div class="GPL__side-btn__label">Create New</div>
          </q-btn>

          <q-btn
            round
            flat
            color="grey-9"
            stack
            no-caps
            size="26px"
            class="GPL__side-btn"
          >
            <q-icon size="22px" name="subject" />
            <div class="GPL__side-btn__label">API Searches</div>
            <!-- <q-badge floating color="red" text-color="white" style="top: 8px; right: 16px">
              1
            </q-badge> -->
          </q-btn>

          <q-btn
            round
            flat
            color="grey-9"
            stack
            no-caps
            size="26px"
            class="GPL__side-btn"
          >
            <q-icon size="22px" name="insert_link" />
            <div class="GPL__side-btn__label">Weblinks</div>
          </q-btn>

          <!-- <q-btn round flat color="grey-8" stack no-caps size="26px" class="GPL__side-btn">
            <q-icon size="22px" name="import_contacts" />
            <div class="GPL__side-btn__label">Photo books</div>
          </q-btn> -->
        </div>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import { Screen } from "quasar";
export default {
  name: "CheatsheetsMainLayout",

  data() {
    return {
      leftDrawerOpen: false,
      search: "",
      storage: 0.26,
      links1: [
        { icon: "list", text: "List All", destination: "/list-cheatsheets" },
        { icon: "add_circle", text: "Create New", destination: "/create-cheatsheet" },
 
      ],
      links2: [
        { icon: "list", text: "List APIs", destination: "/api-searches" },
        { icon: "delete", text: "Trash" }
      ],
      links3: [
        { icon: "settings", text: "Settings" },
        { icon: "help", text: "Help & Feedback" },
        { icon: "get_app", text: "App Downloads" }
      ],
      createMenu: [
        { icon: "photo_album", text: "Album" },
        { icon: "people", text: "Shared Album" },
        { icon: "movie", text: "Movie" },
        { icon: "library_books", text: "Animation" },
        { icon: "dashboard", text: "Collage" },
        { icon: "book", text: "Photo book" }
      ]
    };
  },
  methods: {
    signOut() {
      console.log("signOut");
      this.$fireAuth.signOut();
    }
  }
};
</script>

<style lang="sass">


 

.GPL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 35%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368

    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px

  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500

  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px




</style>
