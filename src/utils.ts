import moment from "moment-timezone";
import {RequestLogger} from "testcafe";
import zlib from "zlib";

export const logger = (...messages: any[]) => {
    console.log(`[${moment().format("HH:mm:ss:SSS")}]   `, ...messages);
};

export const getLoggerResponseJson = (logger: RequestLogger) => {
    const zlib = require("zlib");
    return logger.requests.map((req) => {
        if (!req.response?.body) {
            return;
        }

        const raw = zlib.gunzipSync(req.response.body);
        return JSON.parse(raw);
    });
};

export const toTestTimeString = (date: Date, format = "YYYY-MM-DD HH:mm:ss") => {
    return moment.tz(date, "Europe/Stockholm").format(format);
};

