import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import nextConnect, { Options } from 'next-connect';

const onNoMatch: NextApiHandler = (req, res) =>
    res.status(501).send(`The HTTP ${req.method} method is not supported at this route.`);

const nc = <Req extends NextApiRequest = NextApiRequest, Res extends NextApiResponse = NextApiResponse>(
    opts?: Options<Req, Res>
) => nextConnect<Req, Res>({ onNoMatch, ...opts });

export default nc;
