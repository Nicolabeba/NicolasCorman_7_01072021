<template>
  <Header />
  <img src="../assets/icon-above-font.svg" alt="Groupomania" />
  <Footer />
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: { Header, Footer },
};
</script>
