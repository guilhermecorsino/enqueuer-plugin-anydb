import {MainInstance, ProtocolDocumentation, PublisherProtocol} from 'enqueuer';
import {AnyDbPublisher} from './any-db-publisher';
import * as docs from './any-db-publisher-docs';

export function entryPoint(mainInstance: MainInstance): void {
    let anyDbPublisher = new PublisherProtocol('anydb',
        (publisher) => new AnyDbPublisher(publisher),
        docs.default as ProtocolDocumentation);
    mainInstance.protocolManager.addProtocol(anyDbPublisher);
}
