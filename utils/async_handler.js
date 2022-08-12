exports.async_handler = function (val) {
    return async function (req, res, next) {
        try {
            await val(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};