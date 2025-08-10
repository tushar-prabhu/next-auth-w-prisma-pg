# Next.js Admin Auth with Prisma, PostgreSQL & NextAuth

A basic authentication system built with:

- Next.js 15.4
- NextAuth.js v4
- Prisma ORM
- PostgreSQL
- shadcn/ui components

**Key Features:**

- Email/Password authentication
- Role-based access control (Admin/User)
- Admin-managed user accounts (no open signup)
- Basic password hashing
- Route protection with middleware

## Prerequisites

- Node.js 18+ and npm
- Docker (recommended) or PostgreSQL server

## Database Setup (with Docker)

Run PostgreSQL using Docker:

1. Pull the PostgreSQL image:

   ```bash
   docker pull postgres
   ```

2. Start a new PostgreSQL container:

   ```bash
   docker run --name next-auth-pg \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=postgres \
     -e POSTGRES_DB=nextauth \
     -p 5432:5432 \
     -d postgres
   ```

## Quick Start

1. **Clone the repository** and install dependencies:

   ```bash
   git clone https://github.com/tushar-prabhu/next-auth-w-prisma-pg.git
   cd next-auth-w-prisma-pg
   npm install
   ```

2. **Run the setup script** to create your `.env` file:

   ```bash
   npm run setup
   ```

   This will prompt you for database configuration. Press Enter to use the default values (recommended for local development) or enter your own values.

3. **Run database migrations** to set up the database schema:

   ```bash
   npm run db:migrate
   ```

4. **Seed the database** with an admin user:

   ```bash
   npm run db:seed
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   ```

6. **Open your browser** to [http://localhost:3000](http://localhost:3000)

## Default Admin Credentials

- **Email**: `admin@example.com`
- **Password**: admin123

## Features

- Email/Password authentication
- Protected routes with role-based access
- Admin dashboard for user management
- Secure password hashing
- Session management

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:reset` - Reset the database

## Notes

Default values used by the setup script:

- `DATABASE_URL`: `postgresql://postgres:postgres@localhost:5432/nextauth?schema=public`
- `NEXTAUTH_URL`: `http://localhost:3000`
- `NEXTAUTH_SECRET`: Auto-generated if not provided

## License

[MIT](LICENSE)
