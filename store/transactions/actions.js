export default {
    getTransactions(_ctx, filter = {}){
        return this.$axios.$get("transactions", {
            params: {
                _expand: 'category',
                ...filter
            }
        })
    },
    addTransaction(_ctx, data){
        return this.$axios.$post("transactions", data)
    },
    updateTransaction(_ctx, {id, data}) {
        return this.$axios.put(`transactions/${id}`, data)
    }
}