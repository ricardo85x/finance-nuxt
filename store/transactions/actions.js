export default {
    getTransactions(){
        return this.$axios.$get("transactions?_expand=category")
    },
    addTransaction(_ctx, data){
        return this.$axios.$post("transactions", data)
    },
    updateTransaction(_ctx, {id, data}) {
        return this.$axios.put(`transactions/${id}`, data)
    }
}