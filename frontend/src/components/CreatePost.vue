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
            placeholder="Quoi de beau ?"
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
      image: "",
    };
  },
  methods: {
    createPost(e) {
      e.preventDefault();
      const token = localStorage.getItem("token");

      axios
        .post(
          "http://localhost:3000/api/post/create",
          { content: this.content, image: this.image },
          {
            headers: {
              "Content-Type": "application/json",
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
  border: 1px solid black;
  border-radius: 20px;
  width: 90%;
  margin: auto;
  padding: 2rem;
  margin-bottom: 1rem;
}

.contentNewPost {
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
}
button {
  width: 5rem;
  margin-left: 10px;
  background-color: #2f68c3;
  border-radius: 10px;
  cursor: pointer;
}
button:hover {
  background-color: #be8a8a;
}
</style>
