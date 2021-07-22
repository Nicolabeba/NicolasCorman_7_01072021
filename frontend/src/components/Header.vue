<template>
  <header class="nav">
    <img src="../assets/icon-left-font.svg" alt="Groupomania" href="/" />
    <div class="nav">
      <router-link to="/login">Se connecter</router-link> |
      <router-link to="/signup">S'inscrire</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped lang="scss">
.nav {
  max-width: 950px;
  img {
    width: 30vh;
    height: 20vh;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;

  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 20px;
  }
}
</style>
