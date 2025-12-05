import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'portfolio');
    const collection = db.collection('contacts');

    // Create contact document
    const contact = {
      name,
      email,
      message,
      createdAt: new Date(),
      read: false,
    };

    // Insert into database
    const result = await collection.insertOne(contact);

    return NextResponse.json(
      {
        success: true,
        message: 'Contact submission received successfully',
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again later.' },
      { status: 500 }
    );
  }
}
