# stakater-nordmart-review-e2e
End to end tests for nordmart review

### How to run
#### Locally using NPM
``npm run start local -- local {{TEST_URL}}``
#### CI using Docker
``docker build -t {{IMG_NAME}} .``

``docker run -it {{IMG_NAME}} ci {{TEST_URL}}``
