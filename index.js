;(function () {
  console.log('products', products)

  const displayProducts = products.filter(
    (product) =>
      parseInt(product.is_in_stock) !== 0 &&
      product.product_types.includes('top')
  )

  // const render = (template, data, map) => {
  //   const result = template.replace(/{{(.*?)}}/g, (match) => {
  //     const mapData = map ? map(data) : data
  //     const key = match.split(/{{|}}/).filter(Boolean)[0]
      
  //     return mapData[key]
  //   })

  //   return result
  // }

  const render1 = (template, data, getKey) => {
    const result = template.replace(/{{(.*?)}}/g, (match) => {
      let key = match.split(/{{|}}/).filter(Boolean)[0]
      key = getKey(key, data)
      
      return data[key]
    })

    return result
  }

  console.log('displayProducts', displayProducts)

  // const placeHolderPattern = /^\{\{[\w_]+\}\}$/
  // const valuePattern = /[\w_]+/

  const xgenElementDiv = document.querySelector('#XgenElement')

  for (const product of displayProducts) {
    const productDiv = document.createElement('div')
    // let tempHtmlTemplate = render(htmlTemplate, product, (o) => {
    //   return {
    //     ...o,
    //     price: o.sale_price !== 'None' ? o.sale_price : o.price,
    //   }
    // })

    const tempHtmlTemplate = render1(htmlTemplate, product, (key, product) => {
      if (key === 'price' && product.sale_price !== 'None') {
        return 'sale_price'
      }

      return key
    })

    productDiv.innerHTML = tempHtmlTemplate

    // const queue = [productDiv]

    // while (queue.length > 0) {
    //   const element = queue.shift()

    //   for (const attr of element.attributes) {
    //     console.log(attr)

    //     if (placeHolderPattern.test(attr.value)) {
    //       console.log(attr.value)
    //       const prop = valuePattern.exec(attr.value)[0]
    //       attr.value = product[prop]
    //     }
    //   }

    //   if (placeHolderPattern.test(element.innerHTML)) {
    //     const prop = valuePattern.exec(element.innerHTML)[0]

    //     const newHtml = render(element.innerHTML, product)
    //     element.innerHTML = newHtml //product[prop]
    //   }

    //   if (element.children) {
    //     for (const child of element.children) {
    //       queue.push(child)
    //     }
    //   }
    // }

    xgenElementDiv.appendChild(productDiv)
  }
})()
