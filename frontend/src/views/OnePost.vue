<template>
  <div class="onepost">
    <HeaderLogged />
    <SearchOnePost />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src

import SearchOnePost from "@/components/SearchOnePost.vue";
import Footer from "@/components/Footer.vue";
import HeaderLogged from "@/components/HeaderLogged.vue";

export default {
  name: "OnePost",
  components: { HeaderLogged, SearchOnePost, Footer },
};
</script>
