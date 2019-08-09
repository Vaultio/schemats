"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var sinon = require("sinon");
var Index = require("../../src/index");
var Typescript = require("../../src/typescript");
var options_1 = require("../../src/options");
var options = {};
describe("index", function () {
    var typedTableSandbox = sinon.sandbox.create();
    var db = {
        getDefaultSchema: typedTableSandbox.stub(),
        getTableTypes: typedTableSandbox.stub(),
        query: typedTableSandbox.stub(),
        getEnumTypes: typedTableSandbox.stub(),
        getCompositeTypes: typedTableSandbox.stub(),
        getTableDefinition: typedTableSandbox.stub(),
        getSchemaTables: typedTableSandbox.stub(),
        connectionString: "sql://",
    };
    var tsReflection = Typescript;
    var dbReflection = db;
    before(function () {
        typedTableSandbox.stub(Typescript, "generateEnumType");
        typedTableSandbox.stub(Typescript, "generateTableTypes");
        typedTableSandbox.stub(Typescript, "generateTableInterface");
    });
    beforeEach(function () {
        typedTableSandbox.reset();
    });
    after(function () {
        typedTableSandbox.restore();
    });
    describe("typescriptOfTable", function () {
        it("calls functions with correct params", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbReflection.getTableTypes.returns(Promise.resolve("tableTypes"));
                        return [4 /*yield*/, Index.typescriptOfTable(db, "tableName", "schemaName", new options_1.default(options))];
                    case 1:
                        _a.sent();
                        assert.deepEqual(dbReflection.getTableTypes.getCall(0).args, [
                            "tableName",
                            "schemaName",
                            new options_1.default(options),
                        ]);
                        assert.deepEqual(tsReflection.generateTableTypes.getCall(0).args, [
                            "tableName",
                            "tableTypes",
                            new options_1.default(options),
                        ]);
                        assert.deepEqual(tsReflection.generateTableInterface.getCall(0).args, [
                            "tableName",
                            "tableTypes",
                            new options_1.default(options),
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("merges string results", function () { return __awaiter(void 0, void 0, void 0, function () {
            var typescriptString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbReflection.getTableTypes.returns(Promise.resolve("tableTypes"));
                        tsReflection.generateTableTypes.returns("generatedTableTypes\n");
                        tsReflection.generateTableInterface.returns("generatedTableInterfaces\n");
                        return [4 /*yield*/, Index.typescriptOfTable(db, "tableName", "schemaName", new options_1.default(options))];
                    case 1:
                        typescriptString = _a.sent();
                        assert.equal(typescriptString, "generatedTableTypes\ngeneratedTableInterfaces\n");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("typescriptOfSchema", function () {
        it("has schema", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tsOfSchema;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbReflection.getSchemaTables.returns(Promise.resolve(["tablename"]));
                        dbReflection.getEnumTypes.returns(Promise.resolve("enumTypes"));
                        tsReflection.generateTableTypes.returns("generatedTableTypes\n");
                        tsReflection.generateEnumType.returns("generatedEnumTypes\n");
                        return [4 /*yield*/, Index.typescriptOfSchema(db, [], "schemaName", options)];
                    case 1:
                        tsOfSchema = _a.sent();
                        assert.deepEqual(dbReflection.getSchemaTables.getCall(0).args[0], "schemaName");
                        assert.deepEqual(dbReflection.getEnumTypes.getCall(0).args[0], "schemaName");
                        assert.deepEqual(tsReflection.generateEnumType.getCall(0).args[0], "enumTypes");
                        assert.deepEqual(tsReflection.generateTableTypes.getCall(0).args[0], "tablename");
                        return [2 /*return*/];
                }
            });
        }); });
        it("has tables provided", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tsOfSchema;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbReflection.getSchemaTables.returns(Promise.resolve(["tablename"]));
                        dbReflection.getEnumTypes.returns(Promise.resolve("enumTypes"));
                        tsReflection.generateTableTypes.returns("generatedTableTypes\n");
                        tsReflection.generateEnumType.returns("generatedEnumTypes\n");
                        return [4 /*yield*/, Index.typescriptOfSchema(db, ["differentTablename"], null, options)];
                    case 1:
                        tsOfSchema = _a.sent();
                        assert(!dbReflection.getSchemaTables.called);
                        assert.deepEqual(tsReflection.generateEnumType.getCall(0).args[0], "enumTypes");
                        assert.deepEqual(tsReflection.generateTableTypes.getCall(0).args[0], "differentTablename");
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=index.test.js.map