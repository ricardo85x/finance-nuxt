export default {
    getTransactions(){
        return this.$axios.$get("transactions?_expand=category")
    },
    addTransaction(_ctx, data){
        return this.$axios.$post("transactions", data)
    }
}