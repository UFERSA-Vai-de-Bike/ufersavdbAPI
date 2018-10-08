const {
  assignSlot,
  changeSlotState,
  changeStationState,
  createStation,
  deassignSlot,
  getSlots,
  getStation,
  getStationLog,
  getStationLogs,
  getStations,
  getStationsName,
  getValSts,
  removeStation,
  removeStations,
  updateStation,
} = require('../../db/stations');
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

  describe('assignSlot', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.params = {
        id: '1234',
      };
      await assignSlot(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('assignSlot', 1234, 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Adicionou 1 slot a uma estação',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await assignSlot(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('changeSlotState', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.params = {
        st: '1234',
        sl: '5678',
      };
      await changeSlotState(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('changeSlotState', [1234, 5678], 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Alterou o estado do 5678º slot de uma estação',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await changeSlotState(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('changeStationState', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.params = {
        id: '1234',
      };
      await changeStationState(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('changeStationState', 1234, 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Mudou o estado de 1 estação',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await changeStationState(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('createStation', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.body = {
        name: 'David',
        password: 'password',
        lat: '1234',
        lon: '5678',
      };
      await createStation(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('createBikeStation', [
        'David', 'password', '1234', '5678',
      ]);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Uma estação inserida',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await createStation(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('deassignSlot', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.params = {
        st: '1234',
        sl: '5678',
      };
      await deassignSlot(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('deassignSlot', [1234, 5678], 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Removeu o 5678º slot de uma estação',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await deassignSlot(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getSlots', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.params = {
        id: '1234',
      };
      await getSlots(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getSlots', 1234, 2);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou os slots de uma estação',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getSlots(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getStation', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.params = {
        id: '1234',
      };
      await getStation(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getStation', 1234, 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou uma estação',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getStation(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getStationLog', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.params = {
        id: '1234',
      };
      await getStationLog(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getHistStation', [1234, null], 2);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou o histórico de uma estação',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getStationLog(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getStationLogs', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      await getStationLogs(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getHistsStation',null, 2);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou o histórico de todas as estações',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getStationLogs(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getStationsName', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      await getStationsName(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getStsName',undefined, 2);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou o nome de todas as estações',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getStationsName(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getStations', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      await getStations(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('getStations',undefined, 2);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou todas as estações',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await getStations(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('getValSts', () => {
    it('should send the success content', async () => {
      connector.db.any.mockResolvedValueOnce('legal')
      await getValSts(reqMock, resMock);

      expect(connector.db.any).toBeCalledWith('select st.idStation, st.name, st.lat, st.lon, json_agg((ss.slot, ss.bike)) as slots from bike_station as st, station_slot as ss where ss.idStation = st.idStation AND ss.state = TRUE AND st.state = TRUE GROUP BY st.idStation;');
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: 'legal',
        message: 'Retornou informações válidas de estações válidas',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.any.mockRejectedValueOnce('rejected!');

      await getValSts(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('removeStation', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.params = {
        id: '1234',
      };
      await removeStation(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('delStation', 1234, 2);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Removeu uma estação',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await removeStation(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500)
      expect(resMock.json).toBeCalledWith({
        data: 'rejected!',
        message: 'Operação mal sucedida',
        success: false,
      });
    });
  });

  describe('removeStations', () => {
    it('should send the success content', async () => {
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.params = {
        id: '1234',
      };
      await removeStations(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('delStations', undefined, 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Removeu 1 estação',
        success: true,
      });
    });

    it('should send a error message', async () => {
      connector.db.func.mockRejectedValueOnce('rejected!');

      await removeStations(reqMock, resMock);

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
      connector.db.func.mockResolvedValueOnce('legal')
      reqMock.body = {
        idstation: '1234',
        name: 'David',
        password: 'password',
        lat: '1234',
        lon: '5678',
        state: 'ok',
      };
      await updateStation(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith('upd_bike_station', [
        1234, 'David', 'password', '1234', '5678', 'ok'
      ], 1);
      expect(resMock.status).toBeCalledWith(200)
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: 'Atualizou uma estação',
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
});
