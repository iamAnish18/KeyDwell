# HomeKey

HomeKey is a platform designed to help users explore beautiful places and rent out their vacant homes to tourists. Whether you're a traveler looking for a cozy place to stay or a homeowner interested in renting out your property, HomeKey has you covered.

## Features

- Discover and explore beautiful destinations.
- List your vacant home for tourists to rent.
- Dynamic and interactive user interface.
- Backend powered by RESTful APIs for seamless communication.
- User-friendly platform for both travelers and homeowners.

### ⚙️ Tools & Technologies

### Frontend
- **HTML**: For the structure of the web pages.
- **CSS**: For styling and creating an appealing UI.
- **JavaScript**: For interactivity and dynamic features.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Backend framework for building web applications.
- **EJS**: Embedded JavaScript templating for dynamic content rendering.
- **RESTful API**: For efficient communication between the client and server.

### Database
- **MongoDB**: A NoSQL database for storing user and property data.

### Package Manager
- **npm**: For managing dependencies and tools.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your computer:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd HomeKey
   ```

2. Install the dependencies:

   ```bash
   npm install express
   npm install ejs
   npm install mongoose
   npm install joi
   npm install methode-override
   npm install ejs-mate
   ```

3. Start the MongoDB server locally.

4. Run the application:

   ```bash
   npm start : http://localhost:8080/homeKey
   ```

5. Open your browser and navigate to `http://localhost:8080/homeKey`.

## Database Schema

The application uses the following database schema for property listings:

```javascript
const sampleListings = [
    {
        title: "Cozy Beachfront Cottage",
        description:
            "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
        price: 1500,
        email_id: "alexsmith123@example.com",
        location: "Malibu",
        country: "United States",
    },
];

module.exports = { data: sampleListings };
```

## Middleware for Error Handling

The application uses the following middleware for centralized error handling:

```javascript
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong" } = err;
    res.render("index/error.ejs", { err });
    // Uncomment the line below if you want to send a plain text error response:
    // res.status(status).send(message);
});
```

## Folder Structure

```
HomeKey/
├── public/           # Static files (CSS, JS, images)
├── views/            # EJS templates
├── routes/           # Routes for handling API and web requests
├── models/           # Database models
├── controllers/      # Request handlers
├── app.js            # Entry point of the app
├── middlewares/      # Custom middleware (error handling, etc.)
└── package.json      # Project metadata and dependencies
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
