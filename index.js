;(function () {
  const renderTemplate = (template, data, getKey) => {
    const result = template.replace(/{{(.*?)}}/g, (match) => {
      let key = match.split(/{{|}}/).filter(Boolean)[0]

      if (getKey) {
        key = getKey(data, key)
      }

      return data[key]
    })

    return result
  }

  const renderProducts = () => {
    const xgenElementDiv = document.querySelector('#XgenElement')
    const displayProducts = products.filter(
      (product) =>
        parseInt(product.is_in_stock) > 0 &&
        product.product_types.includes('top')
    )

    console.log('displayProducts', displayProducts)

    for (const product of displayProducts) {
      const productDiv = document.createElement('div')
      const productHtml = renderTemplate(htmlTemplate, product, (data, key) => {
        if (key === 'price' && data.sale_price !== 'None') {
          return 'sale_price'
        }

        return key
      })

      productDiv.innerHTML = productHtml
      xgenElementDiv.appendChild(productDiv.firstElementChild)
    }
  }

  renderProducts()
})()
