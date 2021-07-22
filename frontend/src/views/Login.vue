<template>
  <Header />
  <LoginForm />
  <Footer />
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Login",
  components: { Header, LoginForm, Footer },
};
</script>

<style lang="scss" scoped>
.form-check {
  display: flex;
  justify-content: space-between;
}
h3 {
  margin: 20px 0 30px 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #1e1386;
}
</style>
