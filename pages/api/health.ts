import type {NextApiRequest, NextApiResponse} from 'next'

type Data = {
    health: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    fetch(process.env.TEST_API_HOST + '/health')
        .then((res) => res.json())
        .then((data) => {
            res.status(200).json(data)
        })
}
