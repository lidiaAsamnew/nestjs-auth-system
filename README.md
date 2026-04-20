# NestJS Auth System (Week 5)

This project demonstrates a simple JWT-based authentication flow in NestJS:

- DTO validation using `class-validator`
- Global `ValidationPipe` in `main.ts`
- JWT issuing via `JwtService`
- JWT verification via `JwtStrategy`
- Route protection via `JwtAuthGuard`

## Prerequisites

- Node.js + npm

## Install & run

```bash
npm install
npm run start:dev
```

By default the app runs on `http://localhost:3000`.

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

## Notes

- The JWT secret is currently hardcoded as `'secret'` in `src/auth/auth.module.ts` and `src/auth/strategies/jwt.strategy.ts` (fine for learning; for real apps use environment variables/config).

