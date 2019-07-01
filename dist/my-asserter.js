"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyAsserter {
    assert(assertion, literal) {
        return {
            name: assertion.name,
            valid: assertion.assertThat == assertion.is,
            description: `Assert that ${literal.assertThat} is ${assertion.is}, got ${assertion.assertThat}`
        };
    }
}
exports.MyAsserter = MyAsserter;
