import { NextResponse } from 'next/server';
import { User, UserFormData } from '@/types/user';

// Mock Database (In-Memory)
let users: User[] = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        role: 'admin',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '987-654-3210',
        role: 'user',
        createdAt: new Date().toISOString(),
    },
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        const user = users.find(u => u.id === id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(user);
    }

    return NextResponse.json(users);
}

export async function POST(request: Request) {
    try {
        const body: UserFormData = await request.json();

        // Basic Validation
        if (!body.firstName || !body.email) {
            return NextResponse.json(
                { error: 'First name and Email are required' },
                { status: 400 }
            );
        }

        const newUser: User = {
            id: Date.now().toString(),
            ...body,
            createdAt: new Date().toISOString(),
        };
        users.push(newUser);
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid Request Body' }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const body: UserFormData = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 });
        }

        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Prevent overwriting createdAt and ensure only valid fields are updated
        // Destructure to separate protected fields if they exist in body (though our type excludes them)
        const { id: _, createdAt: __, ...updateData } = body as any;

        const updatedUser = {
            ...users[userIndex],
            ...updateData // Only apply editable fields
        };

        users[userIndex] = updatedUser;

        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid Request Body' }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const initialLength = users.length;
    users = users.filter(u => u.id !== id);

    if (users.length === initialLength) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'User deleted successfully' });
}
