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
import { ref } from "vue";
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

  emits: ["deletePost"],
  setup(props, { emit }) {
    const dialogWisable = ref(false);
    const updateTXT = ref(true);
    const postForUpdate = ref([]);
    const updatePost = (post) => {
      dialogWisable.value = true;
      postForUpdate.value = post;
    };
    const deletePost = (id) => {
      emit("delete", id);
    };
    const dialog = () => {
      dialogWisable.value = true;
    };
    return {
      dialogWisable,
      updateTXT,
      postForUpdate,
      deletePost,
      updatePost,
      dialog,
    };
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
