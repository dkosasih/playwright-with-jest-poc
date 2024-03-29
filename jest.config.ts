import { parseCliParams } from "./src/utility/config/cli";
import { CUSTOM_DEVICE_OPTIONS } from "./src/utility/config/customDevice";
import { CONNECT_OPTIONS } from "./src/utility/config/connectOptions";

const params = parseCliParams(process.argv);
const browsers: string[] = params?.["browser"]
  ? params["browser"].split(",")
  : ["chromium"];
const headless: boolean = params?.["headless"]
  ? Boolean(params["headless"])
  : false;
const customDevice: boolean = params?.["customDevice"]
  ? Boolean(params["customDevice"])
  : false;
const devices: any = customDevice
  ? CUSTOM_DEVICE_OPTIONS
  : params?.["devices"]
  ? params["devices"].split(",")
  : [];
const isConnectOptions: boolean = params?.["connectoptions"]
  ? Boolean(params["connectoptions"])
  : false;
const connectOptions = isConnectOptions ? CONNECT_OPTIONS : {};
const options = {
  resetContextPerTest: true,
};
module.exports = {
  preset: "jest-playwright-preset",
  testMatch: ["**/specs/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
  verbose: true,
  testTimeout: 20000,
  setupFilesAfterEnv: ["expect-playwright"],
  testEnvironmentOptions: {
    "jest-playwright": {
      browsers: browsers,
      launchOptions: {
        headless: headless,
      },
      devices: devices,
      connectOptions: {
        ...connectOptions,
      },
      ...options,
    },
  },
};