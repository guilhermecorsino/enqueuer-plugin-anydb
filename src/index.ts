import {
    InputPublisherModel as PublisherModel,
    InputSubscriptionModel as SubscriptionModel,
    MainInstance,
    PublisherProtocol,
    SubscriptionProtocol
} from 'enqueuer';
import { AnyDbPublisher } from './any-db-publisher';

export function entryPoint(mainInstance: MainInstance): void {
  let anyDbPublisher = new PublisherProtocol('anyDb', (publisher) => new AnyDbPublisher(publisher));
  mainInstance.protocolManager.addProtocol(anyDbPublisher)
}
