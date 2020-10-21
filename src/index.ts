import {MainInstance, ProtocolDocumentation, PublisherProtocol} from 'enqueuer';
import {AnyDbPublisher} from './anydb-publisher';
import * as docs from './anydb-publisher-docs';

export function entryPoint(mainInstance: MainInstance): void {
    let anyDbPublisher = new PublisherProtocol('anydb',
        (publisher) => new AnyDbPublisher(publisher),
        docs.default as ProtocolDocumentation);
    mainInstance.protocolManager.addProtocol(anyDbPublisher);
}
