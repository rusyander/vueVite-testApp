<template>
  <!-- <AddCounter
    msg="hello vue 3"
    plusT="+"
    minusT="-"
    message="counter elements are here"
  /> -->
  <h1>Страница с контактами</h1>
  <div>
    <MyButton @click="dialog" class="margins">Создать контакт</MyButton>
    <MySelect v-model="selectedSort" :options="sortOptions"></MySelect>
    <input v-model="searchQuery" placeholder="Поиск" class="inputSearch" />
  </div>

  <PostList
    :posts="sortedWithInput"
    :updateText="updateText"
    @delete="deletePost"
    v-if="!isPostLoading"
  />

  <div v-else>
    <h1>Loading...</h1>
  </div>
  <MyDialog v-model:show="dialogWisable">
    <PostForm @create="addPosts" />
  </MyDialog>
</template>

<script>
import AddCounter from "./components/addCounter.vue";
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";
import axios from "axios";
export default {
  components: {
    PostForm,
    PostList,
  },
  provide() {
    return {
      fetchUsers: this.fetchUsers,
    };
  },
  data() {
    return {
      posts: [],
      isPostLoading: false,
      updateText: false,
      dialogWisable: false,
      selectedSort: "",
      searchQuery: "",
      update: false,
      sortOptions: [
        { value: "fio", name: "ФИО" },
        { value: "email", name: "Почта" },
        { value: "phone", name: "Телефон" },
      ],
    };
  },
  methods: {
    async addPosts(post) {
      this.posts.shift(post);
      await axios.post("http://localhost:5000/posts", post);
      this.dialogWisable = false;
      this.fetchUsers();
    },
    async deletePost(id) {
      this.posts = this.posts.filter((post) => post.id != id);
      await axios.delete(`http://localhost:5000/posts/${id}`);
    },
    dialog() {
      this.dialogWisable = true;
    },
    async fetchUsers() {
      try {
        this.isPostLoading = true;
        const response = await axios.get("http://localhost:5000/posts");
        this.posts = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isPostLoading = false;
      }
    },
  },
  watch: {},
  computed: {
    sortedPost() {
      return [...this.posts].sort((pos1, pos2) => {
        return pos1[this.selectedSort]?.localeCompare(pos2[this.selectedSort]);
      });
    },
    sortedWithInput() {
      return this.sortedPost.filter((post) => {
        return post.fio
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
          post.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          post.phone.toLowerCase().includes(this.searchQuery.toLowerCase())
          ? post
          : "";
      });
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
<style>
.postMain {
  align-items: center;
  background-color: #f5f5f5;
  padding: 15px;
  border: 1px solid green;
  margin-bottom: 10px;
}
.postContent {
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 0;
  padding: 0;
}
.postTitle {
  font-weight: 600;
}
.postText {
  margin-left: 10px;
}
.margins {
  margin-bottom: 20px;
}
.inputSearch {
  widows: 300px;
  height: 38px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  padding: 0px 15px;
}
</style>
