# Frontend University Enrollment Web Application

This is the frontend part of the University Enrollment Web Application. It provides the user interface for students and admins to interact with the system.

## Project Structure

The frontend project is organized as follows:

```
frontend
├── public
│   ├── index.html       # Main registration form
│   ├── login.html       # Login page for students
│   ├── dashboard.html    # Student dashboard displaying information and courses
│   ├── admin.html       # Admin panel for managing students and grades
│   ├── css
│   │   └── styles.css   # CSS styles for the application
│   └── js
│       ├── main.js      # JavaScript for registration form and voucher verification
│       ├── dashboard.js  # JavaScript for displaying student information and courses
│       └── admin.js      # JavaScript for admin functionalities
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the frontend directory:
   ```
   cd university-enrollment-app/frontend
   ```

3. Open the `public/index.html` file in your web browser to access the application.

## Features

- **Registration Form**: Students can register using a voucher code, first name, other names, and select a department.
- **Login Page**: Students can log in using their assigned index number and a default password.
- **Student Dashboard**: Displays student information, courses based on the selected department, and grades.
- **Admin Panel**: Allows admins to view all registered students and update grades.

## Usage

- To register, fill out the registration form on the `index.html` page and submit.
- After registration, students can log in using their index number and the default password `group16`.
- Admins can access the admin panel to manage student records and grades.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.