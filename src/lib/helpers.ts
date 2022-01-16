type Param = string | string[] | undefined;

const paramToNumber = (val: Param) => (typeof val === 'string' ? Number(val) : undefined);

const paramToString = <Output extends string>(val: Param) => (typeof val === 'string' ? (val as Output) : undefined);

export { paramToNumber, paramToString };
