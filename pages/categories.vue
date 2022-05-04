<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">Categories</h1>
    </div>

    <div class="mt-6">
      <div>
        <div class="flex items-center space-x-3">
          <div>
            <AppFormInput v-model="name" @keyup.enter="addCategory" />
          </div>

          <AppButton @click="addCategory"> Add </AppButton>
        </div>
      </div>

      <table class="mt-4 min-w-full divide-y divide-gray-200 shadow">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
            >
              Category
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
         

          <tr
            v-for="category in categories"
            :key="category.id"
            class="bg-white"
          >
            <td
              class="
                px-6
                py-4
                whitespace-nowrap
                text-sm
                font-medium
                text-gray-900
              "
            >
              <div v-if="category.is_updating" class="w-72">
                <AppFormInput v-model="category.name" @keyup.enter="updateCategory(category)" />
              </div>

              <div v-else>
                {{ category.name }}
              </div>
            </td>

            <td
              class="
                px-6
                py-4
                whitespace-nowrap
                text-right text-sm
                font-medium
                space-x-4
              "
            >
              <a
                href="#"
                class="text-indigo-600 hover:text-indigo-900"
                @click.stop.prevent="toUpdate(category)"
                >Edit
              </a>

              <a
                href="#"
                @click.stop.prevent="deleteCategory(category.id)"
                class="text-red-600 hover:text-red-900"
                >Delete
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AppButton from "~/components/Ui/AppButton";
import AppFormInput from "~/components/Ui/AppFormInput";
import AppFormLabel from "~/components/Ui/AppFormLabel";

export default {
  name: "categoriesPage",

  components: {
    AppButton,
    AppFormInput,
    AppFormLabel,
  },

  async asyncData({ store }) {
    return {
      categories: await store
        .dispatch("categories/getCategories")
        .then((response) =>
          response.map((o) => ({ ...o, is_updating: false }))
        ),
    };
  },

  data() {
    return {
      name: ''
    };
  },

  methods: {
    deleteCategory(id) {
      this.$store.dispatch("categories/deleteCategory", id)
      .then(() => {
        this.categories = this.categories.filter(obj => obj.id !== id)
      })
    },
    toUpdate(category) {
      category.is_updating = true;
    },
    updateCategory(category) {
      const data = {
        name: category.name
      }
      this.$store.dispatch("categories/updateCategory", {
        id: category.id,
        data,
      }).then(() => {
        category.is_updating = false
      });
    },
    addCategory() {

      if (!this.name) {
        return
      }
      const data = {
        name: this.name
      }
      this.$store.dispatch("categories/addCategory", data)
      .then( response => {
        this.categories.push(response)
        this.name = ""
      })
    }
  },
};
</script>
