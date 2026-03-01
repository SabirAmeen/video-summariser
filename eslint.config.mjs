import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  globalIgnores([".output/**", "out/**", "build/**", "src/routeTree.gen.ts"]),
]);

export default eslintConfig;
