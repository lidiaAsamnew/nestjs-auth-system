# NestJS Auth System (Week 5)

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

## Seeded test users

These are hardcoded in `src/user/users.service.ts` for learning/testing:

- `user1@gmail.com` / `user1pw`
- `user2@gmail.com` / `user2pw`

## API

### POST `/auth/login`

Returns a JWT access token.

**Body (JSON)**

```json
{
  "email": "user1@gmail.com",
  "password": "user1pw"
}
```

**Response**

```json
{
  "access_token": "..."
}
```

### GET `/auth/profile` (protected)

Requires a Bearer token. Returns the decoded `req.user` from `JwtStrategy.validate()`.

**Header**

- `Authorization: Bearer <access_token>`

**Response (example)**

```json
{
  "userId": 1,
  "email": "user1@gmail.com"
}
```

## Testing with Postman

1. Create a request: **POST** `http://localhost:3000/auth/login`
   - Body → raw → JSON → send the login payload above
   - Copy `access_token` from the response
2. Create a request: **GET** `http://localhost:3000/auth/profile`
   - Authorization tab → **Bearer Token** → paste the token
   - Send → should return `{ userId, email }`

## Do I need a `.env` file?

**For learning:** not strictly required (your code works without it right now).

**For production-style projects:** yes, you should store secrets and config in environment variables.

Suggested variables (if you choose to wire them in):

```bash
# Port the API runs on
PORT=3000

# JWT signing secret (do not commit a real secret)
JWT_SECRET=replace_me

# Token expiration (example: 1h, 15m, 7d)
JWT_EXPIRES_IN=1h
```

## Notes

- JWT is currently configured with a hardcoded secret in `src/auth/auth.module.ts` and `src/auth/strategies/jwt.strategy.ts`. For real apps, move this to `JWT_SECRET` and don’t commit secrets.

