const paramToNumber = (val?: string | string[] | undefined): number | undefined =>
    typeof val === 'string' ? Number(val) : undefined;

export { paramToNumber };
