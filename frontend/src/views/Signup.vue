<template>
  <Header />
  <Signup />
  <Footer />
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Signup from "@/components/Signup.vue";

export default {
  name: "Sign",
  components: {
    Header,
    Signup,
    Footer,
  },
};
</script>
