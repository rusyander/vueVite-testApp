<template>
  <div>
    <form action="submit" @submit.prevent @click="addPosts">
      <div v-if="updateTXT == false">
        <MyInput type="text" placeholder="fio" v-model="post.fio" />
        <MyInput type="text" placeholder="email" v-model="post.email" />
        <MyInput type="text" placeholder="phone" v-model="post.phone" />

        <MyButton type="submit" @click="addPosts">Add posts</MyButton>
      </div>
    </form>
    <form action="submit" @submit.prevent>
      <div v-if="updateTXT == true">
        <MyInput type="text" placeholder="fio" v-model="post.fio" />
        <MyInput type="text" placeholder="email" v-model="post.email" />
        <MyInput type="text" placeholder="phone" v-model="post.phone" />

        <MyButton type="submit" @click="updatePost">Update post</MyButton>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PostForm",
  props: {
    updateTXT: Boolean,
    postForUpdate: String,
  },
  inject: ["fetchUsers"],
  data() {
    return {
      post: {
        fio: "",
        email: "",
        phone: "",
        id: Date.now().toString(),
      },
    };
  },
  methods: {
    addPosts() {
      if (
        this.post.fio.trim() &&
        this.post.email.trim() &&
        this.post.phone.trim()
      ) {
        const newPost = {
          fio: this.post.fio,
          phone: this.post.phone,
          email: this.post.email,
          id: Date.now().toString(),
        };
        this.$emit("create", newPost);
        this.post.fio = this.post.phone = this.post.email = "";
      }
    },

    async updatePost() {
      const updatePosts = {
        fio: this.post.fio,
        phone: this.post.phone,
        email: this.post.email,
        id: Date.now().toString(),
      };

      const response = await axios.put(
        `http://localhost:5000/posts/${this.postForUpdate.id}`,
        updatePosts
      );
      if (response.status == 200) {
        this.fetchUsers();
      }
    },
  },
};
</script>

<style></style>
