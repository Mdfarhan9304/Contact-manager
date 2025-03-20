# Contact Manager Application

A full-stack contact management application that allows users to view, add, edit, delete, and save contacts securely. The app uses JWT authentication and follows modern web development practices with Next.js, MongoDB, Tailwind CSS, and TypeScript.

## Features

- User authentication with JWT
- Create, Read, Update, and Delete (CRUD) functionality for contacts
- Secure password hashing using Bcrypt
- Responsive and modern UI with Tailwind CSS
- Full-stack implementation using Next.js (Frontend & Backend)
- MongoDB as the database
- TypeScript for type safety

## Tech Stack

- **Frontend & Backend:** Next.js
- **Database:** MongoDB
- **Styling:** Tailwind CSS
- **Authentication:** JWT (JSON Web Token)
- **Password Hashing:** Bcrypt
- **Language:** TypeScript

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/contact-manager.git
   ```
2. Navigate to the project directory:
   ```sh
   cd contact-manager
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables:
   Create a `.env.local` file and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
5. Run the development server:
   ```sh
   npm run dev
   ```
6. Open your browser and visit `http://localhost:3000`.

## Usage

1. Register/Login to the application.
2. Add new contacts with necessary details.
3. Edit or delete existing contacts.
4. Securely store and retrieve contacts.

## Folder Structure

```
contact-manager/
│── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.ts
│   │   │   ├── register.ts
│   │   ├── contacts/
│   │   │   ├── index.ts
│   │   │   ├── [id].ts
│── components/
│── styles/
│── utils/
│── models/
│── middleware/
│── public/
│── .env.local
│── next.config.js
│── package.json
│── tsconfig.json
│── README.md

```
## Contributions

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any queries or suggestions, feel free to reach out or create an issue on GitHub.

