# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
# Student Management Feature

## Overview
This feature provides comprehensive student management capabilities including creating, viewing, and managing student records with dropout prediction functionality.

## Features

### 1. Create Student
- **Modal Form**: A comprehensive modal form for creating new students
- **Form Validation**: Built-in validation for required fields and data ranges
- **Localization**: Support for multiple languages (English/Vietnamese)
- **Data Persistence**: Automatically saves to database via API

### 2. Student List
- **Pagination**: Supports paginated viewing of student records
- **Filtering**: Filter by student ID, full name, and gender
- **Search**: Real-time search functionality
- **Responsive Table**: Mobile-friendly table layout

### 3. Dropout Prediction
- **Individual Prediction**: Predict dropout risk for individual students
- **Bulk Prediction**: Upload Excel files for batch dropout prediction
- **Data Export**: Export dropout prediction data to CSV

## Architecture

### MVVM Pattern
- **View**: `StudentManagementFeature.tsx` - Main UI component
- **ViewModel**: `StudentManagementViewModel.tsx` - Business logic and state management
- **Model**: API repositories and data models

### Components
- `StudentManagementFeature.tsx` - Main feature component
- `StudentManagementActionFeature.tsx` - Create student modal
- `StudentManagementViewModel.tsx` - ViewModel with business logic
- `StudentManagementConstants.tsx` - Constants and configuration

## Usage

### Creating a New Student
1. Click the "Create Student" button in the top-right corner
2. Fill in the required fields:
   - **Student ID** (required, min 3 characters)
   - **Full Name** (required, min 2 characters)
   - **Gender** (required, select from dropdown)
   - **Birth Date** (optional)
3. Fill in academic information for both semesters
4. Set financial status (debtor, tuition fees)
5. Enter academic summary data
6. Click "Create Student" to save

### Form Sections
1. **Basic Information**: Core student details
2. **First Semester**: Academic performance for first semester
3. **Second Semester**: Academic performance for second semester
4. **Financial Status**: Payment and debt information
5. **Academic Summary**: Overall academic statistics

## API Endpoints

- `POST /api/v1/students/add-student` - Create new student
- `GET /api/v1/students/list` - Get student list
- `POST /api/v1/students/predict-dropout` - Predict dropout for students
- `POST /api/v1/students/predict-dropout-file` - Predict dropout from file
- `GET /api/v1/students/dropout-prediction-data` - Get dropout data

## Data Model

### CreateStudentResponseModel
```typescript
{
  studentId: string;
  fullName: string;
  gender: string;
  birthDate?: string;
  curricularUnits1stSemEnrolled?: number;
  curricularUnits1stSemApproved?: number;
  curricularUnits1stSemGrade?: number;
  curricularUnits2ndSemEnrolled?: number;
  curricularUnits2ndSemApproved?: number;
  curricularUnits2ndSemGrade?: number;
  debtor?: boolean;
  tuitionFeesUpToDate?: boolean;
  totalEnrolled?: number;
  totalApproved?: number;
  totalFailed?: number;
  averageGrade?: number;
  unpassedCourses?: number;
}
```

## Localization

The feature supports multiple languages through the `localizedStrings` system:

- **English**: `client/src/utils/localizedStrings/english/index.ts`
- **Vietnamese**: `client/src/utils/localizedStrings/vietnam/index.ts`

## Styling

Uses Tailwind CSS for responsive design and Ant Design components for UI elements. The modal is styled with a grid layout for optimal form organization.

## Error Handling

- Form validation with user-friendly error messages
- API error handling with toast notifications
- Loading states for better user experience
- Graceful fallbacks for failed operations

## Dependencies

- `antd` - UI component library
- `dayjs` - Date manipulation
- `axios` - HTTP client for API calls
- `tailwindcss` - CSS framework

