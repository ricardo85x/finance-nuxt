<template>
    <div class="my-4 mt-10 space-y-4">
        <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div>
                <AppFormLabel>Transaction Date</AppFormLabel>
                <AppFormInput v-model="localTransaction.date" type="date" />
            </div>
            <div>
                <AppFormLabel>Value</AppFormLabel>
                <AppFormInput v-model.number="localTransaction.amount" type="number" />
            </div>
            <div>
                <AppFormLabel>Description</AppFormLabel>
                <AppFormInput v-model="localTransaction.description" />
            </div>
            <div>
                <AppFormLabel>Category</AppFormLabel>
                <AppFormSelect v-model="localTransaction.categoryId"  :options="categories" />
            </div>
        </div>
        <div class="space-x-4 flex items-center justify-end">
            <a 
                @click.prevent.stop="onCancel"

             href="" class="inline-flex text-gray-700 text-sm">
                Cancel
            </a>
            <AppButton @click="updateTransacttion">  Edit </AppButton>
        </div>
    </div>
</template>

<script>
import AppButton from "~/components/Ui/AppButton";
import AppFormInput from "~/components/Ui/AppFormInput";
import AppFormLabel from "~/components/Ui/AppFormLabel";
import AppFormSelect from "~/components/Ui/AppFormSelect";
export default {
    name: "TransactionUpdate",

    components: {
        AppButton,
        AppFormInput,
        AppFormLabel,
        AppFormSelect
    },

    data() {

        const { 
            date, 
            description, 
            amount, 
            category: { id : categoryId } 
        } = this.transaction;

        return {
            localTransaction: { 
                date,
                description,
                amount,
                categoryId
            },
            categories: []
        }
    },

    props: {
        transaction: {
            type: Object,
            default: () => ({})
        }
    },

    async fetch() {
        this.categories = await this.$store.dispatch("categories/getCategories")
    },

    methods: {
        updateTransacttion() {
            this.$store.dispatch("transactions/updateTransaction", {
                id: this.transaction.id, data: this.localTransaction
            })
            .then(res => {
                this.$emit("update", {
                    ...res.data,
                    category: this.categories.find(o => o.id == this.localTransaction.categoryId)

                });
                this.onCancel();
            })
        },
        onCancel(){
            this.$emit('cancel')
        }
    }
}
</script>