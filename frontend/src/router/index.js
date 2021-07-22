import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import Signup from "@/views/Signup.vue";
import Home from "@/views/Home.vue";
import Profile from "@/views/Profile.vue";
import Wall from "@/views/Wall.vue";
import OnePost from "@/views/OnePost.vue";

const routes = [
  // Route accueil/Connection

  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: { path: "/login" },
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
  },

  // Route Inscription
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },

  // Route wall
  {
    path: "/wall",
    name: "Wall",
    component: Wall,
  },

  // Route profil
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },

  // Route OnePost
  {
    path: "/onepost/:id",
    name: "OnePost",
    component: OnePost,
  },

  // Redirection page de login si aucune page trouvée
  {
    path: "/:catchAll(.*)",
    redirect: { path: "/login" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
