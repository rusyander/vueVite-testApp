<template>
  <div class="postMain">
    <div class="postContent">
      <div class="postTitle">ФИО:</div>
      <div class="postText">{{ post.fio }}</div>
    </div>

    <div class="postContent">
      <div class="postTitle">Почта:</div>
      <div class="postText">{{ post.email }}</div>
    </div>

    <div class="postContent">
      <div class="postTitle">Телефон:</div>
      <div class="postText">{{ post.phone }}</div>
    </div>

    <MyButton @click="deletePost(post.id)">Delete</MyButton>
    <MyButton @click="update(post)">Update</MyButton>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "PostItem",
  props: {
    post: Object,
  },
  emits: ["deletePost", "update"],
  setup(props, { emit }) {
    const deletePost = (id) => {
      emit("delete", id);
    };
    const update = (post) => {
      emit("update", post);
    };
    return {
      deletePost,
      update,
    };
  },
};
</script>

<style></style>
