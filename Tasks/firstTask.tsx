// OVERALL STRUCTURE:
// The application will about the wholesale of tulips. It will be an wholesale e-commerce platform for tulips. 
// The final system will include three application. There will be a e-commerce website, admin dashboard and a backend server.
// Our plan is to go over all of them
// E-commerce website will be built on nextjs, 
// The admin page will be built on react.
// The server will be built on nodejs.  

// 1-Setting up the Project:

// Create a new React project using a tool like Create React App.
// Install the necessary dependencies and tools, including Node.js and npm/yarn.

// 2-Folder Structure:

// Create a folder structure that follows best practices, such as separating components, styles, and utilities.
// Example folder structure:
// css
// Copy code
// ├── src
// │   ├── components
// │   │   ├── DashboardHeader.js
// │   │   ├── Sidebar.js
// │   │   ├── ...
// │   ├── pages
// │   │   ├── DashboardPage.js
// │   │   ├── OrdersPage.js
// │   │   ├── ProductsPage.js
// │   │   ├── ...
// │   ├── styles
// │   │   ├── dashboard.css
// │   │   ├── ...
// │   ├── utils
// │   │   ├── api.js
// │   │   ├── ...
// │   ├── App.js
// │   ├── index.js
// │   ├── ...

// 3-Required Pages:

// Dashboard Page: Displays an overview of key metrics, charts, and statistics related to the tulip wholesale platform.
// Orders Page: Lists all orders placed by customers, including details like order status, customer information, and order total.
// Products Page: Allows the admin to manage tulip products, including adding new products, editing existing ones, and removing products.
// Customers Page: Provides a view of customer data, such as their contact information and order history.
// Settings Page: Enables the admin to configure various settings related to the platform, such as payment options, shipping methods, and general preferences.

// 4-Components:

// Header: Renders the header section of the admin dashboard, which typically includes the logo, user profile, and navigation links.
// Footer: Renders the footer section of the admin dashboard, which typically includes attribuiton of project owner.
// Sidebar: Displays a sidebar with navigation links to different pages of the admin dashboard.
// OrderList: Renders a list of orders with relevant information and actions, such as marking orders as shipped or canceling them.
// ProductForm: Provides a form for adding/editing product details like name, description, price, and quantity.
// ProductList: Displays a list of tulip products, allowing the admin to manage them.
// CustomerTable: Shows a table with customer information and order history.

// 5-Modules/Features:

// Authentication: Implement authentication functionality to secure the admin dashboard.
// API Integration: Create API modules or utilities to interact with the backend server, handling requests for fetching and updating data.
// Form Handling: Utilize form libraries like Formik or react-hook-form for managing form state and validation.
// Data Visualization: Use charting libraries like Chart.js or Recharts to visualize key metrics and statistics.
// Routing: Implement React Router to handle navigation between different pages of the admin dashboard.
// Error Handling: Add error handling components and logic to display meaningful error messages to the admin in case of API failures or other errors.

// 6-Required Packages:

// react: The core library for building the user interface.
// react-dom: Allows rendering React components into the DOM.
// react-router-dom: Handles routing within the admin dashboard.
// axios: A popular HTTP client for making API requests.
// chart.js: A charting library for visualizing data.
// formik or react-hook-form: Libraries for managing form state and validation.
// react-icons: Provides a collection of icons for use in the


// TASK-1
// 1-Look at the internet sources regarding the folder structure of a react application and apply one of them 
// (It can be changed wrt further needs. Do not worry about the availablity of different variations to much.)
// 2-Build your first page which is dashboard. Dashboard page should contain the following components.
//     Header
//     Footer
// 3-Do not worry about routing at the first place. We will handle this later.
// 4-Try to implement moduling structure for scss. For each component there will be a module.scss file like header.module.scss
// 5-Header component may include 
//     a logo (use react logo for now), 
//     user avatar at the right to react account page ( at the most right and clickable, use my photo in the public folder for now, i will provide more relevant assets later)
//     user name and a greeting message( this component should be left side of the user avatar  )
// 6-Our aim is for this task to generate basic and stateless function-based react components and placing them in a page commponent.
// 7-The second aim is to be able to style them using scss.
// 8-Do not worry top much about typescript for now, we will focus on it after basics.
// 9-Once you finish your work, you can version it as 1.1.0 and so on, just increment the second number for each new version.
// 10-You can use any material to understand the things, but once you understand it, try to code it yourself.