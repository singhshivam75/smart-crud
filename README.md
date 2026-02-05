# SmartCRUD

SmartCRUD is a modern, scalable user management application built with Next.js App Router, TypeScript, and Tailwind CSS.
It supports full CRUD operations with a configuration-driven form architecture for easy extensibility.

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Next.js API Routes (Route Handlers)
- Lucide Icons

## Features

- Create, Read, Update, Delete (CRUD) users
- Schema-driven and extensible user form
- Form validation with clear error messages
- Clean and responsive UI
- Confirmation modal for destructive actions
- API integration using Next.js Route Handlers
- Loading and error states for better UX

## Project Structure

```
src/
- app/               → Pages and API routes
- app/api/users      → User CRUD API
- components/        → Reusable UI components
- config/            → Form schema configuration
- services/          → API abstraction layer
- types/             → TypeScript types
```

## API Implementation

The application uses Next.js Route Handlers (`app/api`) to implement backend APIs.

- `GET /api/users`        → Fetch all users
- `GET /api/users?id=`    → Fetch single user
- `POST /api/users`       → Create new user
- `PUT /api/users?id=`    → Update user
- `DELETE /api/users?id=` → Delete user

For this assignment, an in-memory data store is used to simulate a database.

## Form Architecture and Extensibility

The user form is built using a configuration-driven approach.

All form fields are defined in a schema file:
`src/config/userFormSchema.ts`

Each field defines:
- Name
- Label
- Input type
- Validation rules
- Required flag
- Options (for select fields)

### How to Add a New Field

1. Open `src/config/userFormSchema.ts`
2. Add a new field object to the schema
3. Update the `UserFormData` TypeScript type if required

The form UI, validation, and submission logic automatically adapt without any additional code changes.

**Note on Type Safety**: In `UserForm.tsx`, we deliberately cast formData (`as unknown as UserFormData`) post-validation. This supports our schema-driven approach where keys are determined runtime, while still ensuring type compliance for the API payload.

## Validation Strategy

- Required field validation is handled on the frontend
- Format validation (email, phone) is schema-based
- Basic validation is also applied at the API level for safety

## Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/singhshivam75/smart-crud.git
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open the application
   http://localhost:3000

## Deployment

The application is deployed using Vercel.

Live Demo: https://smart-crud-oqisc60yp-singhshivam75s-projects.vercel.app/

## Assumptions and Notes

- This project uses a mock in-memory database for demonstration purposes
- Data resets on server restart
- The focus of this assignment is on frontend architecture, extensibility, and clean code
