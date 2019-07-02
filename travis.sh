#!/bin/bash
docker run --rm --name payments_service \
            -e POSTGRES_USER=user_test \
            -e POSTGRES_PASSWORD=password_test \
            -e POSTGRES_DB=dabatase_name_test \
            -d -p 2345:5432 postgres:9.4
