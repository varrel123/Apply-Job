# Apply Job Management System

## Overview

The Apply Job Management System is a web application developed for educational purposes, focusing on penetration testing scenarios related to Privilege Escalation and Insecure File Upload vulnerabilities. The system facilitates the application process where users can apply for jobs, and administrators can manage user accounts and applications.

## Team Members
- Mohammad Varrel Bramasta - 2106733811
- Reichan Adhiguno - 2106703273
  
## Key Features

### User and Admin Roles

- **User Role:** Allows users to log in accounts, apply for jobs, and upload their resumes.
- **Admin Role:** Provides administrators with the capability to manage user accounts, review job applications, and oversee the hiring process.

### Privilege Escalation Testing

- The system is designed to simulate and test for Privilege Escalation vulnerabilities to enhance security awareness.

### Insecure File Upload Testing

- Incorporates Insecure File Upload scenarios, emphasizing the importance of secure file handling practices.

## Functionality

- **User Registration and Login:**
  - Users can create accounts securely, and registered users can log in with their credentials.

- **Job Application:**
  - Users can apply for jobs by submitting their full name, date of birth, and uploading a resume.

- **Admin Dashboard:**
  - Admins have access to a dashboard for managing user accounts and reviewing job applications.

- **Security Testing Scenarios:**
  - The system includes intentional vulnerabilities for Privilege Escalation and Insecure File Upload, creating a safe environment for learning and testing.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Security:** Simulated vulnerabilities for Privilege Escalation and Insecure File Upload

## Getting Started

Follow the steps below to get the project up and running:
1. **install NPM in the terminal in the Backend directory (Optional) :**
   ```bash
   npm install express pg cors body-parser multer path express-session dotenv
2. **Clone the Repository:**
   ```bash
   git clone https://github.com/varrel123/Apply-Job
3. **Run the index.js:**
   ```bash
   npm start
4. **Open in Browser:**
   ```bash
   Visit http://localhost:3300/login.html in your web browser.


