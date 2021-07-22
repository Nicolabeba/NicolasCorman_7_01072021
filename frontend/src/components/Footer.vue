<template>
  <footer>
    <div class="footer__contact">
      <p>Mentions légales</p>
      <a href="mailto:?to=email@example.com">Contact</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer__contact {
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  background: rgb(216, 216, 216);
  width: 100%;
  padding-top: 20px;
}
a {
  text-decoration: none;
  color: black;
}
</style>
