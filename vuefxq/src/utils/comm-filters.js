const filtersUtil = {
  dictionaryFormat (code, listDate) {
    let temp = listDate
    if (!temp) {
      return null
    } else {
      for (let i = 0; i < temp.length; i++) {
        let item = temp[i]
        if (item.parmVluCod === code) {
          return item.parmVluCod
        }
      }
      return code
    }
  }
}
export default filtersUtil