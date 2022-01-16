import { Language } from '@prisma/client';
import { NextApiHandler } from 'next';
import prisma from '../../../lib/prisma';

export type GetLanguagesResponse = {
    languages: Language[];
};

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'GET') {
        const languages = await prisma.language.findMany();
        const response: GetLanguagesResponse = { languages };

        res.json(response);
        return;
    }

    res.status(501).send(`The HTTP ${req.method} method is not supported at this route.`);
};

export default handler;
