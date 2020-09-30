import { OAuth2Client, TokenPayload } from 'google-auth-library';

export class GoogleTokenVerify {
    private client = new OAuth2Client(process.env.CLIENT_ID);

    public async verify(token: string): Promise<{}> {        
        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        });
 
        /* Si El Token De Google No Es Válido, No Alcanza A Pasar Por Aquí */
        const payload: TokenPayload | undefined = ticket.getPayload();
        const { email, name, picture }: any = payload;

        return {email, name, picture};
    }
}