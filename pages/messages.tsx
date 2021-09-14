import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import { useSession, getSession } from 'next-auth/client';
import prisma from '../lib/prisma';
import { Message, Translation } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const messages = await prisma.message.findMany({ include: { translations: true } });

    return {
        props: { messages },
    };
};

type Props = {
    messages: (Message & {
        translations: Translation[];
    })[];
};

const Messages: React.FC<Props> = (props) => {
    return (
        <Layout>
            <div className="page">
                <h1>My Drafts</h1>
                <main>
                    {props.messages.map((post) => (
                        <div key={post.id} className="post">
                            <h2>{post.key}</h2>
                            <pre>{JSON.stringify(post, null, 4)}</pre>
                        </div>
                    ))}
                </main>
            </div>
            <style jsx>{`
                .post {
                    background: white;
                    transition: box-shadow 0.1s ease-in;
                }

                .post:hover {
                    box-shadow: 1px 1px 3px #aaa;
                }

                .post + .post {
                    margin-top: 2rem;
                }
            `}</style>
        </Layout>
    );
};

export default Messages;
