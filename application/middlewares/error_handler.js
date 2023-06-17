const ErrorHandler = (err, req, res, next) => {
    var errStatus = err.status || 500;
    var errMsg = err.message || 'Something went wrong';

    if (req.xhr) {
        return res.status(errStatus).json({
            success: false,
            status: errStatus,
            message: errMsg,
            stack: process.env.NODE_ENV === 'development' ? err.stack : {}
        });
    }

    // set locals, only providing error in development
    res.locals.message = errMsg;
    res.locals.error = err;
    // render the error page
    res.status(errStatus || 500);
    return res.render('error_404');
}

module.exports = ErrorHandler