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
export default {
  name: "PostItem",
  props: {
    post: Object,
  },
  methods: {
    deletePost(id) {
      this.$emit("delete", id);
    },
    update(post) {
      this.$emit("update", post);
    },
  },
};
</script>

<style></style>
