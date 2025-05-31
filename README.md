# 🚀 GROW YouR NEED - Educational SaaS Platform
A comprehensive, enterprise-grade educational management system built with modern web technologies. This platform serves schools, teachers, students, parents, and administrative staff with role-based access control and multi-tenant architecture.

## ✨ Features

### 🏢 **Multi-Tenant Architecture**
- Complete tenant isolation with custom domains
- Scalable infrastructure supporting multiple schools/organizations
- Tenant-specific branding and configuration

### 👥 **Role-Based Access Control**
- **Admin/**: System management and oversight
- **Administrator**: Administrator of the school HR
- **Teacher**: Course management and student tracking
- **Student**: Learning dashboard and progress monitoring
- **Parent**: Child progress monitoring and communication
- **Finance**: Financial management and reporting
- **Marketing**: Campaign management and analytics

### 🔐 **Enterprise Security**
- JWT-based authentication with refresh tokens
- Two-factor authentication support
- Audit logging for all user actions
- Session management with device tracking
- Password reset and email verification

### 📊 **Advanced Analytics**
- Real-time dashboard with key metrics
- User engagement tracking
- Revenue and financial analytics
- Performance monitoring and reporting

### 🎨 **Modern UI/UX**
- Responsive design with Tailwind CSS
- Dark/light theme support
- Accessible components with Radix UI
- Smooth animations and transitions
- Mobile-first approach

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 15.3.2** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library
- **React Hook Form** - Form management
- **Zod** - Schema validation

### **Backend & Database**
- **Drizzle ORM** - Type-safe database toolkit
- **PostgreSQL** - Primary database
- **Neon Database** - Serverless PostgreSQL
- **Prisma** - Alternative ORM (included)
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Turbopack** - Fast bundler for development

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Neon account)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd grow-jadid
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/grow_your_need"
JWT_SECRET="your-super-secret-jwt-key"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

4. **Set up the database**
```bash
# Push schema to database
npm run db:push

# Seed with demo data
npx tsx src/db/seed.ts
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Demo Credentials

Use these credentials to explore different user roles:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin | 123 |

| Administrationr | teacher | 123 |
| Teacher | teacher | 123 |
| Student | student| 123 |
| Parent | parent | 123 |
| Finance | finance |123 |
| Marketing | marketing | 123 |

## 📁 Project Structure



## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Database
npm run db:push         # Push schema to database
npx tsx src/db/seed.ts  # Seed database with demo data

# Type checking
npm run type-check      # Run TypeScript compiler
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users` - List users (paginated)
- `POST /api/users` - Create user
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Tenants
- `GET /api/tenants` - List tenants
- `POST /api/tenants` - Create tenant
- `GET /api/tenants/[id]` - Get tenant
- `PUT /api/tenants/[id]` - Update tenant

### Analytics
- `GET /api/analytics/dashboard` - Dashboard metrics
- `GET /api/analytics/users` - User analytics
- `GET /api/analytics/revenue` - Revenue analytics

## 🔒 Security Features

- **Authentication**: JWT-based with refresh tokens
- **Authorization**: Role-based access control (RBAC)
- **Data Protection**: Tenant isolation and data encryption
- **Audit Logging**: Complete action tracking
- **Session Management**: Device tracking and session control
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Parameterized queries with Drizzle

## 🎨 Customization

### Theming
The application supports light/dark themes and custom branding:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        // ... custom colors
      }
    }
  }
}
```

### Adding New Roles
1. Update the enum in `src/db/schema.ts`
2. Add role to `AuthContext.tsx`
3. Create role-specific pages and components
4. Update navigation and access controls

## 📊 Database Schema

The application uses a comprehensive database schema with:

- **Multi-tenancy**: Tenant isolation at the database level
- **User Management**: Complete user profiles with roles
- **Audit Logging**: Track all user actions
- **Session Management**: Secure session handling
- **Notifications**: In-app notification system

Key tables:
- `tenants` - Multi-tenant organizations
- `users` - User accounts with roles
- `schools` - Educational institutions
- `audit_logs` - Action tracking
- `notifications` - User notifications
- `user_sessions` - Session management

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker
```bash
# Build Docker image
docker build -t grow-your-need .

# Run container
docker run -p 3000:3000 grow-your-need
```

### Environment Variables for Production
```env
# Database Configuration (Neon Database)
DATABASE_URL="postgresql://neondb_owner:npg_2g6AmuvfxlMF@ep-sweet-sound-aadeb08g-pooler.westus3.azure.neon.tech/neondb?sslmode=require",

JWT_SECRET="your-production-jwt-secret"

NEXT_PUBLIC_API_URL="https://your-domain.com/api"

NODE_ENV="production"
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the demo credentials and examples

## 🔮 Roadmap

- [ ] Real-time notifications with WebSockets
- [ ] Advanced reporting and analytics
- [ ] Mobile app development
- [ ] AI-powered insights and recommendations
- [ ] Integration with external learning management systems
- [ ] Advanced calendar and scheduling features
- [ ] Video conferencing integration
- [ ] Advanced file management and sharing

---

**Built with ❤️ for the education community**
# grow-lates
# grow-lates
