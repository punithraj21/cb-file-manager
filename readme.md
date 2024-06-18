# File Manager Application

This is a file manager application built with Node.js, Express.js, Prisma, PostgreSQL, and TypeScript. It allows users to create folders and files within a hierarchical structure.

## Features

- User registration and authentication with JWT
- Create folders and files
- Organize files within folders
- Secure file storage in user-specific directories

## Prerequisites

- Node.js (v14.x or later)
- PostgreSQL
- npm (v6.x or later)

## Setup

### 1. Download Repository

```bash
Download and Unzip the File
cd cb-file-manager
```

### 2. install dependencies

npm install

### 3. Set Up Environment Variables

PORT=3000
DATABASE_URL="postgresql://postgres:Codebricks@123@db.kusekuydxkzpodpztsow.supabase.co:5432/postgres"
JWT_SECRET=8DMUTQPNW9SEJ3HI

### 3. Set Up Prisma

Optional if you use new Database : npx prisma migrate dev --name init
cd src && npx prisma generate
mkdir -p src/\_storage
mkdir -p src/\_uploadedFiles
npm run start
