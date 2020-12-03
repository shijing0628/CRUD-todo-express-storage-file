# Todo List API

Port = 4000

```
npm start
```

```bash

Add routers.js file for get, post, put, patch, delete db.json file.

```

This repository only comes with ESLint, git, and database configuration configuration. An API for the database has been provided for you in `src/db.js` Follow the steps below to complete the lab. Express does **not** come installed.

## Database API Example Usage

```js
"use strict";

const db = require("./db");

// Getting all items
db.getItems()
	.then((items) => {
		console.log(items); // Shows all items in database

		// Add an item
		return db.createItem({
			name: "My New Item",
			description: "A new thing for me to do.",
		});
	})
	.then((newItem) => {
		console.log(newItem); // Newly inserted item with all fields

		// Update an item
		return db.updateItem({ ...item, name: "The name has changed" });
	})
	.then((updatedItem) => {
		console.log(updatedItem); // Item with the updated name field

		// Get item by ID
		return db.getItemById(updatedItem.id);
	})
	.then((item) => {
		console.log(item); // Item queried by ID

		// Delete an item
		return db.removeItemById(updatedItem.id);
	});
```

### Sample Item

```js
{
	id: 2,
	name: 'Example Item',
	description: 'The description is here!',
	isComplete: 0, // 1 if complete, else 0
}
```

## Part One: Setup and Getting List Items

1. Setup an Express instance on a given port by copying the file `.env.example` and naming it as `.env`
1. Create a module `src/routes.js`
    1. Export an instance of `express.Router` and use it in the Express application in `src/index.js`
    1. Define a **_GET_** request with a path of `/item`
        1. Should respond in JSON with an array of all todo list items
        1. Must respond with **200** status code on success
    1. Define a **_GET_** request with a path of `/item/:id`
        1. Should respond in JSON with a single item object
        1. Must respond with **200** status code on success

## Part Two: Creating, Updating, and Deleting List Items

1. Define a **POST** request with a path of `/item`
    1. Should respond in JSON with a single JSON item object
    1. Must respond with a **201** status code on success
1. Define a **PUT** request with a path of `/item/:id`
    1. Should respond in JSON with a single JSON item object
    1. Must respond with a **200** status code on success
1. Define a **PATCH** request with a path of `/item/:id`
    1. Should respond in JSON with a single JSON item object
    1. Must respond with a **200** status code on success
1. Define a **DELETE** request with a path of `/item/:id`
    1. Should respond with an empty body
    1. Must respond with a **204** status code regardless if the item existed or not
