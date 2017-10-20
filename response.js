var success = function(data, message) {
    message = typeof message !== 'undefined' ? message : "Operação bem sucedida";

    return {
        success: true,
        data: data,
        message: message
    };
};

var failure = function(error, message) {
    message = typeof message !== 'undefined' ? message : "Operação mal sucedida";

    return {
        success: false,
        data: error,
        message: message
    };
};

module.exports = {
    success: success,
    failure: failure
};
