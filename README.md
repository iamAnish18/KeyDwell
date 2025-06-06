# 🏠 KeyDwell

Welcome to the **KeyDwell – Find & Rent** project!  
KeyDwell is a **full-stack web application** designed to make discovering, listing, and renting homes seamless for travelers and homeowners. With a modern frontend, robust backend, and clear architectural patterns, this platform empowers users to explore beautiful destinations or list their own properties for others to enjoy.

---

## 🌐 Project Overview

KeyDwell delivers an end-to-end solution for home and vacation rental, built with the **MVC (Model-View-Controller) architecture**. This management system ensures the codebase is well-organized, modular, and easy to maintain or extend. Every feature— from interactive UI to secure data management— is structured for clarity and scalability.

---

## 🌟 Features

- **Discover and Explore:** Browse beautiful destinations and find the perfect place to stay.
- **List Your Home:** Homeowners can easily list vacant homes for tourists to rent.
- **Dynamic UI:** Interactive and responsive user interface for a seamless experience.
- **RESTful Backend:** Communication between frontend and backend is powered by RESTful APIs.
- **User-Friendly:** Designed for both travelers and homeowners to use with ease.
- **MVC Code Management:** Clean separation of concerns using the MVC model for easier readability and maintainability.
- **Robust Data Validation:** Ensures all data is validated before entering the system.
- **Custom Error Handling:** Friendly and descriptive errors for a better developer and user experience.

---

## 🛠️ Tools & Technologies

| Icon | Technology         | Description                                                                                  |
|------|--------------------|----------------------------------------------------------------------------------------------|
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="24"/> | **HTML**             | Structure of web pages (frontend)                                                       |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="24"/> | **CSS**              | Styling and layout (frontend)                                                           |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="24"/> | **JavaScript**        | Interactive frontend logic                                                              |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="24"/> | **Node.js**           | JavaScript runtime for server-side (backend)                                            |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="24"/> | **Express.js**        | Framework for building RESTful APIs easily (backend)                                    |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ejs/ejs-original.svg" width="24"/> | **EJS**               | Templating engine for rendering dynamic HTML pages                                      |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="24"/> | **MongoDB**           | NoSQL database for storing listings and user data                                       |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg" width="24"/> | **Mongoose**          | Object Data Modeling (ODM) library for MongoDB in Node.js                               |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" width="24"/> | **Joi**               | Library for data validation (used to validate form data on backend)                     |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" width="24"/> | **method-override**   | Allow overriding HTTP methods for supporting PUT/DELETE in forms                        |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" width="24"/> | **ejs-mate**          | Layout support for EJS templates                                                        |

---

## 🏗️ Folder Structure & MVC Architecture

```
KeyDwell/
├── public/           # Static files (CSS, JS, images)
├── views/            # EJS templates (View layer)
│   ├── listings/     # Listing-related templates
│   ├── users/        # User authentication templates
│   └── partials/     # Common partial views (header, footer, etc.)
├── routes/           # Route definitions (Controller layer)
│   ├── listings.js   # Routes for listing CRUD operations
│   └── users.js      # Routes for authentication & user logic
├── models/           # Mongoose models (Model layer)
│   └── Listing.js    # Listing schema/model
│   └── User.js       # User schema/model
├── controllers/      # Request handlers (Controller logic)
│   ├── listings.js   # Listing controller functions
│   └── users.js      # User controller functions
├── middlewares/      # Custom middleware (error handling, validation, etc.)
├── app.js            # Main application entry point, sets up Express, DB, routes
├── package.json      # Project metadata and dependencies
└── README.md         # Project documentation
```

**MVC Model:**

- **Model:** All schemas and database logic (in `/models`).
- **View:** All EJS templates and public assets (in `/views` and `/public`).
- **Controller:** All business and request logic (in `/controllers` and `/routes`).

---

## 📋 Route Structure Explained

