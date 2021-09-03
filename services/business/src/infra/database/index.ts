/* eslint-disable no-use-before-define */
import connection from './TypeORM/connection';

const connectToDB = async (): Promise<void> => {
    try {
        await connection.create();
        console.log('database connected successfully.');
    } catch (error: any) {
        console.error(`an error occured: ${error.message}`);
        console.error('retrying connection in 3 seconds...');
        await retryInSeconds();
    }
};

async function retryInSeconds(): Promise<void> {
    return new Promise(resolve => {
        setTimeout(async () => {
            resolve(await connectToDB());
        }, 3000);
    });
}

connectToDB();
