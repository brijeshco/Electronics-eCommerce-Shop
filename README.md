# Electronics eCommerce Shop with Admin Dashboard

This is a full-stack eCommerce application built with Next.js, Node.js, and other modern technologies. It includes a customer-facing storefront and a comprehensive admin dashboard for managing products, orders, and users.

## Features

- **Customer-facing Storefront:**
  - Browse products by category, search, and filter.
  - View product details, images, and reviews.
  - Add products to cart and wishlist.
  - Checkout and place orders.
  - User authentication (register and login).
- **Admin Dashboard:**
  - Manage products (create, edit, delete).
  - Manage orders (view, update status).
  - Manage users.
  - View sales statistics and analytics.

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation.
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
  - [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
  - [Zustand](https://github.com/pmndrs/zustand) - Small, fast and scalable bearbones state-management solution.
- **Backend:**
  - [Node.js](https://nodejs.org/) - JavaScript runtime environment.
  - [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js applications.
- **Database:**
  - [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript.
  - (Database provider not specified, but Prisma supports PostgreSQL, MySQL, SQLite, etc.)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v20 or later)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS-main.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd Electronics-eCommerce-Shop
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Set up the database:
    - Rename the `.env.example` file to `.env` and add your database connection string.
    - Run the following command to create the database schema:
      ```bash
      npx prisma db push
      ```
5.  Run the development server:
    ```bash
    npm run dev
    ```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Folder Structure

```
.
├── app/                  # Next.js 13 app directory
│   ├── (dashboard)/      # Admin dashboard pages
│   ├── api/              # API routes
│   ├── cart/             # Cart pages
│   ├── checkout/         # Checkout pages
│   ├── login/            # Login page
│   ├── product/          # Product pages
│   ├── register/         # Register page
│   ├── search/           # Search page
│   ├── shop/             # Shop pages
│   └── wishlist/         # Wishlist pages
├── components/           # Reusable React components
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets (images, etc.)
├── server/               # Backend server code
└── ...
```

## License

This project is licensed under the [MIT License](LICENSE).
