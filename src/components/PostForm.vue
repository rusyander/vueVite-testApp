<template>
  <div>
    <form action="submit" @submit.prevent @click="addPosts">
      <div v-if="updateTXT == false">
        <MyInput type="text" placeholder="fio" v-model="post.fio" />
        <MyInput type="text" placeholder="email" v-model="post.email" />
        <MyInput type="tel" placeholder="phone" v-model="post.phone" />

        <MyButton type="submit" @click="addPosts">Add posts</MyButton>
      </div>
    </form>
    <form action="submit" @submit.prevent>
      <div v-if="updateTXT == true">
        <MyInput type="text" placeholder="fio" v-model="post.fio" />
        <MyInput type="text" placeholder="email" v-model="post.email" />
        <MyInput type="tel" placeholder="phone" v-model="post.phone" />

        <MyButton type="submit" @click="updatePost">Update post</MyButton>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { ref, inject } from "vue";

export default {
  name: "PostForm",
  props: {
    updateTXT: Boolean,
    postForUpdate: String,
  },
  // inject: ["fetchUsers"],

  emits: ["addPosts", "updatePost"],
  setup(props, { emit }) {
    const ngrokUrl = inject("ngrokUrl");
    const fetchUsers = inject("fetchUsers");
    const post = ref({
      fio: "",
      email: "",
      phone: "",
      id: Date.now().toString(),
    });
    const addPosts = () => {
      if (
        post.value.fio.trim() &&
        post.value.email.trim() &&
        post.value.phone.trim()
      ) {
        const newPost = {
          fio: post.value.fio,
          phone: post.value.phone,
          email: post.value.email,
          id: Date.now().toString(),
        };
        emit("create", newPost);
        post.value.fio = post.value.phone = post.value.email = "";
      }
    };

    const updatePost = async () => {
      const newPost = {
        fio: post.value.fio,
        phone: post.value.phone,
        email: post.value.email,
        id: Date.now().toString(),
      };
      const response = await axios.put(
        `${ngrokUrl}/${props.postForUpdate.id}`,
        newPost
      );
      if (response.status == 200) {
        fetchUsers();
      }
    };
    return {
      post,
      addPosts,
      updatePost,
      fetchUsers,
    };
  },
};
</script>

<style></style>
