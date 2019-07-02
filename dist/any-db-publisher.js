"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const enqueuer_1 = require("enqueuer");
const anyDb = __importStar(require("any-db"));
class AnyDbPublisher extends enqueuer_1.Publisher {
    constructor(publisherProperties) {
        super(publisherProperties);
        this.url = `${this.options.driver}://${this.options.user}:${this.options.password}@${this.options.hostname}/${this.options.database}`;
    }
    publish() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let connection = anyDb.createConnection(this.url);
                connection.query(this.query, [], (error, result) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                        return;
                    }
                    console.log(result);
                    resolve(result);
                });
            });
        });
    }
}
exports.AnyDbPublisher = AnyDbPublisher;
