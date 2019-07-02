import {
    InputPublisherModel as PublisherModel,
    InputSubscriptionModel as SubscriptionModel,
    MainInstance,
    PublisherProtocol,
    SubscriptionProtocol
} from 'enqueuer';
import { AnyDbPublisher } from './any-db-publisher';
//const publisherDocs = require('any-db-publisher-docs');

export function entryPoint(mainInstance: MainInstance): void {
  let anyDbPublisher = new PublisherProtocol('anyDb', (publisher) => new AnyDbPublisher(publisher));
  mainInstance.protocolManager.addProtocol(anyDbPublisher);
}
