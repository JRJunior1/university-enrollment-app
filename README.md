# University Enrollment Web Application

This project is a full-stack University Enrollment Web Application built using the following technologies:

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express
- **Database**: MySQL

## Project Structure

The project is organized into two main directories: `backend` and `frontend`.

### Backend

The backend is responsible for handling API requests, managing the database, and serving the frontend application. It includes:

- **Controllers**: 
  - `adminController.js`: Functions for admin-related operations (viewing registered students, updating grades).
  - `authController.js`: Functions for authentication (login and logout).
  - `studentController.js`: Functions for managing student operations (registration, retrieving student data).

- **Models**: 
  - `courseModel.js`: Defines the Course model for interacting with the courses table.
  - `departmentModel.js`: Defines the Department model for interacting with the departments table.
  - `gradeModel.js`: Defines the Grade model for interacting with the grades table.
  - `studentModel.js`: Defines the Student model for interacting with the students table.
  - `voucherModel.js`: Defines the Voucher model for interacting with the vouchers table.

- **Routes**: 
  - `adminRoutes.js`: Routes related to admin functionalities.
  - `authRoutes.js`: Routes for authentication.
  - `studentRoutes.js`: Routes related to student functionalities.

- **Database Connection**: 
  - `db.js`: Establishes a connection to the MySQL database.

- **Server**: 
  - `server.js`: Entry point of the backend application, setting up the Express server and middleware.

- **Package Configuration**: 
  - `package.json`: Lists dependencies and scripts for the backend project.

### Frontend

The frontend provides the user interface for the application. It includes:

- **HTML Files**: 
  - `index.html`: Main HTML file for the registration form.
  - `login.html`: HTML file for the login page.
  - `dashboard.html`: HTML file for the student dashboard.
  - `admin.html`: HTML file for the admin panel.

- **CSS**: 
  - `styles.css`: Styles for the frontend application.

- **JavaScript**: 
  - `main.js`: Handles registration form submission and voucher verification.
  - `dashboard.js`: Displays student information and courses on the dashboard.
  - `admin.js`: Handles admin functionalities.

## Installation

To run the project locally, follow these steps:

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd university-enrollment-app
   ```

2. **Set up the backend**:
   - Navigate to the backend directory:
     ```
     cd backend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a MySQL database named `university_enrollment` and set up the required tables as specified in the project documentation.
   - Start the backend server:
     ```
     node src/server.js
     ```

3. **Set up the frontend**:
   - Navigate to the frontend directory:
     ```
     cd ../frontend
     ```
   - Open `public/index.html` in a web browser to access the application.

## Usage

- Register a new student using the registration form.
- Log in using the assigned index number and the default password `group16`.
- Admins can view registered students and update grades through the admin panel.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.