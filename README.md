# NestJS Auth System

A learning-focused NestJS authentication system featuring **DTO validation**, **JWT authentication**, and **route protection with guards**, organized with a clean modular structure (`auth` / `user`).

## Features

- **DTO-based validation system** (via `class-validator`)
- **Global `ValidationPipe`** (whitelist, forbidNonWhitelisted, transform)
- **JWT authentication system**
  - Login endpoint with token generation
  - `JwtStrategy` implementation
  - `JwtAuthGuard` route protection
- **Clean modular structure** (Auth / Users separation)

## Setup & Installation

```bash
npm install
npm run start:dev
```

By default the app runs on `http://localhost:3000`.

## 📁 Project Structure

```text
nestjs-auth-system/
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.controller.spec.ts
│   │   ├── auth.service.ts
│   │   ├── auth.service.spec.ts
│   │   ├── auth.module.ts
│   ├── user/
│   │   ├── users.service.ts
│   │   ├── users.service.spec.ts
│   │   ├── users.module.ts
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.service.ts
│   ├── app.module.ts
│   ├── main.ts
├── test/
│   ├── app.e2e-spec.ts
├── .env
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## Seeded test users for testing

- `selam@gmail.com` / `selam123`
- `monica@gmail.com` / `monica123`

## API

### POST `/auth/login`

Returns a JWT access token.

**Body (JSON)**

```json
{
  "email": "selam@gmail.com",
  "password": "selam123"
}
```

**Response**

```json
{
  "access_token": "..."
}
```

### GET `/auth/profile` (this the protected endpoint)

Requires a Bearer token. Returns the decoded `req.user` from `JwtStrategy.validate()`.

**Header**

- `Authorization: Bearer <access_token>`

**Response (example)**

```json
{
  "userId": 1,
  "email": "selam@gmail.com"
}
```

## Testing with Postman

1. Create a request: **POST** `http://localhost:3000/auth/login`
   - Body → raw → JSON → send the login payload above
   - Copy `access_token` from the response you get
2. Create a request: **GET** `http://localhost:3000/auth/profile`
   - Authorization tab → **Bearer Token** → paste the token
   - Send → should return `{ userId, email }`
