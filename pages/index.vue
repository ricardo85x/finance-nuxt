<template>
  <div>
    
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">Transactions</h1>

      <AppButton @click="isAdding = !isAdding"> New transaction </AppButton>
    </div>
    
    <TransactionAdd 
      v-if="isAdding" 
      @after-add="afterAdd"
      @cancel="isAdding = false" 
    />

    <div 
      class="mt-6 pb-6 flex items-center space-x-4 border-b border-gray-300">
      <div>
        <AppFormLabel>Description</AppFormLabel>
        <AppFormInput />
      </div>

      <div>
        <AppFormLabel>Category</AppFormLabel>
        <AppFormSelect :options="[{ name: 'Software license', id: 1 }]" />
      </div>
    </div>


    <div class="mt-4">
      <div class="space-y-8">
  
        <div v-for="(group, dataKey) in transactionsGrouped" :key="dataKey">
          <div class="mb-1">
            <div class="font-bold text-sm">{{dataKey}}</div>
          </div>

          <div class="space-y-3">
            <Transaction 
              v-for="transaction in group" 
              :key="transaction.id" 
              :transaction="transaction"  
            />


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { groupBy, orderBy } from "lodash"
import AppButton from "~/components/Ui/AppButton";
import AppFormInput from "~/components/Ui/AppFormInput";
import AppFormLabel from "~/components/Ui/AppFormLabel";
import AppFormSelect from "~/components/Ui/AppFormSelect";
import TransactionAdd from "~/components/Transactions/TransactionAdd.vue"
import Transaction from "~/components/Transactions/Transaction.vue"

export default {
  name: "IndexPage",

  components: {
    AppButton,
    AppFormInput,
    AppFormLabel,
    AppFormSelect,
    TransactionAdd,
    Transaction
  },

  async asyncData({ store}) {

    const transactions = await store.dispatch("transactions/getTransactions")
    return {
      transactions
    }

  },

  data() {
    return {
      isAdding: false
    };
  },

  methods: {
    formatDate(date) {
      var options = { year: 'numeric', month: 'short', day: '2-digit' };
      return new Date(date).toLocaleDateString('pt-br', options)
    },
    formatMoney(amount) {
      return amount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    },
    afterAdd(transaction){
      console.log("whatafork?", transaction)
      this.transactions.push(transaction)
    }
  }, 

  computed: {
    transactionsGrouped() {

      const newObj= {}

      orderBy(this.transactions, 'date', 'desc')
        .map( d => ({
           ...d, 
           localeDate:this.formatDate(d.date),
           localeCurrency: this.formatMoney(d.amount)
      })).forEach(obj => {

        if(obj.localeDate in newObj){
          newObj[obj.localeDate].push(obj)
        } else {
          newObj[obj.localeDate] = [obj]
        }
      })

      return newObj   
    }
  }

};
</script>
