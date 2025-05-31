import { db, usersTable } from '@/db';
import bcrypt from 'bcryptjs';
import { and, desc, eq, ilike, type SQL } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

// Types
interface DecodedToken {
  userId: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

// Helper function to verify JWT and get user
async function verifyAuth(request: NextRequest): Promise<DecodedToken> {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7);
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as DecodedToken;

  return decoded;
}

// GET /api/users - List users
export async function GET(request: NextRequest) {
  try {
    // Verify authentication (keeping for future use)
    await verifyAuth(request);

    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const roleFilter = searchParams.get('role') || '';

    const offset = (page - 1) * limit;

    // Build query conditions
    const whereConditions: (SQL | undefined)[] = [];

    if (search) {
      whereConditions.push(
        ilike(usersTable.email, `%${search}%`)
      );
    }

    if (roleFilter) {
      whereConditions.push(eq(usersTable.role, roleFilter));
    }

    // Get users with pagination
    const users = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        displayName: usersTable.displayName,
        role: usersTable.role,
        avatar: usersTable.avatar,
        isActive: usersTable.isActive,
        isVerified: usersTable.isVerified,
        lastLoginAt: usersTable.lastLoginAt,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .where(and(...whereConditions))
      .orderBy(desc(usersTable.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalUsers = await db
      .select({ count: usersTable.id })
      .from(usersTable)
      .where(and(...whereConditions));

    return NextResponse.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total: totalUsers.length,
          totalPages: Math.ceil(totalUsers.length / limit),
        }
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create user
export async function POST(request: NextRequest) {
  try {
    // Verify authentication (keeping for future use)
    await verifyAuth(request);

    const userData: UserData = await request.json();
    const { email, password, firstName, lastName, role } = userData;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUsers = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const newUsers = await db
      .insert(usersTable)
      .values({
        name: `${firstName} ${lastName}`,
        age: 25, // Default age
        email,
        passwordHash,
        firstName,
        lastName,
        role: role || 'STUDENT',
        isActive: true,
        isVerified: false,
      })
      .returning({
        id: usersTable.id,
        email: usersTable.email,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        role: usersTable.role,
        createdAt: usersTable.createdAt,
      });

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: { user: newUsers[0] }
    });

  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
