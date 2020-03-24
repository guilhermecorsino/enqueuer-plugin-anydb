export default {
    homepage: 'https://github.com/guilhermecorsino/enqueuer-plugin-sqs',
    description: 'Publisher to handle any DB manipulation',
    libraryHomepage: 'https://www.npmjs.com/package/any-db',
    schema: {
        attributes: {
            payload: {
                type: 'string'
            },
        },
        hooks: {
            onQueryCompleted: {
                description: 'Executed when query is executed correctly',
                arguments: {
                    rowCount: {
                        description: 'Affected rows. Note e.g. for INSERT queries the rows property is not filled even though rowCount is non-zero'
                    },
                    rows: {
                        description: 'Result rows'
                    },
                    fields: {
                        description: 'Result field descriptions'
                    },
                    fieldCount: {},
                    lastInsertId: {},
                    affectedRows: {},
                    changedRows: {},
                }
            }
        }
    }
};
