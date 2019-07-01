import {InputSubscriptionModel as SubscriptionModel, Subscription} from 'enqueuer';

export class MySubscription extends Subscription {

    constructor(subscriptionModel: SubscriptionModel) {
        super(subscriptionModel);
    }

    public async receiveMessage(): Promise<void> {
        //Get the message and send it back as this method return
        this.executeHookEvent('onMessageReceived', {value: this.received, numeral: this.number});
    }

    public async subscribe(): Promise<void> {
        //Override it to open a server, register a listener or something similar
        this.executeHookEvent('onSubscribed', {subscribed: 'yay'});
    }

    public async unsubscribe(): Promise<void> {
        //Override it if you need to close a server, remove a listener or something similar
        this.executeHookEvent('onUnsubscribed', {unsubscribed: 'noo'});
    }

    public async sendResponse(): Promise<void> {
        //If it's a synchronous protocol, feel free to send a response back
        console.log('virgs');
        this.executeHookEvent('onResponseSent', {response: 'sync'});
    }

}
