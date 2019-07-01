import {Asserter, Assertion, OutputTestModel} from 'enqueuer';

export class MyAsserter implements Asserter {
    assert(assertion: Assertion, literal: any): OutputTestModel {
        return {
            name: assertion.name,
            valid: assertion.assertThat == assertion.is,
            description: `Assert that ${literal.assertThat} is ${assertion.is}, got ${assertion.assertThat}`
        };
    }

}
