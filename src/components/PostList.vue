<template>
  <div v-if="posts.length == 0">
    <h1>No posts</h1>
  </div>
  <div v-else>
    <transition-group name="kontactList">
      <PostItem
        v-for="post of posts"
        :key="post.id"
        :post="post"
        @delete="deletePost"
        @update="updatePost"
      />
    </transition-group>
  </div>

  <MyDialog v-model:show="dialogWisable">
    <PostForm
      :updateTXT="updateTXT"
      :postForUpdate="postForUpdate"
      @update="updatePosts"
    />
  </MyDialog>
</template>

<script>
import PostItem from "./PostItem.vue";
import PostForm from "./PostForm.vue";
import axios from "axios";
export default {
  components: {
    PostItem,
    PostForm,
  },
  name: "PostList",
  props: {
    posts: Array,
    updateText: Boolean,
  },
  data() {
    return {
      dialogWisable: false,
      updateTXT: true,
      postForUpdate: [],
    };
  },
  methods: {
    deletePost(id) {
      this.$emit("delete", id);
    },

    async updatePost(post) {
      this.dialogWisable = true;
      this.postForUpdate = post;
      console.log(this.postForUpdate);
    },
    dialog() {
      this.dialogWisable = true;
    },
  },
};
</script>

<style>
.kontactList-item {
  display: inline-block;
  margin-right: 10px;
}
.kontactList-enter-active,
.kontactList-leave-active {
  transition: all 0.4s;
}
.kontactList-enter,
.kontactList-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.kontactList-list-move {
  transition: all 0.5s ease;
}
</style>
