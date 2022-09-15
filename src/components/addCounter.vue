<!-- <template>
  <div>
    <h5>{{ msg }}</h5>
    <button @click="plus">{{ plusT }}</button>
    <button @click="minus">{{ minusT }}</button>
    <p>
      {{ message }}
    </p>
    <p>count is: {{ count }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
export default {
  name: "AddCounter",
  props: {
    msg: String,
    plusT: String,
    minusT: String,
    message: String,
  },
  setup() {
    const count = ref(0);
    const plus = () => {
      if (count.value >= 10) {
        count.value = count.value + 1;
      } else {
        count.value = count.value + 5;
      }
    };
    const minus = () => {
      count.value--;
    };
    return {
      count,
      plus,
      minus,
    };
  },
};
</script> -->
