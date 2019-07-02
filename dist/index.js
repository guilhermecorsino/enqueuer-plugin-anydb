"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enqueuer_1 = require("enqueuer");
const any_db_publisher_1 = require("./any-db-publisher");
//const publisherDocs = require('any-db-publisher-docs');
function entryPoint(mainInstance) {
    let anyDbPublisher = new enqueuer_1.PublisherProtocol('anyDb', (publisher) => new any_db_publisher_1.AnyDbPublisher(publisher));
    mainInstance.protocolManager.addProtocol(anyDbPublisher);
}
exports.entryPoint = entryPoint;
