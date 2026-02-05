# DA-TTTN Client

Ứng dụng web client được xây dựng bằng React, TypeScript và Vite cho hệ thống quản lý DA-TTTN.

## 📋 Tổng quan dự án

Dự án này là phần frontend của hệ thống quản lý, được phát triển với các công nghệ hiện đại:

- **React 19** - Thư viện UI
- **TypeScript** - Ngôn ngữ lập trình type-safe
- **Vite** - Build tool và dev server
- **React Router** - Quản lý routing
- **Ant Design** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query (React Query)** - Quản lý server state và data fetching
- **Axios** - HTTP client

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js (phiên bản 18 trở lên)
- npm hoặc yarn

### Cài đặt dependencies

```bash
npm install
```

### Chạy development server

```bash
npm run dev
```

### Build cho production

```bash
npm run build
```

### Preview build production

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 📁 Cấu trúc thư mục

```
client/
├── public/                 # Static files
│   └── image-logo.png     # Logo của ứng dụng
├── src/
│   ├── apis/              # Cấu hình API client
│   │   └── index.ts       # Axios instance và base URL
│   ├── components/        # React components
│   │   └── base/          # Base components tái sử dụng
│   │       ├── icons/     # Icon components (Dashboard, Branch, Category, etc.)
│   │       ├── lazyLoad/  # Component lazy loading với Suspense và Error Boundary
│   │       └── notification/ # Component thông báo
│   ├── config/            # Cấu hình ứng dụng
│   │   └── queryClient.ts # React Query client configuration
│   ├── enums/             # TypeScript enums
│   ├── hooks/             # Custom React hooks
│   ├── interfaces/        # TypeScript type definitions
│   ├── layouts/            # Layout components
│   │   ├── DefaultLayout.tsx # Layout chính của ứng dụng
│   │   ├── header/        # Header component
│   │   ├── footer/        # Footer component
│   │   └── menu/          # Menu navigation component
│   ├── pages/             # Page components
│   │   ├── auth/          # Authentication pages
│   │   │   ├── login/     # Trang đăng nhập
│   │   │   ├── register/  # Trang đăng ký
│   │   │   ├── resetPassword/ # Trang đặt lại mật khẩu
│   │   │   └── policy/    # Trang chính sách
│   │   └── dashboarch/    # Dashboard page
│   ├── routes/            # Route definitions
│   │   ├── index.tsx      # Router configuration chính
│   │   ├── auth.routes.tsx # Routes cho authentication
│   │   └── dashboard.routes.tsx # Routes cho dashboard
│   ├── services/          # Business logic và API services
│   ├── styles/            # Global styles
│   │   └── index.css      # CSS chính
│   ├── utils/             # Utility functions
│   └── main.tsx           # Entry point của ứng dụng
├── index.html             # HTML template
├── package.json           # Dependencies và scripts
├── tsconfig.json          # TypeScript config chính
├── tsconfig.app.json      # TypeScript config cho app
├── tsconfig.node.json     # TypeScript config cho Node.js
├── vite.config.ts         # Vite configuration
└── eslint.config.js       # ESLint configuration
```

## 📄 Mô tả các file và thư mục chính

### Entry Point

- **`src/main.tsx`**: File khởi tạo ứng dụng React, cấu hình các providers (QueryClientProvider, ConfigProvider), và render RouterProvider.

### Routing

- **`src/routes/index.tsx`**: File cấu hình router chính, định nghĩa các routes và layout mặc định.
- **`src/routes/auth.routes.tsx`**: Định nghĩa các routes liên quan đến authentication (login, register, reset password, policy).
- **`src/routes/dashboard.routes.tsx`**: Định nghĩa các routes cho dashboard và các trang quản lý.

### Layouts

- **`src/layouts/DefaultLayout.tsx`**: Layout component chính bao gồm Menu, Header, Footer và Outlet cho các trang con.
- **`src/layouts/header/`**: Component header của ứng dụng.
- **`src/layouts/footer/`**: Component footer của ứng dụng.
- **`src/layouts/menu/`**: Component menu navigation.

### Components

