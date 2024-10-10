Restaurants
├── BackEnd/
│   ├── DB/
│   │   ├── CannectDB.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── orderController.js
│   │   ├── RegistrationController.js
│   │   ├── userController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   ├── models/
│   │   ├── Order.js
│   │   ├── User.js
|   |   |--Registration.js
|   |   |--ForgotPassword.js
|   |   |--Login.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── userRoutes.js
│   ├── utils/
│   │   ├── emailSender.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── Restaurant/
│   ├── public/
│   │   ├── index.html
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   │   ├── restobg.jpg
│   │   │   │   ├── logo.png
│   │   ├── components/
│   │   │   ├── Admin/
│   │   │   │   ├── Dashboard.js
│   │   │   │   ├── OrderList.js
│   │   │   │   ├── OrderDetails.js
│   │   │   │   ├── UserManagement.js
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Registration.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   ├── ForgotPasswordAndEnterOTP.jsx
│   │   │   ├── Customer/
│   │   │   │   ├── Menu.js
│   │   │   │   ├── ItemDetails.jsx
│   │   │   │   ├── Cart.js
│   │   │   │   ├── OrderSummary.jsx
│   │   │   ├── Kitchen/
│   │   │   │   ├── OrderManagement.jsx
│   │   │   ├── Shared/
│   │   │   │   ├── ChangePassword.jsx
│   │   │   │   ├── EditProfile.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── Layout.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── OrderContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useOrder.js
│   │   ├── routes
│   │   │   ├── Additemroutes.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── AdminPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── RegistrationPage.js
│   │   │   ├── ForgotPasswordPage.js
│   │   │   ├── MenuPage.js
│   │   │   ├── ItemDetailsPage.js
│   │   │   ├── CartPage.js
│   │   │   ├── OrderSummaryPage.js
│   │   │   ├── OrderManagementPage.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── orderService.js
│   │   ├── utils/
│   │   │   ├── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── App.css
│   │   ├── index.css
│   ├── .env
│   ├── package.json
│
├── README.md
├── .gitignore
└── package.json






Backend Details
config/

db.js: Database connection configuration.
controllers/

authController.js: Handles authentication logic.
orderController.js: Manages order-related operations.
userController.js: Manages user-related operations.
middlewares/

authMiddleware.js: Middleware for authentication.
errorMiddleware.js: Error handling middleware.
models/

Order.js: Order schema and model.
User.js: User schema and model.
routes/

authRoutes.js: Routes for authentication.
orderRoutes.js: Routes for order operations.
userRoutes.js: Routes for user operations.
utils/

emailSender.js: Utility function to send emails.
server.js: Main server file.

.env: Environment variables.

package.json: Backend dependencies.

Frontend Details
public/

index.html: Main HTML file.
src/

assets/

images/: Images used in the application.
restobg.jpg: Background image.
logo.png: Logo image.
components/

Admin/

Dashboard.js: Admin dashboard.
OrderList.js: List of orders.
OrderDetails.js: Detailed view of an order.
UserManagement.js: User management panel.
Auth/

Login.js: Login component.
Registration.js: Registration component.
ForgotPassword.js: Forgot password component.
ForgotPasswordAndEnterOTP.js: Component for entering OTP.
Customer/

Menu.js: Menu listing.
ItemDetails.js: Detailed view of a menu item.
Cart.js: Shopping cart.
OrderSummary.js: Order summary.
Kitchen/

OrderManagement.js: Order management for kitchen staff.
Shared/

Header.js: Common header component.
Footer.js: Common footer component.
context/

AuthContext.js: Context for authentication state.
OrderContext.js: Context for order state.
hooks/

useAuth.js: Custom hook for authentication.
useOrder.js: Custom hook for order management.
pages/

HomePage.js: Home page.
AdminPage.js: Admin dashboard page.
LoginPage.js: Login page.
RegistrationPage.js: Registration page.
ForgotPasswordPage.js: Forgot password page.
MenuPage.js: Menu page.
ItemDetailsPage.js: Menu item details page.
CartPage.js: Shopping cart page.
OrderSummaryPage.js: Order summary page.
OrderManagementPage.js: Order management page for kitchen.
services/

authService.js: Authentication service.
orderService.js: Order service.
utils/

api.js: API utility functions.
App.js: Main app component.

index.js: Entry point of the React application.

App.css: Global CSS for the app.

index.css: Global CSS.

.env: Environment variables.

package.json: Frontend dependencies.

Root Files
README.md: Project documentation.
.gitignore: Git ignore file.
package.json: Project metadata and dependencies.




rLn4iVkJwgwj8am6 mongodb password




{
    "firstName":"jemish",
    "lastName":"mangukiya",
    "email":"mangukiyakemish@gmail.com",
    "phoneNumber": "9898714353546",
    "country":"hitgif",
       "city":"surat",
    "selectedRestaurant": "a",
    "password": "1234",
    "confirmPassword": "1234",
    "agreedToTerms": "True",
    "state":"surat"
}


//UeZ63LUVbixEw0bbmbjDtDfpQtrwroJ2aTp3VCua9q1Q1HQGyzC09FyHMQ4NfaFk