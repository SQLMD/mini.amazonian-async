const fs = require("fs");

class ReviewBuilder {
  buildReviewsSync() {
    const products = JSON.parse(
      fs.readFileSync("./data/products.json", "utf-8")
    );
    const reviews = JSON.parse(fs.readFileSync("./data/reviews.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));

    return this.helperForReviews(products, users, reviews);
  }

  buildReviewsAsync(onFinished) {
    let productsJSON = {};
    let usersJSON = {};
    let reviewsJSON = {};

    return fs.readFile("./data/products.json", "utf-8", (err, products) => {
      if (err) {
        return;
      }
      productsJSON = JSON.parse(products);
      fs.readFile("./data/users.json", "utf-8", (err, users) => {
        if (err) {
          return;
        }
        usersJSON = JSON.parse(users);
        fs.readFile("./data/reviews.json", "utf-8", (err, reviews) => {
          if (err) {
            return;
          }
          reviewsJSON = JSON.parse(reviews);
          const result = this.helperForReviews(
            productsJSON,
            usersJSON,
            reviewsJSON
          );
          onFinished(result);
        });
      });
    });
  }

  buildReviewsPromises() {
    return Promise.all([
      this.makeFilePromise("./data/products.json"),
      this.makeFilePromise("./data/users.json"),
      this.makeFilePromise("./data/reviews.json"),
    ]).then((fileData) => {
      const products = fileData[0];
      const users = fileData[1];
      const reviews = fileData[2];

      return new Promise((resolve) => {
        const result = this.helperForReviews(products, users, reviews);
        resolve(result);
      });
    });
  }

  buildReviewsAsyncAwait() {
    const annotateReviews = async () => {
      const products = await this.makeFilePromise("./data/products.json");
      const users = await this.makeFilePromise("./data/users.json");
      const reviews = await this.makeFilePromise("./data/reviews.json");

      return this.helperForReviews(products, users, reviews);
    };

    return annotateReviews();
  }

  helperForReviews(products, users, reviews) {
    const productsMap = {};
    products.forEach((product) => {
      productsMap[product.id] = product.name;
    });

    const usersMap = {};
    users.forEach((user) => {
      usersMap[user.id] = user.username;
    });

    return reviews.map((review) => {
      const productObj = {
        productName: productsMap[review.productId],
        username: usersMap[review.userId],
        text: review.text,
        rating: review.rating,
      };
      return productObj;
    });
  }

  makeFilePromise(filepath) {
    return new Promise((resolve) => {
      fs.readFile(filepath, "utf-8", (err, data) => {
        if (err) {
          return;
        }
        resolve(JSON.parse(data));
      });
    });
  }
}

module.exports = ReviewBuilder;
