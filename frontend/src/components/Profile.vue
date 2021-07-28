<template>
  <HeaderLogged />
  <main>
    <h3 class="userName">
      Bonjour
      {{ first_name }} {{ last_name }}
    </h3>

    <button class="delete" @click="deleteProfile">Supprimer le profil</button>
  </main>
</template>

<script>
import axios from "axios";
import HeaderLogged from "@/components/HeaderLogged.vue";

export default {
  name: "Profile",
  components: { HeaderLogged },

  data() {
    return {
      token: "",
      UserId: "",
      first_name: "",
      last_name: "",
    };
  },

  mounted() {
    this.first_name = localStorage.getItem("first_name");
    this.last_name = localStorage.getItem("last_name");
    document.getElementsByClassName("userName")[0].innerHTML = name;
  },

  methods: {
    deleteProfile() {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("UserId");

      axios
        .delete("http://localhost:3000/api/delete/" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res) {
            localStorage.removeItem("token");
            this.$router.push("/signup");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.userName {
  border: 1px transparent black;
  border-radius: 10px;
  width: 90%;
  margin: auto;
  padding: 1rem;
  margin-bottom: 2rem;
}
.delete {
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 10rem;
  background: rgba(239, 68, 68);
  font-weight: bold;
  color: white;
  cursor: pointer;
}
</style>
