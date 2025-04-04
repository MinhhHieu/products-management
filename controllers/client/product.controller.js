const Product = require("../../model/product.model");

// [GET]: /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false
  }).sort({position: "desc"});

  const newProducts = products.map((item) => {
    item.priceNew = ((item.price * (100 - item.discountPercentage)) /100).toFixed(0);
    return item;
  });

  console.log(newProducts);

  res.render("client/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: newProducts,
  });
};

// [GET]: /products/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
      status: "active"
    };

    const product = await Product.findOne(find);

    res.render("client/pages/products/detail.pug", {
      pageTitle: product.title,
      product: product
    })
  } catch (error) {
    res.redirect("/products");
  }
}
