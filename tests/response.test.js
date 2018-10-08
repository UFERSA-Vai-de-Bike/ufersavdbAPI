const {
  success,
  failure,
} = require('../response');

describe('response utils', () => {
  it('should success return with default message', () => {
    expect(success({
      data: 123,
    })).toEqual({
      data: {
        data: 123,
      },
      success: true,
      message: 'Operação bem sucedida',
    });
  });

  it('should success return with custom message', () => {
    expect(success({
      data: 123,
    }, 'custom message')).toEqual({
      data: {
        data: 123,
      },
      success: true,
      message: 'custom message',
    });
  });

  it('should failure return with a custom message', () => {
    expect(failure({
      data: 'this is a error',
    })).toEqual({
      data: {
        data: 'this is a error',
      },
      success: false,
      message: 'Operação mal sucedida',
    });
  });

  it('should success with message', () => {
    expect(failure({
      data: 'this is a error',
    }, 'custom message')).toEqual({
      data: {
        data: 'this is a error',
      },
      success: false,
      message: 'custom message',
    });
  });
});