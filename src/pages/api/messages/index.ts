import { Message, Translation } from '@prisma/client';
import { NextApiHandler } from 'next';
import { paramToNumber } from '../../../lib/helpers';
import prisma from '../../../lib/prisma';

export type GetMessageVariables = {
    take?: number;
    skip?: number;
    filter?: 'missing';
};

export type GetMessagesResponse = {
    messages: (Message & {
        translations: Translation[];
    })[];
    count: number;
};

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'GET') {
        const take = paramToNumber(req.query.take) ?? 100;
        const skip = paramToNumber(req.query.skip);
        const count = await prisma.message.count();
        const messages = await prisma.message.findMany({ include: { translations: true }, take, skip });

        if (req.query.filter === 'missing') {
            // const langCount = await prisma.language.count();
            // messages = messages.filter((message) => message.translations.length !== langCount);

            const response: GetMessagesResponse = {
                messages,
                count,
            };

            res.json(response);
            return;
        }

        const response: GetMessagesResponse = {
            messages,
            count,
        };

        res.json(response);
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
