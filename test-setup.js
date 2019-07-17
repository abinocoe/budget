import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { NativeModules } from "react-native";
import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock";

Enzyme.configure({ adapter: new Adapter() });

// Override default mock. Having fontScale to one makes it easier
// to validate the correct styles in snapshot tests.
NativeModules.DeviceInfo.Dimensions.window.fontScale = 1;
NativeModules.DeviceInfo.Dimensions.window.scale = 1;

jest.mock("@react-native-community/async-storage", () => mockAsyncStorage);
