import createTestCafe from "testcafe";
import moment from "moment-timezone";
import {logger} from "./utils";

const ffmpeg = require("@ffmpeg-installer/ffmpeg");

const CONFIGS = {
    ci: {
        host: "https://review-web-gabbar-dev.apps.devtest.vxdqgl7u.kubeapp.cloud",
        browsers: "chromium --headless --no-sandbox --disable-dev-shm-usage",
        concurrency: 3,
        selectorTimeout: 30000,
        assertionTimeout: 30000,
        quarantineMode: true,
        videos: {
            failedOnly: true,
            pathPattern: "${TEST}/${DATE} ${TIME}",
            ffmpegPath: ffmpeg.path,
        },
        screenshots: {
          takeOnFails: true,
          path: ".screenshots",
          pathPattern: "${FIXTURE}/${TEST}",
        },
    },
    local: {
        host: "https://review-web-gabbar-dev.apps.devtest.vxdqgl7u.kubeapp.cloud",
        browsers: "chrome:headless",
        concurrency: 5,
        selectorTimeout: 30000,
        assertionTimeout: 5000,
        quarantineMode: false,
        videos: {
            failedOnly: true,
            pathPattern: "${TEST}/${DATE} ${TIME}",
            ffmpegPath: ffmpeg.path,
        },
    },
};

(async () => {
    const [, , environment, url ,concurrency, browser] = process.argv;
    const testConf = CONFIGS[environment];
    if (url) {
        process.env.TEST_URL = url;
    } else {
        process.env.TEST_URL = testConf.host;
    }
    logger("Started tests for: ", `${environment}: ${process.env.TEST_URL}`);

    logger("System timezone: ", moment.tz.guess());
    const testCafe = await createTestCafe("localhost", 1337, 1338);
    const runner = await testCafe.createRunner();

    runner
        .src([".dist/**/*.cafe.js"])
        .browsers(browser || testConf.browsers)
        .concurrency(Number.parseInt(concurrency) || testConf.concurrency)
        .clientScripts([
            {
                module: "lodash",
            },
            {
                module: "@testing-library/dom/dist/@testing-library/dom.umd.js",
            },
        ])
        .reporter("spec-time");

    if (testConf.videos) {
        runner.video(".reports/videos", testConf.videos);
    }

    await runner
        .run({
            selectorTimeout: testConf.selectorTimeout,
            assertionTimeout: testConf.assertionTimeout,
            quarantineMode: testConf.quarantineMode,
            pageLoadTimeout: 10000,
            debugMode: false,
        })
        .then((failedCount) => {
            testCafe.close();
            const exitStatus = failedCount > 0 ? 1 : 0;
            process.exit(exitStatus);
            logger(`Exiting with status ${exitStatus} - Failed tests: ${failedCount}`);
        });
})();
