export default {
    getCategories() {
        return this.$axios.$get('categories')
    },
    deleteCategory(ctx, id) {
        return this.$axios.$delete(`categories/${id}`)
    }
}