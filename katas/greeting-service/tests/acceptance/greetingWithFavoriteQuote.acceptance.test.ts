import request from 'supertest';
import app from "../../src";
import { clearAllTables, createTestUser, getLatestGreeting } from '../setup/testUtils';

describe('Greetings with favorite quotes', () => {
    beforeEach(async () => {
        await clearAllTables();
    });

    test('user gets personalized greeting without favorite quote when include_quotes is false', async () => {
        const includeQuotes = false;
        const userId = await givenAUserNamed("Test User", includeQuotes);

        const response = await whenARequestIsSendTo(`/api/greeting/${userId}/with-favorite-quote`);

        expect(response.status).toBe(200);
        // @ts-ignore
        expect(response.body).toBeOneOf([
            {message: 'Test User, hope you\'re doing great!'},
            {message: 'What\'s up Test User!'},
            {message: 'Hey Test User!'}
        ]);

        expect(await getLatestGreeting(userId)).toMatchObject({
            user_id: userId,
            greeting_type: 'time_based'
        });
    });
});

async function givenAUserNamed(name: string, includeQuotes: boolean) {
    return await createTestUser({
        name: name,
        email: 'test@example.com',
        include_quotes: includeQuotes
    });
}

async function whenARequestIsSendTo(url: string) {
    return await request(app)
        .get(url);
}