| Route                   | HTTP Method | Description                           | File/Folder         |
|-------------------------|-------------|---------------------------------------|---------------------|
| `/Keydwell/home`        | GET         | Home page                             | `routes/listings.js`, `views/listings/` |
| `/listings`             | GET         | List all available properties         | `routes/listings.js`|
| `/listings/new`         | GET         | Form to create a new listing          | `routes/listings.js`|
| `/listings`             | POST        | Add new property to listings          | `routes/listings.js`|
| `/listings/:id`         | GET         | View single property details          | `routes/listings.js`|
| `/listings/:id/edit`    | GET         | Edit form for an existing listing     | `routes/listings.js`|
| `/listings/:id`         | PUT         | Update listing details                | `routes/listings.js`|
| `/listings/:id`         | DELETE      | Delete a listing                      | `routes/listings.js`|
| `/register`             | GET/POST    | User registration                     | `routes/users.js`   |
| `/login`                | GET/POST    | User login                            | `routes/users.js`   |
| `/logout`               | GET         | User logout                           | `routes/users.js`   |

*All routes are mapped to controller functions for clear separation and easier debugging.*

---

## 📦 Backend Overview

### **Node.js**
- JavaScript runtime for building scalable server-side applications.

### **Express.js**
- Web framework for Node.js to build RESTful APIs.
- Handles routing, middleware, and HTTP requests/responses.

### **EJS**
- Template engine for rendering dynamic HTML pages on the server.

### **MongoDB**
- NoSQL document-oriented database for storing flexible data structures (listings, users, etc.).

### **Mongoose**
- ODM (Object Data Modeling) library for MongoDB.
- Helps define schemas, models, and provides useful methods to interact with the database.

### **RESTful API**
- Backend exposes endpoints for client (frontend) to interact with the database (CRUD operations).

### **Joi**
- Data validation library used to validate input data before saving to the database.

---

## 🏗️ Database Schema Example

```js
// Listing model schema using Mongoose
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: {
        filename: String,
        url: String
    },
    price: Number,
    email_id: String,
    location: String,
    country: String
});

module.exports = mongoose.model('Listing', listingSchema);
```

**Sample Data Object:**
```js
const sampleListings = [
    {
        title: "Cozy Beachfront Cottage",
        description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        },
        price: 1500,
        email_id: "alexsmith123@example.com",
        location: "Malibu",
        country: "United States"
    }
];

module.exports = { data: sampleListings };
```

---

## 🧰 Middleware & Error Handling

### **General Error Handler**
```js
// Handle errors and render error page
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong" } = err;
    res.render("index/error.ejs", { err });
});
```

### **Async Error Wrapper**
```js
// wrapAsync to catch errors in async route handlers
module.exports = (fn) => {
    return function(req, res, next) {
        fn(req, res, next).catch(err => next(err));
    }
}
```

### **Custom Error Class (`expressError.js`)**
```js
class expressError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
}
module.exports = expressError;
```

---

## ✔️ Data Validation with Joi

```js
const Joi = require('joi');

module.exports.keydataSchema = Joi.object({
    keydata: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow("", null),
        price: Joi.number().required().min(0),
        email_id: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required()
    }).required()
});
```

---

## 📦 Installation

1. **Install dependencies**
   ```bash
   npm install express
   npm install ejs
   npm install mongoose
   npm install joi
   npm install method-override
   npm install ejs-mate
   npm install cloudinary
   npm install connect-flash
   npm install cookie-parser
   npm install dotenv
   npm install multer
   npm install multer-storage-cloudinary
   npm install passport
   npm install passport-local
   npm install passport-local-mongoose
   npm install express-session
   npm install ejs-lint
   ```

2. **Start your MongoDB server**, then run the app:
    ```sh
    node app.js
    ```

3. **Run the application:**
   ```bash
   npm start
   # Visit: http://localhost:3000/Keydwell/home
   ```

---

## 🤝 Contributing

- Fork the repo, create a new branch, and send a pull request!
- Please open issues for bug reports or feature suggestions.

---

## 📄 License

This project is licensed under the MIT License.

---

> Made with ❤️ for travelers and homeowners.
