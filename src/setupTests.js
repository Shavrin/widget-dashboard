import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { act, cleanup } from "@testing-library/react";
import { configMocks, mockAnimationsApi } from "jsdom-testing-mocks";

mockAnimationsApi();

configMocks({ act });

afterEach(cleanup);
