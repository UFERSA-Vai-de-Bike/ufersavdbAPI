const {
  changeSit,
  createUser,
  getInfo,
  getInfos,
  getUser,
  getUserLog,
  getUserNames,
  getUsers,
  getUsersLog,
  getValUsers,
  login,
  removeUser,
  removeUsers,
  signup,
  updateUser,
  updateUserInfo
} = require('../../db/users');
const connector = require('../../db/connector');

jest.mock('../../db/connector', () => ({
  db: {
    func: jest.fn(),
    any: jest.fn(),
  },
  queryResult: {
    one: 1,
    many: 2,
    none: 4,
    any: 6
  }
}));

describe('Stations', () => {
  let reqMock;
  let resMock;

  beforeEach(() => {
    const status = jest.fn();
    reqMock = {
      query: {},
      params: {},
      body: {},
    };
    resMock = {
      status,
      send: jest.fn(),
      json: jest.fn(),
    };

    status.mockReturnValue(resMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    connector.db.func.mockRestore();
  });

  describe('changeSit', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.params = {
        id: '1234',
      };
      await changeSit(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('changeSit', 1234, 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Mudou a situação de um usuário',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await changeSit(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('createUser', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.body = {
        role: '1234',
        username: 'davidcosta',
        password: 'password',
      };
      await createUser(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('createClient', [
        1234, 'davidcosta', 'password'
      ], 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Um usuário inserido',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await createUser(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getInfo', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.params = {
        id: '1234',
      };
      await getInfo(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getInfoCli', 1234, 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou as informações de um usuário',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getInfo(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getInfos', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.params = {
        id: '1234',
      };
      await getInfos(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getInfosCli', undefined, 2);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou as informações de todos os usuários',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getInfos(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getUser', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.params = {
        id: '1234',
      };
      await getUser(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getClient', 1234, 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou um usuário',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getUser(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getUserLog', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.params = {
        id: '1234',
      };
      await getUserLog(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getHistCli', [1234, null], 2);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou o histórico de um usuário',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getUserLog(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getUserNames', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      await getUserNames(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getClientsUserName', undefined, 2);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou o nome de todos os usuários',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getUserNames(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getUsers', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      await getUsers(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getClients', undefined, 2);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou todos os usuários',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getUsers(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getUsersLog', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      await getUsersLog(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getHistsCli', null, 2);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou o histórico de todos os usuários',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getUsersLog(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getValUsers', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      await getValUsers(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getValCli', undefined, 2);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou o id e nome de usuários válidos',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getValUsers(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('login', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.body = {
        username: 'davidcosta',
        password: '123456',
      };
      await login(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getClientLogin', [
        'davidcosta', '123456',
      ], 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Login de usuario davidcosta efetuado',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await login(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(401)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Usuário ou password inválidos',
        success: false,
      });
    });
  });

  describe('removeUser', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.params = {
        id: '1234',
      };
      await removeUser(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('delClient', 1234, 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Removeu um usuário',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await removeUser(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('removeUsers', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce({
        rowCount: 5678
      });

      await removeUsers(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('delClients', undefined, 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Removeu 5678 usuários',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await removeUsers(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('signup', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');
      reqMock.body = {
        username: 'david',
        password: 'password',
        fullname: 'fullname',
        email: 'email',
        phone: 'phone',
        profession: 'profession',
        sex: 'sex',
        birthdate: 'birthdate',
      };
      await signup(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('signUpClient', [
        'david', 'password', 'fullname', 'email', 'phone', 'profession', 'sex', 'birthdate'
      ], 6);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Um usuário cadastrado',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await signup(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('updateUser', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');
      reqMock.body = {
        idcli: '1234',
        role: '5678',
        username: 'david',
        password: 'password',
        state: 'ok',
      };
      await updateUser(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('upd_cli', [
        1234, 5678, 'david', 'password', 'ok',
      ], 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Atualizou um usuário',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await updateUser(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('updateUserInfo', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');
      reqMock.body = {
        id: '1234',
        fullname: 'fullname',
        email: 'email',
        phone: 'phone',
        profession: 'profession',
        sex: 'sex',
        birthdate: 'birthdate',
      };
      await updateUserInfo(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('upd_info_cli', [
        1234, 'fullname', 'email', 'phone', 'profession', 'sex', 'birthdate'
      ], 6);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Atualizou as informações de um usuário',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await updateUserInfo(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

});
