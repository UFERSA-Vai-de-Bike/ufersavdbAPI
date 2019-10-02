const {
  doLoan,
  doReturn,
  getAllLogs,
  getBikeOfCli,
  getCountAllLogs,
  getCountBk,
  getCountCli,
  getCountSt,
  getLogBk,
  getLogCli,
  getLogSt
} = require("../../db/transactions");
const connector = require("../../db/connector");

jest.mock("../../db/connector", () => ({
  db: {
    func: jest.fn(),
    any: jest.fn()
  },
  queryResult: {
    one: 1,
    many: 2,
    none: 4,
    any: 6
  }
}));

describe("Stations", () => {
  let reqMock;
  let resMock;

  beforeEach(() => {
    const status = jest.fn();
    reqMock = {
      query: {},
      params: {},
      body: {}
    };
    resMock = {
      status,
      send: jest.fn(),
      json: jest.fn()
    };

    status.mockReturnValue(resMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    connector.db.func.mockRestore();
  });

  describe("doLoan", () => {
    it("should send the success content", async () => {
      connector.db.func.mockResolvedValueOnce("legal");
      reqMock.params = {
        cli: "1234",
        bk: "5678",
        st: "91011",
        sl: "1213"
      };
      await doLoan(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith(
        "open_vdb_log",
        [1234, 5678, 91011, 1213],
        1
      );
      expect(resMock.status).toBeCalledWith(200);
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: "Uma bike foi entregue",
        success: true
      });
    });

    it("should send a error message", async () => {
      connector.db.func.mockRejectedValueOnce("rejected!");

      await doLoan(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500);
      expect(resMock.json).toBeCalledWith({
        data: "rejected!",
        message: "Operação mal sucedida",
        success: false
      });
    });
  });

  describe("doReturn", () => {
    it("should send the success content", async () => {
      connector.db.func.mockResolvedValueOnce("legal");
      reqMock.params = {
        cli: "1234",
        bk: "5678",
        st: "91011",
        sl: "1213"
      };
      await doReturn(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith(
        "close_vdb_log",
        [1234, 5678, 91011, 1213],
        1
      );
      expect(resMock.status).toBeCalledWith(200);
      expect(resMock.json).toBeCalledWith({
        data: {},
        message: "Uma bike foi devolvida",
        success: true
      });
    });

    it("should send a error message", async () => {
      connector.db.func.mockRejectedValueOnce("rejected!");

      await doReturn(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500);
      expect(resMock.json).toBeCalledWith({
        data: "rejected!",
        message: "Operação mal sucedida",
        success: false
      });
    });
  });

  describe("getAllLogs", () => {
    it("should send the success content", async () => {
      connector.db.func.mockResolvedValueOnce("legal");
      await getAllLogs(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith("getvdbLogs", undefined, 6);
      expect(resMock.status).toBeCalledWith(200);
      expect(resMock.json).toBeCalledWith({
        data: "legal",
        message: "Retornou todas as transações",
        success: true
      });
    });

    it("should send a error message", async () => {
      connector.db.func.mockRejectedValueOnce("rejected!");

      await getAllLogs(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500);
      expect(resMock.json).toBeCalledWith({
        data: "rejected!",
        message: "Operação mal sucedida",
        success: false
      });
    });
  });

  describe("getBikeOfCli", () => {
    it("should send the success content", async () => {
      connector.db.func.mockResolvedValueOnce("legal");
      reqMock.params = {
        id: "1234"
      };
      await getBikeOfCli(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith("getBikeOfCli", 1234, 1);
      expect(resMock.status).toBeCalledWith(200);
      expect(resMock.json).toBeCalledWith({
        data: "legal",
        message: "Retorna a bike de um usuário",
        success: true
      });
    });

    it("should send a error message", async () => {
      connector.db.func.mockRejectedValueOnce("rejected!");

      await getBikeOfCli(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500);
      expect(resMock.json).toBeCalledWith({
        data: "rejected!",
        message: "Operação mal sucedida",
        success: false
      });
    });
  });

  describe("getCountAllLogs", () => {
    it("should send the success content", async () => {
      connector.db.func.mockResolvedValueOnce("legal");
      await getCountAllLogs(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith("getCountAllLogs", undefined, 1);
      expect(resMock.status).toBeCalledWith(200);
      expect(resMock.json).toBeCalledWith({
        data: "legal",
        message: "Retornou o total de transações",
        success: true
      });
    });

    it("should send a error message", async () => {
      connector.db.func.mockRejectedValueOnce("rejected!");

      await getCountAllLogs(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500);
      expect(resMock.json).toBeCalledWith({
        data: "rejected!",
        message: "Operação mal sucedida",
        success: false
      });
    });
  });

  describe("getCountBk", () => {
    it("should send the success content", async () => {
      connector.db.func.mockResolvedValueOnce("legal");
      reqMock.params = {
        id: "1234"
      };
      await getCountBk(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith("getCountAllLogsBk", 1234, 1);
      expect(resMock.status).toBeCalledWith(200);
      expect(resMock.json).toBeCalledWith({
        data: "legal",
        message: "Retornou o total de transações de uma bicicleta",
        success: true
      });
    });

    it("should send a error message", async () => {
      connector.db.func.mockRejectedValueOnce("rejected!");

      await getCountBk(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500);
      expect(resMock.json).toBeCalledWith({
        data: "rejected!",
        message: "Operação mal sucedida",
        success: false
      });
    });
  });

  describe("getCountCli", () => {
    it("should send the success content", async () => {
      connector.db.func.mockResolvedValueOnce("legal");
      reqMock.params = {
        id: "1234"
      };
      await getCountCli(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith("getCountAllLogsCli", 1234, 1);
      expect(resMock.status).toBeCalledWith(200);
      expect(resMock.json).toBeCalledWith({
        data: "legal",
        message: "Retornou o total de transações de um cliente",
        success: true
      });
    });

    it("should send a error message", async () => {
      connector.db.func.mockRejectedValueOnce("rejected!");

      await getCountCli(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500);
      expect(resMock.json).toBeCalledWith({
        data: "rejected!",
        message: "Operação mal sucedida",
        success: false
      });
    });
  });

  describe("getCountSt", () => {
    it("should send the success content", async () => {
      connector.db.func.mockResolvedValueOnce("legal");
      reqMock.params = {
        id: "1234"
      };
      await getCountSt(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith("getCountAllLogsSt", 1234, 1);
      expect(resMock.status).toBeCalledWith(200);
      expect(resMock.json).toBeCalledWith({
        data: "legal",
        message: "Retornou o total de transações de uma estação",
        success: true
      });
    });

    it("should send a error message", async () => {
      connector.db.func.mockRejectedValueOnce("rejected!");

      await getCountSt(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500);
      expect(resMock.json).toBeCalledWith({
        data: "rejected!",
        message: "Operação mal sucedida",
        success: false
      });
    });
  });

  describe("getLogBk", () => {
    it("should send the success content", async () => {
      connector.db.func.mockResolvedValueOnce("legal");
      reqMock.params = {
        id: "1234"
      };
      await getLogBk(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith("getvdbLogsBk", 1234, 6);
      expect(resMock.status).toBeCalledWith(200);
      expect(resMock.json).toBeCalledWith({
        data: "legal",
        message: "Retornou as transações de uma bike",
        success: true
      });
    });

    it("should send a error message", async () => {
      connector.db.func.mockRejectedValueOnce("rejected!");

      await getLogBk(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500);
      expect(resMock.json).toBeCalledWith({
        data: "rejected!",
        message: "Operação mal sucedida",
        success: false
      });
    });
  });

  describe("getLogCli", () => {
    it("should send the success content", async () => {
      connector.db.func.mockResolvedValueOnce("legal");
      reqMock.params = {
        id: "1234"
      };
      await getLogCli(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith("getvdbLogsCli", 1234, 6);
      expect(resMock.status).toBeCalledWith(200);
      expect(resMock.json).toBeCalledWith({
        data: "legal",
        message: "Retornou as transações de um usuário",
        success: true
      });
    });

    it("should send a error message", async () => {
      connector.db.func.mockRejectedValueOnce("rejected!");

      await getLogCli(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500);
      expect(resMock.json).toBeCalledWith({
        data: "rejected!",
        message: "Operação mal sucedida",
        success: false
      });
    });
  });

  describe("getLogSt", () => {
    it("should send the success content", async () => {
      connector.db.func.mockResolvedValueOnce("legal");
      reqMock.params = {
        id: "1234"
      };
      await getLogSt(reqMock, resMock);

      expect(connector.db.func).toBeCalledWith("getvdbLogsSt", 1234, 6);
      expect(resMock.status).toBeCalledWith(200);
      expect(resMock.json).toBeCalledWith({
        data: "legal",
        message: "Retornou as transações de uma estação",
        success: true
      });
    });

    it("should send a error message", async () => {
      connector.db.func.mockRejectedValueOnce("rejected!");

      await getLogSt(reqMock, resMock);

      expect(resMock.status).toBeCalledWith(500);
      expect(resMock.json).toBeCalledWith({
        data: "rejected!",
        message: "Operação mal sucedida",
        success: false
      });
    });
  });
});
