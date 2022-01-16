import { NextApiHandler } from 'next';
import nc from '../../../../lib/nc';
import prisma from '../../../../lib/prisma';

interface Body {
    translations: Record<string, string>;
    translation?: string;
    translationId?: string;
    languageId?: string;
}

const isUpdate = (body: Body) => !!(body.translation && body.translationId);
const isCreate = (body: Body) => !!(body.translation && body.languageId);
const isCreateMany = (body: Body): body is Body => !!body.translations;

const handlePut: NextApiHandler = async (req, res) => {
    const { body } = req;
    const messageId = req.query.id;
    const isUpdating = isUpdate(body);
    const isCreating = isCreate(body);
    const isCreatingMany = isCreateMany(body);

    if (!isUpdating && !isCreating && !isCreateMany) {
        throw new Error('No valid body given');
    }

    const { translation, languageId, translationId, translations } = body;

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

    if (isCreatingMany) {
        console.log(req.body);
        result = await Promise.all(
            Object.entries(translations).map(([languageId, translation]) => {
                const translation = await prisma.translation.findFirst({ where: { languageId: Number(languageId) } });
            })
        );
    }

    res.status(201).json(result);
};

const handler = nc().put(handlePut);

export default handler;
