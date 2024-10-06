const { FlatCompat } = require("@eslint/eslintrc");
const nxEslintPlugin = require("@nx/eslint-plugin");
const eslintJs = require("@eslint/js");
const stylisticTs = require('@stylistic/eslint-plugin-ts');
const perfectionist = require('eslint-plugin-perfectionist');
const tsParser = require("@typescript-eslint/parser");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: eslintJs.configs.recommended,
});

module.exports = [
    { plugins: { "@nx": nxEslintPlugin } },
    {
        ignores: [
            "**/node_modules/**",
            "**/build/**",
            "**/dist/**",
            "**/.nx/**",
        ],
    },
    {
        files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
                sourceType: "module",
            },
        },
        rules: {
            "@nx/enforce-module-boundaries": [
                "warn",
                {
                    enforceBuildableLibDependency: true,
                    allow: [],
                    depConstraints: [
                        {
                            sourceTag: "*",
                            onlyDependOnLibsWithTags: ["*"],
                        },
                    ],
                },
            ],
        },
    },
    ...compat.config({ extends: ["plugin:@nx/typescript"] }).map((config) => ({
        ...config,
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
                sourceType: "module",
            },
        },
        plugins: {
            ...config.plugins,
            "@stylistic/ts": stylisticTs,
            "perfectionist": perfectionist,
        },
        rules: {
            ...config.rules,
            "no-console": "warn",
            "comma-dangle": "off",
            "require-await": "warn",
            "no-return-await": "warn",
            "sort-imports": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/unified-signatures": "warn",
            "@typescript-eslint/switch-exhaustiveness-check": "warn",
            "@typescript-eslint/require-await": "warn",
            "@typescript-eslint/return-await": ["warn", "always"],
            "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "no-type-imports" }],
            "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
            "@stylistic/ts/brace-style": ["warn", "stroustrup", { allowSingleLine: false }],
            "@stylistic/ts/block-spacing": ["warn", "always"],
            "@stylistic/ts/no-extra-semi": "warn",
            "@stylistic/ts/no-extra-parens": "warn",
            "@stylistic/ts/object-curly-spacing": ["warn", "always", { arraysInObjects: true, objectsInObjects: true }],
            "@stylistic/ts/quote-props": ["warn", "consistent-as-needed"],
            "@stylistic/ts/quotes": ["warn", "double", { avoidEscape: false }],
            "@stylistic/ts/comma-dangle": ["warn", "always-multiline"],
            "@stylistic/ts/type-annotation-spacing": "warn",
            "perfectionist/sort-imports": ["warn", {
                type: "natural",
                groups: [
                    "builtin",
                    "external",
                    ["internal"],
                    ["parent", "sibling"],
                ],
                order: "asc",
                internalPattern: ["@app/**", "@src/**", "@shared/**", "@features/**"],
                newlinesBetween: "never",
            }],
        },
    })),
    ...compat.config({ extends: ["plugin:@nx/javascript"] }).map((config) => ({
        ...config,
        files: ["**/*.js", "**/*.jsx"],
        rules: {
            ...config.rules,
        },
    })),
    ...compat.config({ env: { jest: true } }).map((config) => ({
        ...config,
        files: ["**/*.spec.ts", "**/*.spec.tsx", "**/*.spec.js", "**/*.spec.jsx"],
        rules: {
            ...config.rules,
        },
    })),
];
