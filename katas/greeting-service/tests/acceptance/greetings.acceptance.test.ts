import request from 'supertest';
import app from "../../src";
import { clearAllTables, createTestUser, getLatestGreeting } from '../setup/testUtils';
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

describe('Greetings with favorite quotes', () => {

    const server = setupServer(
        http.get('https://fakerapi.it/api/v2/texts*', () => {
            return HttpResponse.json({
                data: [{
                    content: "Make today amazing!"
                }]
            });
        }));

    beforeEach(async () => {
        await clearAllTables();
    });

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

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

    test('user should get random quote', async () => {
        const response = await whenARequestIsSendTo("/api/greeting?withQuote=true&name=Rob");

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            message: "Hello Rob! Here's something to inspire your day: 'Make today amazing!'"
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
