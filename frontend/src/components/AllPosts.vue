<template>
  <div class="posts">
    <h3>L'actualité de vos collègues</h3>
    <article class="post" v-for="post in posts" :key="post">
      <router-link :to="{ name: 'OnePost', params: { id: post.id } }">
        <div class="post-name">
          Publié par
          <strong>{{ post.first_name }} {{ post.last_name }}</strong> - le
          {{ post.createdAt }}
        </div>
        <div class="post-content">{{ post.content }}</div>
        <div class="post-image"><img :src="post.image" /></div>
        <h5 class="titleComments">Commentaires :</h5>

        <div class="comments" v-for="comment in post.Comments" :key="comment">
          <div class="comment-content">{{ comment.content }}</div>
          <div class="comment-name">
            <strong
              >par {{ comment.first_name }} {{ comment.last_name }}</strong
            >
            - le {{ comment.createdAt }}
          </div>
        </div>
      </router-link>
    </article>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AllPosts",

  data() {
    return {
      posts: [],
    };
  },

  mounted() {
    this.getAllPost();
  },

  methods: {
    getAllPost() {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/api/post/all", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.posts.push(...res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 2rem 0;
}
.posts {
  text-align: center;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column-reverse;
}
.post {
  border: 3px solid #2f68c3;
  border-radius: 10px;
  width: 95%;
  margin: auto;
  height: auto;
  margin-bottom: 0.5rem;
}
.post-name {
  border-radius: 25px 25px 0 0;
  padding: 1rem;
  border-bottom: 1.5px solid rgb(119, 119, 119);
  font-style: italic;
}
.post-content {
  background-color: #fff;
  padding: 1rem 1rem;
  margin-bottom: 10px;
  text-align: initial;
}
.post-image {
  margin-bottom: 10px;
}
.post-image img {
  width: 80%;
}
.comments {
  background-color: #fff;
  border: 1px transparent black;
  border-radius: 10px;
  width: 100%;
  margin: auto;
  margin-bottom: 15px;
  text-align: initial;
  padding: 10px;
}
.comment-content {
  margin-bottom: 10px;
}
.comment-name {
  font-size: 12px;
  font-style: italic;
}
.titleComments {
  width: 88%;
  margin: auto;
  text-align: initial;
  padding: 15px;
}
img {
  border-radius: 10px;
}
a {
  text-decoration: none;
  color: rgb(0, 0, 0);
}
</style>
