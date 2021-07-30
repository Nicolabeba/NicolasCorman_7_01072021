<template>
  <div class="createPost">
    <h2>Exprimez-vous...</h2>
    <div class="newPost">
      <form class="formCreate">
        <div class="formNewPost">
          <label for="content"></label>
          <textarea
            name="content"
            class="contentNewPost"
            placeholder="Quoi de neuf, Docteur ?"
            required
            v-model="content"
          ></textarea>
          <br />
          <button @click="createPost" type="submit">Publier</button>
        </div>

        <div class="formNewPost">
          <label for="image">
            <input
              class="imageNewPost"
              type="file"
              name="image"
              ref="image"
              v-on:change="upload"
            />
          </label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreatePost",

  data() {
    return {
      content: "",
      image: null,
    };
  },
  methods: {
    upload(event) {
      const file = event.target.files[0];
      this.image = file;
    },
    createPost(e) {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const first_name = localStorage.getItem("first_name");
      const last_name = localStorage.getItem("last_name");
      const UserId = localStorage.getItem("UserId");

      const formData = new FormData();
      const imagefile = this.image;
      formData.append("image", imagefile);
      formData.set("first_name", first_name);
      formData.set("last_name", last_name);
      formData.set("UserId", UserId);
      formData.set("content", this.content);

      if (!this.content) {
        // TODO: à afficher dans le navigateur/création d'une nouvelle balise small
        console.log("Content can not be empty!");
      }

      axios
        .post(
          "http://localhost:3000/api/post/create",
          formData,

          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res) {
            window.location.reload();
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
.formCreate {
  width: 100%;
}

.formNewPost {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-top: 20px;
}
.newPost {
  display: flex;
  justify-content: center;
}
.createPost {
  border: 1px solid #2f68c3;
  border-radius: 10px;
  width: 95%;
  margin: auto;
  padding: 1rem;
  margin-bottom: 1rem;
}

.contentNewPost {
  width: 100%;
  padding: 5px;
  border-radius: 10px;
}
button {
  width: 5rem;
  margin-left: 10px;
  background-color: #2f68c3;
  border-radius: 10px;

  cursor: pointer;
  color: white;
  font-weight: 500;
}
button:hover {
  background-color: #3572d4;
}
</style>
