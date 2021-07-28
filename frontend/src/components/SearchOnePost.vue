<template>
  <div class="posts">
    <article class="post">
      <div class="post-name">
        Publié par
        <strong> {{ post.first_name }} {{ post.last_name }} </strong> - le
        {{ post.createdAt }}
      </div>
      <div class="post-content">{{ post.content }}</div>
      <div class="post-image"><img :src="post.image" /></div>

      <h5 v-if="userId === post.id_user" class="titleComments">
        Modifier le contenu du post
      </h5>

      <div class="modifyForm" v-if="userId == post.id_user">
        <label class="titleModify" for="modify"> </label>
        <br />
        <textarea
          class="contentPost"
          name="modify"
          placeholder="Modifier le post "
          v-model="editText"
        ></textarea>
        <br />
        <button class="modifyPost" @click="modifyPost">
          Modifier
        </button>
      </div>

      <div class="allComments">
        <h5 class="titleComments">Commentaires</h5>
        <div
          class="comments"
          v-for="(comment, n) in post.comments"
          :key="comment"
        >
          <div class="comment-content">{{ comment.content }}</div>
          <div>
            <button
              class="deleteComment"
              @click="deleteComment(n)"
              v-if="userId == comment.id_user"
            ></button>
          </div>
          <div class="comment-name">
            <strong
              >par {{ comment.first_name }} {{ comment.last_name }}</strong
            >
            le
            {{ comment.createdAt }}
          </div>
        </div>
      </div>
    </article>
    <button
      class="deletePost"
      @click="deletePost"
      v-if="userId == post.id_user"
    >
      Supprimer la publication
    </button>
  </div>

  <div class="createComments">
    <form class="formComment">
      <div class="formNewComments">
        <textarea
          name="newComment"
          class="contentNewComment"
          placeholder="Poster un commentaire"
          v-model="text"
          required
        ></textarea>
        <button @click="createComment" class="addComment" type="submit">
          Commenter
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchOnePost",

  data() {
    return {
      userId: "",
      text: "",
      editText: "",
      post: {},
    };
  },

  mounted() {
    this.getOnePost();
    this.userId = localStorage.getItem("userId");
  },

  methods: {
    getOnePost() {
      const token = localStorage.getItem("token");
      const idPost = this.$route.params.id;

      axios
        .get(`http://localhost:3000/api/post/${idPost}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.post = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deletePost() {
      const token = localStorage.getItem("token");
      const idPost = this.$route.params.id;

      axios
        .delete(`http://localhost:3000/api/post/${idPost}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: { userId: this.userId },
        })
        .then((res) => {
          if (res) {
            this.$router.push("/wall");
          }
        })
        .catch((error) => {
          console.log("Le post n'a pas pu être supprimé /" + error);
        });
    },

    modifyPost() {
      const idPost = this.$route.params.id;
      const token = localStorage.getItem("token");
      const content = this.editText;

      axios
        .put(
          `http://localhost:3000/api/post/${idPost}`,
          {
            content,
          },

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          this.post.content = content;
        })
        .catch((error) => {
          console.log("Le post n'a pas pu être modifié /" + error);
        });
    },

    createComment() {
      const postId = this.$route.params.id;
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const newComment = {
        first_name: localStorage.getItem("first_name"),
        last_name: localStorage.getItem("last_name"),
        content: this.text,
      };

      axios
        .post(
          `http://localhost:3000/api/comment/${postId}`,
          {
            comment: newComment,
            postId: postId,
            userId: userId,
          },

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          this.post.comments.push(res.data);
        })
        .catch((error) => {
          console.log("Le commentaire n'a pas pu être crée /" + error);
        });
    },

    deleteComment(n) {
      const token = localStorage.getItem("token");
      const commentId = this.post.comments[n].id;
      const commentUserId = this.post.comments[n].id_user;
      const userId = localStorage.getItem("userId");
      axios
        .delete(`http://localhost:3000/api/delete_comment/${commentId}`, {
          data: {
            userId: userId,
            commentUserId: commentUserId,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          this.post.comments.splice(n, 1);
        })
        .catch((error) => {
          console.log("Le post n'a pas pu être supprimé /" + error);
        });
    },
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 2rem;
}

img {
  width: 35%;
  border-radius: 10px;
}
.searchOnePost {
  text-align: center;
}
.posts {
  text-align: center;
  width: 100%;
  margin: auto;
}
.post {
  border: 3px solid #2f68c3;
  border-radius: 10px;
  width: 95%;
  height: 250px;
  margin: auto;
  height: auto;
  margin-bottom: 0.5rem;
  padding: 20px;
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
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  border: 1px transparent black;
  border-radius: 10px;
  width: 87%;
  margin: auto;
  margin-bottom: 15px;
  text-align: initial;
  padding: 15px;
  display: flex;
  justify-content: space-between;
}
.comment-content {
  width: 90%;
  margin-bottom: 10px;
}
.comment-name {
  font-size: 12px;
  font-style: italic;
}
.titleComments {
  width: 90%;
  margin: auto;
  text-align: initial;
  padding: 10px;
}
.deleteComment {
  padding: 7px;
  background-color: rgba(239, 68, 68);
  border-radius: 50%;
  cursor: pointer;
}
.deleteComment:hover {
  background-color: rgb(255, 109, 109);
}

.contentPost {
  padding: 10px;
  border-radius: 10px;
  width: 70%;
}
.addComment {
  background: #2f68c3;
  width: 20%;
  height: 50px;
}
.modifyPost,
.addComment {
  padding: 6px;
  width: 100px;
  background: #2f68c3;
  border-radius: 15px;
  cursor: pointer;
}
.modifyPost:hover,
.addComment:hover {
  background: #3d76d3;
}
.deletePost {
  margin-bottom: 1rem;
  padding: 7px;
  background: rgba(239, 68, 68);
  border-radius: 10px;
  cursor: pointer;
  color: white;
}
.titleModify,
.titleNewComment {
  font-weight: bold;
}
.formNewComments {
  border: 1px solid rgb(119, 119, 119);
  border-radius: 10px;
  width: 95%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  padding: 30px;
}

.modifyForm {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.contentNewComment {
  padding: 15px;
  border-radius: 10px;
  width: 70%;
  height: 50px;
}
</style>
