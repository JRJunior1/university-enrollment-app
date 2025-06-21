# University Enrollment Backend

This is the backend for the University Enrollment Web Application. It is built using Node.js and Express, and it connects to a MySQL database to manage university enrollment processes.

## Project Structure

- **src/**: Contains the source code for the backend application.
  - **controllers/**: Contains the logic for handling requests and responses.
    - `adminController.js`: Functions for admin-related operations.
    - `authController.js`: Functions for authentication.
    - `studentController.js`: Functions for student-related operations.
  - **models/**: Contains the database models.
    - `courseModel.js`: Defines the Course model.
    - `departmentModel.js`: Defines the Department model.
    - `gradeModel.js`: Defines the Grade model.
    - `studentModel.js`: Defines the Student model.
    - `voucherModel.js`: Defines the Voucher model.
  - **routes/**: Contains the route definitions.
    - `adminRoutes.js`: Routes for admin functionalities.
    - `authRoutes.js`: Routes for authentication.
    - `studentRoutes.js`: Routes for student functionalities.
  - `db.js`: Database connection setup.
  - `server.js`: Entry point of the application.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd university-enrollment-app/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the MySQL database:
   - Create a database named `university_enrollment`.
   - Create the necessary tables as specified in the project requirements.

## Running the Application

1. Start the server:
   ```
   npm start
   ```

2. The backend will run on `http://localhost:3000` by default.

## API Endpoints

- **Authentication**
  - `POST /api/auth/login`: Log in a student.
  - `POST /api/auth/logout`: Log out a student.

- **Student Operations**
  - `POST /api/students/register`: Register a new student.
  - `GET /api/students/:indexNumber`: Get student details.

- **Admin Operations**
  - `GET /api/admin/students`: View all registered students.
  - `PUT /api/admin/students/:indexNumber/grades`: Update grades for a student.

## License

This project is licensed under the MIT License. See the LICENSE file for details.