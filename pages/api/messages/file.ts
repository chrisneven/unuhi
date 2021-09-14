import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import { File } from '../../../entities/File';
import nc from '../../../lib/nc';
import prisma from '../../../lib/prisma';

const upload = multer().array('files');

const postHandler = async (req: NextApiRequest & { files: File[] }, res: NextApiResponse) => {
    if (!req.body.languageId && !req.body.language) {
        throw new Error('languageId or language is required');
    }
    const fileLangId =
        req.body.languageId ?? (await prisma.language.findUnique({ where: { language: req.body.language } }))?.id;

    if (!fileLangId) {
        throw new Error('This language does not exist');
    }
    let promises = [];

    for (const file of req.files) {
        // TODO: create many is not supported by sqlite, so when using postgresql it needs to be changed
        const json: Record<string, string> = JSON.parse(file.buffer.toString());

        console.log(fileLangId);
        Object.entries(json).forEach(([key, value]) => {
            promises.push(
                prisma.message.upsert({
                    where: {
                        key,
                    },
                    create: {
                        key,
                        translations: {
                            create: {
                                languageId: fileLangId,
                                translation: value,
                            },
                        },
                    },
                    update: {
                        key,
                        translations: {
                            create: {
                                languageId: fileLangId,
                                translation: value,
                            },
                        },
                    },
                })
            );
        });
    }
    await prisma.$transaction(promises);

    res.json({ hello: 'world' });
};

const handler = nc<NextApiRequest & { files: File[] }>().use(upload).post(postHandler);

export default handler;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
