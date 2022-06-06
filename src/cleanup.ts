import {logger} from "./utils";

const ignoreError = async (promise: Promise<any>) => {
    try {
        await promise;
    } catch (err) {
        logger("Error: ", err);
    }
};
(async () => {
    logger("Start cleanup ...");

    await Promise.all([

    ]);

    logger("Cleanup finished!");
})();
