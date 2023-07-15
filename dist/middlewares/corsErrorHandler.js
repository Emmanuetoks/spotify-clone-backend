const addCorsHeaders = (req, res, next) => {
    const corsHeader = 'Access-Control-Allow';
    res.header({
        [`${corsHeader}-Origin`]: '*',
        [`${corsHeader}-Headers`]: '*',
    });
    if (req.method === 'OPTIONS') {
        res.setHeader(`${corsHeader}-Methods`, 'PUT, POST, PATCH, GET, DELETE');
        res.status(200).json({});
    }
    next();
};
export default addCorsHeaders;
//# sourceMappingURL=corsErrorHandler.js.map