<template>
  <header class="nav">
    <router-link to="/wall">
      <span title="Cliquez-ici pour revenir à la Timeline."
        ><img
          class="infobulle"
          src="../assets/icon-left-font.svg"
          alt="Groupomania"
          href="/"
      /></span>
    </router-link>
    <div class="nav">
      <router-link to="/profile">
        <p>Votre profil</p>
      </router-link>
      <p>|</p>
      <router-link to="/home">
        <p class="disconnect" @click="disconnect">Se déconnecter</p>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderLogged",

  methods: {
    disconnect() {
      localStorage.clear();
    },
  },
};
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  align-items: center;
  display: flex;
  justify-content: center;
  align-content: center;

  img {
    width: 30vh;
    height: 20vh;
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 20px;
  }

  p {
    margin: auto;
  }
}
</style>
