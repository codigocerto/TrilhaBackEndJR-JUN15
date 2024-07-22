import { CategoryProvider } from "typescript-logging-category-style";
import { LogLevel } from "typescript-logging";

const provider = CategoryProvider.createProvider("APP_LOGGER_PROVIDER", {
  level: LogLevel.Debug,
});
export const getLogger = provider.getCategory("USE_CASE");
