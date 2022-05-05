export default {
    addTransaction(_ctx, data){
        return this.$axios.$post("transactions", data)
    }
}