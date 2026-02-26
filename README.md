# ID App (id-testaufgabe)

Role-based media-request platform with a Django REST backend and a React frontend.

## What It Does

- Users register and log in with token-based auth.
- Each user has a role: `customer`, `team`, or `management`.
- Customers create media requests.
- Team members update request status and upload final output files.
- Management can monitor all requests.
- Email notifications are sent on request lifecycle events.

## Tech Stack

### Backend

- Django 6
- Django REST Framework
- DRF Token Authentication
- SQLite (default)
- `django-cors-headers`

### Frontend

- React + Vite
- Axios
- Zustand
- React Router

---

## Repository Structure

```text
backend/
  backend/                # Django project settings/urls
  users/                  # Custom user model, auth endpoints
  request/                # Media request models/endpoints/email notifications
  manage.py
  requirements.txt

frontend/
  src/
    pages/                # Login, Signup, Profile, Home
    components/           # Role-specific profile UIs, request form, navbar
    store/               # Zustand auth store
```

---

## Backend Setup

1. Create and activate virtualenv.
2. Install dependencies.
3. Run migrations.
4. Start server.

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at: `http://127.0.0.1:8000`

## Django Admin (Superuser)

Create an admin account:

```bash
cd backend
python manage.py createsuperuser
```

You will be prompted for:

- username
- email (optional)
- password

After creation:

- login at `http://127.0.0.1:8000/admin/`
- manage users, roles, media requests, and uploaded assets from Django Admin

### Environment Variables

Create `backend/.env` with:

```env
EMAIL_HOST_USER=your_email
EMAIL_HOST_PASSWORD=your_app_password
DEFAULT_FROM_EMAIL=your_email
```

Important: do not commit real credentials.

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

CORS is configured in backend settings for:

- `http://localhost:5173`
- `http://127.0.0.1:5173`

---

## Auth and Roles

Custom user model (`users.User`) extends `AbstractUser` and adds:

- `role`: `customer | team | management`

On login, backend returns:

- `token`
- `user` object (including role)

Frontend stores in Zustand + localStorage:

- `token`
- `role`
- `isAuthenticated`

Authenticated API calls require:

```http
Authorization: Token <token_value>
```

---

## API Endpoints

Base URL: `http://127.0.0.1:8000`

### Users (`/api/users/`)

#### `POST /api/users/register/`

Create user account.

Request body:

```json
{
  "username": "john_doe",
  "password": "TestPass123!",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "customer"
}
```

Responses:

- `201 Created` with created user data (password excluded)
- `400 Bad Request` for validation errors (duplicate username/email etc.)

#### `POST /api/users/login/`

Authenticate and return token.

Request body:

```json
{
  "username": "john_doe",
  "password": "TestPass123!"
}
```

Success response:

```json
{
  "token": "<token>",
  "user": {
    "id": 1,
    "username": "john_doe",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

#### `GET /api/users/profile/`

Return authenticated user profile.

Auth required: token

---

### Requests (`/api/request/`)

#### `GET /api/request/`

List requests.

Role behavior:

- `customer`: only own requests
- `team` / `management`: all requests

#### `POST /api/request/`

Create a media request (customer only).

Content type:

- JSON for basic fields, or
- `multipart/form-data` for optional file upload list via `files`

Fields:

- `title` (required)
- `description` (required)
- `stadium_screen` (required):
  - `screen_main`
  - `screen_a`
  - `screen_b`
  - `screen_c`
  - `screen_d`
- `broadcast_date` (optional)
- `notes` (optional)
- `files` (optional, multi-file)

#### `PATCH /api/request/<id>/`

Update request by ID (team only).

Allowed updates:

- `status`: `open | in_progress | completed`
- `finished_file`: file upload

---

## Email Notifications

Triggered in `request/views.py`:

- On new customer request:
  - `send_new_request_email(media_request)`
  - Sent to all `team` users

- On status changed to `in_progress`:
  - `send_onprogress_request_email(media_request)`
  - Sent to the request's customer

- On status changed to `completed`:
  - `send_completed_request_email(media_request)`
  - Sent to customer and all management users

---

## Frontend Flow

- `/signup`: registration form
- `/login`: login form
- `/profile`: protected route (requires authenticated state)
- `Navbar`: shows Login/Signup for guests, Logout for authenticated users

Role-based profile rendering in `Profile.jsx`:

- `customer` -> `CustomerProfile`
- `team` -> `TeamProfile`
- `management` -> `ManagementProfile`

### CustomerProfile

- Shows own details
- Lists submitted requests
- Can open and submit `RequestForm`

### TeamProfile

- Shows own details
- Lists all requests
- Can change status and upload finished file

### ManagementProfile

- Shows own details
- Read-only view of all requests

---

## Quick Test Users (Example JSON)

```json
{
  "username": "customer_1",
  "password": "TestPass123!",
  "email": "customer1@example.com",
  "first_name": "Cust",
  "last_name": "One",
  "role": "customer"
}
```

```json
{
  "username": "team_1",
  "password": "TestPass123!",
  "email": "team1@example.com",
  "first_name": "Team",
  "last_name": "Member",
  "role": "team"
}
```

```json
{
  "username": "manager_1",
  "password": "TestPass123!",
  "email": "manager1@example.com",
  "first_name": "Man",
  "last_name": "Ager",
  "role": "management"
}
```

---

## License

No license file is currently included.

## Deployment

This project will use a GitHub Actions CI/CD pipeline to automatically deploy to a DigitalOcean server on every push to the `master` branch.

### How it will work

1. **Code will be pushed to the `master` branch** — this will trigger the GitHub Actions workflow automatically.
2. **Docker image will be built** — GitHub Actions will build a Docker image from the project's `Dockerfile`.
3. **Image will be pushed to Docker Hub** — the built image will be published to Docker Hub under `smnighim/id-testaufgabe:latest`.
4. **Server will be updated** — GitHub Actions will SSH into the DigitalOcean server, pull the latest image, stop and remove the old container, and start a new one with the updated image.

### Server setup

The server will only need Docker installed. No manual code deployment will be required — every new release will be deployed automatically by the pipeline.

### Required GitHub Secrets

The following secrets will need to be configured in the repository under **Settings → Secrets and variables → Actions**:

| Secret             | Description                                   |
| ------------------ | --------------------------------------------- |
| `DOCKER_USERNAME`  | Your Docker Hub username                      |
| `DOCKER_HUB_TOKEN` | Your Docker Hub access token                  |
| `SERVER_IP`        | The IP address of your DigitalOcean server    |
| `SSH_PRIVATE_KEY`  | The private SSH key used to access the server |
| `SECRET_KEY`       | The Django secret key                         |
| `ALLOWED_HOSTS`    | The allowed hosts for the Django application  |

## Note

- Claude AI was used to generate parts of `README.md`, boilerplate code, and basic HTML frontend elements and for devops tasks.
- The app is functional, but final CSS styling is still pending and will be added soon.
- Asset download for teams and uploaded-asset display for customers are not implemented yet and will be added soon.
- Django Admin can be used to inspect data, analyze records, and manage roles until those UI features are implemented.
-
