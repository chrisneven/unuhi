import { NextApiHandler } from 'next';
import prisma from '../../../../lib/prisma';

const handler: NextApiHandler = async (req, res) => {
    const messageId = Number(req.query.id);
    const message = await prisma.message.findUnique({
        where: { id: messageId },
        include: { translations: true },
    });

    console.log(req.query.id);
    if (req.method === 'GET') {
        console.log(message);
        if (message) {
            res.json(message);
        } else {
            res.status(404).json({});
        }
        return;
    }

    if (req.method === 'POST') {
        const { translation, languageId } = req.body;
        const result = await prisma.translation.create({
            data: { translation, language: { connect: { id: languageId } }, message: { connect: { id: message.id } } },
        });
        res.status(201).json(result);
        return;
    }

    if (req.method === 'DELETE') {
        const result = await prisma.message.delete({ where: { id: messageId } });
        res.status(201).json(result);
        return;
    }

    res.status(501).send(`The HTTP ${req.method} method is not supported at this route.`);
};

export default handler;
