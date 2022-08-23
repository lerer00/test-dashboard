// get all sites of a user
import {withAuth} from "../../lib/middlewares";

const handler = async (req: any, res: any) => {
    try {
        return res.status(200).json({sites: ["asd", "qwe"]});
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
};

export default withAuth(handler);