<template>
  <div class="container">
    <h3>
      Se connecter
    </h3>
    <form action="Login">
      <div class="form-group">
        <label for="email">Adresse email </label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email"
          placeholder="name@example.com"
        />
        <small></small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Mot de passe</label>
        <input
          type="password"
          class="form-control"
          v-model="password"
          id="exampleInputPassword1"
          placeholder="Mot de passe"
        />
      </div>

      <button v-on:click="login" type="submit" class="btn btn-primary">
        Se connecter
      </button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      UserId: "",
      first_name: "",
      last_name: "",
      token: "",
      email: "",
      password: "",
    };
  },

  methods: {
    login(e) {
      e.preventDefault();

      axios
        .post(
          "http://localhost:3000/api/login",
          {
            email: this.email,
            password: this.password,
          },
          {
            header: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("UserId", res.data.UserId);
            localStorage.setItem("first_name", res.data.first_name);
            localStorage.setItem("last_name", res.data.last_name);
          }
          this.$router.push("/wall");
        })
        .catch(() => {
          alert("Votre email ou votre mot de passe est incorrect");
        });
    },
  },
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
  color: #2f68c3;
}
</style>
