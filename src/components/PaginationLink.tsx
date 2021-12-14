import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { FC } from 'react';

const getPaginationLinkProps = (page: number, router: NextRouter) => ({
    href: {
        pathname: router.pathname,
        query: {
            ...router.query,
            page,
        },
    },
    shallow: true,
    scroll: false,
});

const PaginationLink: FC<{ page: number }> = ({ page, children }) => {
    const router = useRouter();

    return (
        <Link {...getPaginationLinkProps(page, router)} passHref>
            {children}
        </Link>
    );
};

export default PaginationLink;
