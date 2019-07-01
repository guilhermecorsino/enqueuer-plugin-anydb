import {Publisher, InputPublisherModel as PublisherModel} from 'enqueuer';

export class MyPublisher extends Publisher {

    public constructor(publisherProperties: PublisherModel) {
        super(publisherProperties);
    }

    public async publish(): Promise<void> {
        //Publish it to somewhere
        this.executeHookEvent('onFirstHook', {revertedFirst: this.first.split('').reverse().join('')});
        this.executeHookEvent('onSecondHook', {second: this.second.split('').join('.')});
    }

}
