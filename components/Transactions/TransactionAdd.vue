<template>
  <div>
    <div
      class="
        my-4
        space-y-4
        border-2 border-indigo-200 border-dashed
        bg-indigo-50
        p-5
        rounded-xl
      "
    >
      <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div>
          <AppFormLabel>Transaction Date</AppFormLabel>
          <AppFormInput v-model="form.date" type="date" />
        </div>

        <div>
          <AppFormLabel>Value</AppFormLabel>
          <AppFormInput v-model="form.amount" type="number" />
        </div>

        <div>
          <AppFormLabel>Description</AppFormLabel>
          <AppFormInput v-model="form.description" />
        </div>

        <div>
          <AppFormLabel>Category</AppFormLabel>
          <AppFormSelect
            v-model="form.categoryId"
            :options="categories"
          />
        </div>
      </div>

      <div class="space-x-4 flex items-center justify-end">
        <a 
            href="" 
            class="inline-flex text-gray-700 text-sm"
            @click.stop.prevent="onCancell"

        > Cancel </a>

        <AppButton @click="AddTransaction"> Add </AppButton>
      </div>
    </div>


  </div>
</template>

<script>
import AppButton from "../Ui/AppButton";
import AppFormInput from "../Ui/AppFormInput";
import AppFormLabel from "../Ui/AppFormLabel";
import AppFormSelect from "../Ui/AppFormSelect";

export default {
  name: "TransactionAdd",

  components: {
    AppButton,
    AppFormInput,
    AppFormLabel,
    AppFormSelect,
  },

  data() {
    return {
      form: {
        amount: 0,
        categoryId: "",
        description: "",
        date: "",
      },
      categories: []
    };
  },

  async fetch() {
      this.categories = await this.$store.dispatch("categories/getCategories")
  },

  methods: {
    AddTransaction() {
      this.$store.dispatch("transactions/addTransaction", this.form);
    },

    onCancell() {
        this.$emit('cancel')
    }

  },
};
</script>