import { NextApiHandler } from 'next';
import nc from '../../../../../lib/nc';
import prisma from '../../../../../lib/prisma';

interface Body {
    translation?: string;
    translationId?: string;
    languageId?: string;
}

const isUpdate = (body: Body) => !!(body.translation && body.translationId);

const isCreate = (body: Body) => !!(body.translation && body.languageId);

const handlePut: NextApiHandler = async (req, res) => {
    const body: Body = req.body;
    const messageId = req.query.id;
    const isUpdating = isUpdate(body);
    const isCreating = isCreate(body);

    if (!isUpdating && !isCreating) {
        throw new Error('No valid body given');
    }

    const { translation, languageId, translationId } = body;

    let result = null;

    if (isUpdating) {
        result = await prisma.translation.update({
            where: { id: Number(translationId) },
            data: {
                translation,
            },
        });
    }

    if (isCreating) {
        result = await prisma.translation.create({
            data: {
                translation,
                language: { connect: { id: Number(languageId) } },
                message: { connect: { id: Number(messageId) } },
            },
        });
    }

    res.status(201).json(result);
};

const handler = nc().put(handlePut);

export default handler;
