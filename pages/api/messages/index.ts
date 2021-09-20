import { NextApiHandler } from 'next';
import prisma from '../../../lib/prisma';

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'GET') {
        let messages = await prisma.message.findMany({ include: { translations: true } });

        if (req.query.filter === 'missing') {
            const langCount = await prisma.language.count();
            messages = messages.filter((message) => message.translations.length !== langCount);
            res.json(messages);
            return;
        }

        res.json(messages);
        return;
    }

    if (req.method === 'POST') {
        const { key } = req.body;

        if (key) {
            const result = await prisma.message.create({
                data: { key },
            });
            res.status(201).json(result);
            return;
        }
    }

    res.status(501).send(`The HTTP ${req.method} method is not supported at this route.`);
};

export default handler;
