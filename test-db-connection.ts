import 'dotenv/config';
import { connectToDatabase } from './databse/mongoose';

async function testConnection() {
    console.log('Testing MongoDB connection...');
    console.log('================================');
    
    try {
        await connectToDatabase();
        console.log('✅ Database connection successful!');
        console.log('✅ Mongoose is ready to use');
        process.exit(0);
    } catch (error) {
        console.error('❌ Database connection failed!');
        console.error('Error:', error);
        process.exit(1);
    }
}

void testConnection();
