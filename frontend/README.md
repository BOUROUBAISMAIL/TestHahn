# React Authentication App with Clean Architecture

A modern React application implementing authentication (login/register) using Clean Architecture principles with **function-based modules**, Tailwind CSS for styling, and Axios for API communication.

## 🏗️ Architecture Overview

This application follows Clean Architecture principles with **function-based modules** (no classes) and the following structure:

```
src/
├── domain/                 # Business logic layer
│   ├── entities/          # Core business objects (factory functions)
│   ├── repositories/      # Repository interfaces (factory functions)
│   └── usecases/         # Business use cases (factory functions)
├── data/                  # Data layer
│   └── repositories/      # Repository implementations (factory functions)
├── infrastructure/        # External concerns
│   ├── api/              # API client (factory functions)
│   └── storage/          # Session storage (utility functions)
└── presentation/         # UI layer
    ├── components/       # Reusable UI components (functional components)
    ├── pages/           # Page components (functional components)
    ├── hooks/           # Custom React hooks
    ├── context/         # React context providers
    └── utils/           # Presentation utilities
```

## 🚀 Features

- **Clean Architecture**: Separation of concerns with domain, data, infrastructure, and presentation layers
- **Function-Based Modules**: All business logic uses factory functions and utility functions (no classes)
- **Authentication**: Login and registration with token-based authentication
- **Session Management**: Automatic token storage and retrieval
- **Protected Routes**: Route protection for authenticated users
- **Aesthetic UI**: Modern, responsive design using Tailwind CSS
- **Error Handling**: Beautiful popup notifications for errors and success messages
- **Form Validation**: Client-side validation with user-friendly feedback

## 🛠️ Technologies Used

- **React 19**: Latest React with functional components and hooks
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API communication
- **Headless UI**: Accessible UI components
- **Heroicons**: Beautiful SVG icons

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Configuration

The application is configured to connect to a backend server at `http://localhost:8081`. Make sure your backend server is running and provides the following endpoints:

- `POST /login` - User authentication
- `POST /register` - User registration

### Expected API Responses

**Login Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "login": "johndoe"
  }
}
```

**Register Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "login": "johndoe"
  }
}
```

## 🎯 Usage

1. **Login**: Navigate to `/login` and enter your credentials
2. **Register**: Navigate to `/register` to create a new account
3. **Dashboard**: After successful authentication, you'll be redirected to `/dashboard`
4. **Logout**: Use the logout button in the dashboard to sign out

## 🏛️ Clean Architecture Benefits

- **Testability**: Each layer can be tested independently
- **Maintainability**: Clear separation of concerns makes code easier to maintain
- **Scalability**: Easy to add new features without affecting existing code
- **Independence**: Business logic is independent of UI and external concerns
- **Flexibility**: Easy to swap implementations (e.g., different storage mechanisms)
- **Function-Based**: All modules use factory functions and utility functions for better composability

## 📁 Key Files

- `src/domain/entities/User.js` - User factory function and utilities
- `src/domain/usecases/LoginUseCase.js` - Login business logic (factory function)
- `src/infrastructure/api/ApiClient.js` - HTTP client configuration (factory function)
- `src/presentation/hooks/useAuth.js` - Authentication custom hook
- `src/presentation/pages/LoginPage.jsx` - Login UI component
- `src/presentation/components/Popup.jsx` - Reusable popup component

## 🔒 Security Features

- Token-based authentication
- Automatic token inclusion in API requests
- Session storage for persistence
- Protected routes for authenticated users
- Automatic logout on authentication errors

## 🎨 UI/UX Features

- Responsive design for all screen sizes
- Loading states with spinners
- Password visibility toggle
- Form validation with real-time feedback
- Beautiful gradient backgrounds
- Smooth transitions and animations
- Accessible components with proper ARIA labels

## 🚀 Future Enhancements

- Password reset functionality
- Email verification
- Social media authentication
- User profile management
- Role-based access control
- Dark mode support
- Internationalization (i18n)

## 📝 License

This project is open source and available under the MIT License.
