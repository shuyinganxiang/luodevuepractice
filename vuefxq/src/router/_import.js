module.exports = fileUrl => () => import(`@/pages/${fileUrl}.vue`)
