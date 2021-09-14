class InvalidHTTPMethodError extends Error {
    constructor(method: string) {
        super(`The HTTP ${method} method is not supported at this route.`);
        this.name = 'InvalidHTTPMethodError';
    }
}

export default InvalidHTTPMethodError;
