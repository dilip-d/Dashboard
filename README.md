### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/dilip-d/Dashboard.git
   cd Dashboard/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd ../backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Environment Variables

- **MONGO_URI**:
  `mongodb+srv://dilipdofficial:dilipd@cluster0.1h4e7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

- **JWT_SECRET**:
  `12345`

- **CLIENT_DOMAIN**:
  `http://localhost:3000`

- **PORT**:
  `5000`

## Testing the Application

### Testing the Frontend

1. Navigate to the frontend folder:

   ```bash
   cd ../frontend
   ```

2. Start the test:

   ```bash
   npm test
   ```

### Testing the Backend

1. Navigate to the backend folder:

   ```bash
   cd ../backend
   ```

2. Start the test:

   ```bash
   npm test
   ```

## Running the Application

### Running the Frontend

1. Navigate to the frontend folder:

   ```bash
   cd ../frontend
   ```

2. Start the React development server:

   ```bash
   npm start
   ```

3. The frontend should now be running on `http://localhost:3000`.

### Running the Backend

1. Navigate to the backend folder:

   ```bash
   cd ../backend
   ```

2. Start the Node.js server:

   ```bash
   npm start
   ```

3. The backend should now be running on `http://localhost:5000`.

# API Documentation

## Base URL

All endpoints are relative to the base URL: http://localhost:5000/api

## Authentication

### 1. User Registration

**POST** `/auth/register`  
Registers a new user.

#### Request Body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

### 2. User Login

**POST** `/auth/login`
Authenticates a user and returns a JWT token.

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

## Patient Routes (Protected)

### 1. Get All Patients

**GET** `/patients`
Retrieves a list of all patients.

### 2. Get Patient by ID

**GET** `/patients/:id`
Retrieves a specific patient by ID.

### 3. Create Authorization

**POST** `/prior-authorizations`
Creates a new prior authorization request.

#### Request Body:

```json
{
  "patientId": "patientId",
  "details": "Authorization details"
}
```

### 4. Get All Authorizations

**GET** `/prior-authorizations`
Retrieves a list of all prior authorizations.

### 5. Get Authorization by Patient ID

**GET** `/prior-authorizations/patient/:id`
Retrieves all authorizations for a specific patient.

### 6. Update Authorization Status

**PUT** `/prior-authorizations/status/:id`
Updates the status of a specific authorization.

#### Request Body:

```json
{
  "status": "Approved" // or "Denied"
}
```
