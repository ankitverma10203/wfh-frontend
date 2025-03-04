# wfh-frontend

This project is a Work From Home (WFH) management system frontend built with React, TypeScript, and Vite. It provides functionalities for user authentication, WFH request submission, approval workflows, and user dashboards.

**Backend project repo:** [WFH backend code repository](https://github.com/ankitverma10203/wfh)

## Features

* **User Authentication and Authorization:** Secure login and role-based access control.
* **WFH Request Management:** Employees can create, view, and edit their WFH requests.
* **Manager Approval/Rejection:** Managers can review and approve or reject WFH requests.
* **User Role Management:** Administrators can manage user roles and permissions.
* **Notification System:** Real-time notifications for request updates and approvals.
* **Data Table Display:** Efficient display of WFH request data with sorting and filtering.
* **Responsive UI:** Designed with Material UI for a consistent and responsive user experience.

## Technologies Used

* **React:** JavaScript library for building user interfaces.
* **Material UI (@mui/material):** React UI framework for consistent and responsive design.
* **React Router DOM:** Declarative routing for React.
* **Axios:** Promise-based HTTP client for making API requests.
* **npm:** Package manager for JavaScript.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ankitverma10203/wfh-frontend.git
   cd wfh-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

   This will start the Vite development server, and you can view the application in your browser at `http://localhost:5173`.

## Environment Variables

In this project, you can define environment-specific settings by creating a `.env` file in the project root.

### Creating a `.env` File

1. **Add a `.env` File**: Create a `.env` file in the root directory of your project. This file will store your environment variables.

   Example `.env` file:

   ```env
   VITE_API_URL=https://api.example.com
   VITE_DOMAIN=your-auth-domain
   VITE_CLIENTID=your-client-id
   VITE_AUDIENCE=your-api-audience
   VITE_SCOPE=openid profile email
   ```

   In Vite applications, environment variables must start with `VITE_` to be accessible within the codebase. citeturn0search0

2. **Add `.env` to `.gitignore`**: To prevent sensitive data from being committed to version control, add `.env` to your `.gitignore` file:

   ```gitignore
   .env
   ```

### Accessing Environment Variables

In your Vite application, you can access the environment variables using `import.meta.env`:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
const domain = import.meta.env.VITE_DOMAIN;
const clientId = import.meta.env.VITE_CLIENTID;
const audience = import.meta.env.VITE_AUDIENCE;
const scope = import.meta.env.VITE_SCOPE;
```

## Building for Production

To build the application for production, run:

```bash
npm run build
```


This will create an optimized build of the application in the `dist` directory.

## Linting

This project includes ESLint for code linting. To run ESLint, use:

```bash
npm run lint
```


For production applications, it's recommended to expand the ESLint configuration to enable type-aware lint rules. Configure the top-level `parserOptions` property in your ESLint configuration as follows:

```javascript
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.json'],
    },
  },
});
```


This ensures that ESLint can parse TypeScript files correctly and apply relevant linting rules.

## Deployment

The application is configured for deployment on Vercel. The `vercel.json` file in the repository contains the necessary configuration. For more details on deploying to Vercel, refer to their [documentation](https://vercel.com/docs).

## Notes

* Ensure backend API is running.
* Configure environment variables.
