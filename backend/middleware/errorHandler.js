const errorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'File is too large. Maximum size is 100MB'
            });
        }
        return res.status(400).json({
            message: err.message
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: err.message
        });
    }

    console.error(err);
    res.status(500).json({
        message: 'Something went wrong!'
    });
};

module.exports = errorHandler; 