<template>
  <h1>Страница с контактами</h1>
  <div class="header">
    <div>
      <MyButton @click="dialog" class="margins">Создать контакт</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions"></MySelect>
      <input v-model="searchQuery" placeholder="Поиск" class="inputSearch" />
    </div>
    <div class="users">
      <h2 class="userName">{{ userName }}</h2>
      <MyButton @click="logout" class="marginsNoPaddongs">Выйти</MyButton>
    </div>
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
import PostForm from "./PostForm.vue";
import PostList from "./PostList.vue";
import axios from "axios";
import { ref, onMounted, computed, inject } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "AppPosts",
  components: {
    PostForm,
    PostList,
  },
  provide() {
    return {
      fetchUsers: this.fetchUsers,
    };
  },

  setup() {
    const ngrokUrl = inject("ngrokUrl");
    const router = useRouter();
    const posts = ref([]);
    const isPostLoading = ref(false);
    const updateText = ref(false);
    const dialogWisable = ref(false);
    const selectedSort = ref("");
    const searchQuery = ref("");
    const update = ref(false);
    const sortOptions = ref([
      { value: "fio", name: "ФИО" },
      { value: "email", name: "Почта" },
      { value: "phone", name: "Телефон" },
    ]);
    const userName = ref(localStorage.getItem("userName"));
    const addPosts = async (post) => {
      try {
        await axios.post(`${ngrokUrl}/posts`, post);
        dialogWisable.value = false;
        fetchUsers();
      } catch (e) {
        console.log(e);
      }
    };
    const deletePost = async (id) => {
      posts.value = posts.value.filter((post) => post.id != id);
      await axios.delete(`${ngrokUrl}/posts/${id}`);
    };
    const dialog = () => {
      dialogWisable.value = true;
    };
    const fetchUsers = async () => {
      try {
        isPostLoading.value = true;
        const response = await axios.get(`${ngrokUrl}/posts`);

        posts.value = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        isPostLoading.value = false;
      }
    };
    const logout = () => {
      localStorage.setItem("auth", "false");
      router.push("/login");
    };
    const sortedPost = computed(() => {
      return [...posts.value].sort((pos1, pos2) => {
        return pos1[selectedSort.value]?.localeCompare(
          pos2[selectedSort.value]
        );
      });
    });
    const sortedWithInput = computed(() => {
      return sortedPost.value.filter((post) => {
        return post.fio
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
          post.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          post.phone.toLowerCase().includes(searchQuery.value.toLowerCase())
          ? post
          : "";
      });
    });

    onMounted(() => {
      fetchUsers();
    });
    return {
      posts,
      isPostLoading,
      updateText,
      dialogWisable,
      selectedSort,
      searchQuery,
      update,
      sortOptions,
      userName,
      addPosts,
      deletePost,
      dialog,
      fetchUsers,
      logout,
      sortedWithInput,
      sortedPost,
    };
  },
};
</script>
<style>
.header {
  display: flex;
  justify-content: space-between;
}
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
.marginsNoPaddongs {
  margin-bottom: 20px;
  margin-right: 0 !important;
  padding: 0;
}
.inputSearch {
  widows: 300px;
  height: 38px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  padding: 0px 15px;
}
.users {
  display: flex;
}
.userName {
  margin-right: 15px;
}
</style>
