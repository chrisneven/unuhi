import { Stack, Button } from '@chakra-ui/react';
import range from 'lodash/range';
import { useQueryParam, withDefault, NumberParam } from 'next-query-params';
import { useEffect } from 'react';
import PaginationLink from './PaginationLink';

export const PER_PAGE = 12;

interface Props {
    count: number;
    pageSize?: number;
}

const Pagination = ({ count, pageSize = PER_PAGE }: Props) => {
    const [currentPage, setPage] = useQueryParam('page', withDefault(NumberParam, 1));
    const pageCount = Math.round(count / pageSize);
    const increment = () => setPage(currentPage + 1);
    const decrement = () => setPage(currentPage - 1);
    const nearStart = currentPage < 4;
    const nearEnd = currentPage > pageCount - 3;
    const isBetween = !nearStart && !nearEnd;

    useEffect(() => window.scrollTo(0, 0), [currentPage]);

    const renderPageItem = (page: number) => (
        <PaginationLink page={page} key={page}>
            <Button variant={page === currentPage ? 'outline' : undefined} className="page-item-number">
                {page}
            </Button>
        </PaginationLink>
    );
    return (
        <Stack my={5} isInline alignItems="center">
            <Button disabled={currentPage === 1} onClick={decrement}>
                Previous
            </Button>
            {nearStart && (
                <>
                    {range(1, 5).map(renderPageItem)}
                    <Elipisis />
                    {renderPageItem(pageCount)}
                </>
            )}

            {isBetween && (
                <>
                    {renderPageItem(1)}
                    <Elipisis />
                    {range(currentPage - 1, currentPage + 2).map(renderPageItem)}
                    <Elipisis />
                    {renderPageItem(pageCount)}
                </>
            )}

            {nearEnd && (
                <>
                    {renderPageItem(1)}
                    <Elipisis />
                    {range(pageCount - 3, pageCount + 1).map(renderPageItem)}
                </>
            )}
            <Button disabled={pageCount === currentPage} onClick={increment}>
                Next
            </Button>
        </Stack>
    );
};

export default Pagination;

const Elipisis = () => <span>...</span>;
