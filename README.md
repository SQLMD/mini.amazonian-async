# Amazonian Async
### This was created during my time as a [Code Chrysalis](https://codechrysalis.io) Student

This is exactly the same as Amazonian-Sync, but this time, we'll be learning better ways of dealing with all of the tasks.

You have been hired to work at Amazonian, an online shop where users can buy and rate products.

They store their data in relational format in `.json` files:

* products
* users
* reviews

Each file represents a database table, with an `id` and data.

Your job is to "join" these three tables into the following format:

```js
{
    productName: product.name,
    username: user.username,
    text: review.text,
    rating: review.rating
}
```

We have provided the solutions for Amazonian-Sync here, where we solve this using the synchronous way. But there's definitely better ways to do it using asynchronous practices.

As your knowledge of asynchronous programming practices, you will be required to solve this three ways:

1.  asynchronously using callbacks
1.  using promises
1.  using async & await

You will need to dig around documentation to solve these. Also, [this tutorial](https://github.com/codechrysalis/students/wiki/Asynchronous-Callbacks) may be helpful in understanding asynchronous.
