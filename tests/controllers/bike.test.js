const {
  getBikes,
  getOnRideBikes,
  getBikesName,
  getValBks,
  getBike,
  getBikesSt,
  getBikesOnSt,
  getBikesOffSt,
  getBikeLog,
  getBikeLogs,
  createBike,
  changeState,
  removeBike,
  removeBikes,
  updateBike,
  updateStation,
} = require('../../db/bikes');
const connector = require('../../db/connector');

jest.mock('../../db/connector', () => ({
  db: {
    func: jest.fn(),
  },
  queryResult: {
    one: 1,
    many: 2,
    none: 4,
    any: 6
  }
}));

describe('Bike', () => {
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

  describe('getBikes', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      await getBikes(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getBikes', undefined, 6);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou todas as bikes',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getBikes(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getOnRideBikes', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');

      await getOnRideBikes(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getOnRideBikes', undefined, 6);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou todas as bikes cedidas',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getOnRideBikes(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getBikesName', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');

      await getBikesName(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getBksName', undefined, 6);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou o nome de todas as bikes',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getBikesName(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getValBks', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');

      await getValBks(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getOpBikes', undefined, 6);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou o ID e o nome de bicicletas válidas',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getValBks(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getBike', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');
      reqMock.params = {
        id: 1234,
      };

      await getBike(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getBike', 1234, 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou uma bike',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getBike(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getBikesSt', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');
      reqMock.params = {
        id: '1234',
      };

      await getBikesSt(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getBikesSt', 1234, 6);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou todas as bikes da estação',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getBikesSt(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getBikesOnSt', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');
      reqMock.params = {
        id: '1234',
      };

      await getBikesOnSt(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getBikesOnSt', 1234, 6);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou todas as bikes que estão na estação',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getBikesOnSt(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getBikesOffSt', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');
      reqMock.params = {
        id: '1234',
      };

      await getBikesOffSt(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getBikesOffSt', 1234, 6);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou todas as bikes que sairam da estação',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getBikesOffSt(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getBikeLogs', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');

      await getBikeLogs(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getHistsBike', null, 6);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou o histórico de todas as bikes',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getBikeLogs(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getBikeLog', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');
      reqMock.params = {
        id: '1234',
      };

      await getBikeLog(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getHistBike', [1234, null], 6);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou o histórico de uma bike',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getBikeLog(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('createBike', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');
      reqMock.body = {
        name: 'David',
      };

      await createBike(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('createBike', 'David', 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Uma bike inserida',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await createBike(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('updateBike', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');
      reqMock.body = {
        idbike: '1234',
        name: 'David',
        state: 'ok',
      };

      await updateBike(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('upd_bike', [1234, 'David', 'ok'], 6);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Atualizou uma bike',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await updateBike(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('updateStation', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');
      reqMock.params = {
        bk: '1234',
        st: '5678',
        sl: '91011',
      };

      await updateStation(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('upd_bikeSt', [1234, 5678, 91011], 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Atualizou a estação de uma bike',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await updateStation(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('removeBike', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');
      reqMock.params = {
        id: '1234',
      };

      await removeBike(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('delBike', 1234, 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Removeu uma bike',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await removeBike(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('removeBikes', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce({
        rowCount: 5678
      });
      reqMock.params = {
        id: '1234',
      };

      await removeBikes(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('delBikes', undefined, 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Removeu 5678 bikes',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await removeBikes(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('changeState', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal');
      reqMock.params = {
        id: '1234',
      };

      await changeState(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('changeBikeState', 1234, 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Mudou o estado de 1 bike',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await changeState(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });
});
