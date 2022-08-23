import {admin} from "./firebase-admin";

export function withAuth(handler: any) {
    return async (req: any, res: any) => {
        const token: string = req.cookies.token;
        console.log(token)
        if (!token) {
            return res.status(401).end('Not authenticated. No Auth header');
        }

        let decodedToken;
        try {
            decodedToken = await admin.auth().verifyIdToken(token);
            if (!decodedToken || !decodedToken.uid)
                return res.status(401).end('Not authenticated');
            req.uid = decodedToken.uid;
        } catch (error: any) {
            console.log(error.errorInfo);
            const errorCode = error.errorInfo.code;
            error.status = 401;
            if (errorCode === 'auth/internal-error') {
                error.status = 500;
            }
            //TODO handlle firebase admin errors in more detail
            return res.status(error.status).json({error: errorCode});
        }

        return handler(req, res);
    };
}