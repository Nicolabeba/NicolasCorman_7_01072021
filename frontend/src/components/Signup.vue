<template>
  <div class="container">
    <h3>
      S'inscrire
    </h3>
    <form>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="firstName">prénom</label>
          <input
            data-label="prénom"
            type="text"
            v-model="first_name"
            class="form-control"
            id="firstName"
            placeholder="John"
          />
          <!-- <small @v-if="$v.form.first_name.$invalid"
            >Le prénom {{ first_name }} est invalide.</small
          > -->
        </div>
        <div class="form-group col-md-6">
          <label for="lastName">Nom</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            v-model="last_name"
            placeholder="Difool"
          />
          <!-- <small @v-if="$v.form.last_name.$invalid">Le nom {{ last_name }} est invalide.</small> -->
        </div>
      </div>
      <div class="form-group">
        <label for="email">adresse Email </label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email"
          placeholder="name@example.com"
        />
        <!-- <small @v-if="$v.form.email.$invalid">L'email {{ email }} est invalide.</small> -->
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Mot de passe</label>
        <input
          type="password"
          class="form-control"
          v-model="password"
          id="password"
          placeholder="Mot de passe"
        />
        <!-- <small @v-if="$v.form.password.$invalid"
          >Le mot de passe est invalide.</small
        > -->
      </div>
      <div class="form-group">
        <label for="verifPasswordSignup">Confirmer le mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="verifPasswordSignup"
          v-model="password_confirmation"
          placeholder="Mot de passe"
        />
        <small id="password_bis"></small>
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1"
          >J'accepte les CGU.</label
        >
        <button v-on:click="signup" type="submit" class="btn btn-primary">
          S'inscrire
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
// import {
//   required,
//   email,
//   minLength,
// } from "../../node_modules/vuelidate/lib/validators";

export default {
  name: "Signup",
  // mixins: { required, email, minLength },

  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },

  // validations: {
  //   form: {
  //     first_Name: {
  //       required,
  //     },

  //     last_Name: {
  //       required,
  //     },
  //     email: {
  //       required,
  //       email,
  //     },
  //     password: {
  //       required,
  //       minLength,
  //     },
  //   },
  // },

  methods: {
    signup(e) {
      e.preventDefault();
      if (
        this.password === this.password_confirmation &&
        this.password.length > 3
      ) {
        axios
          .post(
            "http://localhost:3000/api/signup",
            {
              first_name: this.first_name,
              last_name: this.last_name,
              email: this.email,
              password: this.password,
            },

            {
              header: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            this.$router.push("/login");
            alert("Félicitation ! Vous venez de vous inscrire !");
          })

          .catch(() => {
            alert(
              "Un des champs n'a pas été correctement rempli. (NB: Le mot de passe doit contenir plus de 3 carractères.)"
            );
          });
      } else if (
        this.password !== this.password_confirmation ||
        this.password.length <= 3
      ) {
        alert(
          "Le mot de passe doit contenir plus de 3 carractères ou les mots de passe ne sont pas identiques"
        );
      }
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
  color: #1e1386;
}
</style>
