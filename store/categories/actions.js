export default {
    getCategories() {
        return this.$axios.$get('categories')
    },
    deleteCategory(_ctx, id) {
        return this.$axios.$delete(`categories/${id}`)
    },
    updateCategory(_ctx, {id, data }) {
        return this.$axios.$patch(`categories/${id}`, data)
    },
    addCategory(_ctx, data) {
        return this.$axios.$post(`categories`, data) 
    }
}