- **`src/components/base/lazyLoad/`**: Component wrapper cho lazy loading với Suspense và Error Boundary, hiển thị loading spinner và xử lý lỗi.
- **`src/components/base/icons/`**: Thư viện icon components cho các module khác nhau (Dashboard, Branch, Category, Customer, Employee, Product, Service, etc.).
- **`src/components/base/notification/`**: Component hiển thị thông báo.

### Pages

- **`src/pages/auth/login/`**: Module đăng nhập bao gồm page component, APIs, và interfaces.
- **`src/pages/auth/register/`**: Module đăng ký tài khoản.
- **`src/pages/auth/resetPassword/`**: Module đặt lại mật khẩu.
- **`src/pages/auth/policy/`**: Trang chính sách.
- **`src/pages/dashboarch/`**: Trang dashboard chính.

### Configuration

- **`src/config/queryClient.ts`**: Cấu hình React Query client với các options mặc định (retry, refetchOnWindowFocus, etc.).
- **`src/apis/index.ts`**: Cấu hình Axios instance với base URL và default headers.

### Styles

- **`src/styles/index.css`**: File CSS global, import Tailwind CSS directives.

### Build Configuration

- **`vite.config.ts`**: Cấu hình Vite bao gồm plugins (React SWC, Tailwind CSS) và path alias `@` trỏ đến `./src`.
- **`tsconfig.app.json`**: Cấu hình TypeScript cho ứng dụng, bao gồm path mapping cho alias `@/*`.
- **`tsconfig.json`**: TypeScript project references.
- **`eslint.config.js`**: Cấu hình ESLint cho code quality.

## 🔧 Tính năng chính

### 1. Authentication System

- Đăng nhập (Login)
- Đăng ký (Register)
- Đặt lại mật khẩu (Reset Password)
- Chính sách (Policy)

### 2. Dashboard

- Trang tổng quan hệ thống

### 3. Lazy Loading

- Tự động lazy load các components và pages để tối ưu performance
- Error Boundary để xử lý lỗi khi load components
- Loading states với timeout handling

### 4. State Management

- React Query cho server state management
- Axios cho HTTP requests

### 5. UI/UX

- Ant Design components
- Tailwind CSS cho styling
- Responsive design
- Custom theme với màu primary `#00B4DB`

## 🛠️ Công nghệ sử dụng

### Core

- **React 19.2.0**: UI library
- **TypeScript 5.9.3**: Type safety
- **Vite 7.2.4**: Build tool

### Routing

- **React Router DOM 7.12.0**: Client-side routing

### UI Libraries

- **Ant Design 6.2.0**: Component library
- **Tailwind CSS 4.1.18**: Utility-first CSS

### Data Fetching

- **TanStack Query 5.90.19**: Server state management
- **Axios 1.13.2**: HTTP client

### Development Tools

- **@vitejs/plugin-react-swc**: Fast Refresh với SWC
- **ESLint**: Code linting
- **TypeScript ESLint**: TypeScript linting

## 📝 Path Alias

Dự án sử dụng path alias `@` để import dễ dàng hơn:

- `@/` trỏ đến `src/`
- Ví dụ: `import Component from "@/components/Component"`

## 🎨 Theme Configuration

Theme chính của ứng dụng được cấu hình trong `main.tsx`:

- **Primary Color**: `#00B4DB`
- **Font Family**: `Roboto, sans-serif`

## 📦 Scripts

- `npm run dev`: Chạy development server
- `npm run build`: Build production
- `npm run preview`: Preview production build
- `npm run lint`: Chạy ESLint

## 🔐 Environment Variables

Cần cấu hình các biến môi trường (nếu có) trong file `.env`:

- `VITE_API_BASE_URL`: Base URL của API backend

## 📚 Tài liệu tham khảo

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vite.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Ant Design Documentation](https://ant.design/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)

## 👥 Đóng góp

Khi thêm tính năng mới hoặc sửa lỗi, vui lòng:

1. Tạo branch mới từ `main`
2. Commit với message rõ ràng
3. Tạo Pull Request

## 📄 License

[Thêm thông tin license nếu có]
