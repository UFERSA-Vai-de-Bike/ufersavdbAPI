const success = (data, message = "Operação bem sucedida") => ({
  success: true,
  data,
  message
});

const failure = (error, message = "Operação mal sucedida") => ({
  success: false,
  data: error,
  message
});

module.exports = {
  success,
  failure
};
