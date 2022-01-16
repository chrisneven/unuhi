import { Message as MessageType, Translation, Prisma, Language } from '@prisma/client';
import { NextApiHandler } from 'next';
import { paramToNumber, paramToString } from '../../../lib/helpers';
import prisma from '../../../lib/prisma';

export type MessageFilter = 'missing';
export type MessageSort = 'asc' | 'desc';

export type GetMessageVariables = {
    take?: number;
    skip?: number;
    filter?: MessageFilter;
    sort?: MessageSort;
};

export type Message = MessageType & {
    translations: (Translation & {
        language: Language;
    })[];
};

export type GetMessagesResponse = {
    messages: Message[];
    count: number;
};

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'GET') {
        const take = paramToNumber(req.query.take) ?? 100;
        const skip = paramToNumber(req.query.skip);
        const filter = paramToString<MessageFilter>(req.query.filter);
        const sort = paramToString<MessageSort>(req.query.sort) ?? 'asc';
        const langIds = (await prisma.language.findMany()).map((lang) => lang.id);
        const where: Prisma.MessageWhereInput = {
            OR:
                filter === 'missing'
                    ? langIds.map((id) => ({
                          translations: {
                              none: {
                                  languageId: id,
                              },
                          },
                      }))
                    : undefined,
        };

        const messages = await prisma.message.findMany({
            include: { translations: { include: { language: true } } },
            take,
            skip,
            where,
            orderBy: { id: sort },
        });
        const count = await prisma.message.count({ where });

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
