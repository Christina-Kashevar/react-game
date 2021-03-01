module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "amd": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
    ],
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js",".ts",".jsx",".tsx"] }],
      // "@typescript-eslint/no-use-before-define": ["warn"],
      // "import/extensions": [".js", ".jsx", ".js", ".jsx", ".ts", ".tsx"]
      // "import/extensions": [
      //   "error",
      //   "ignorePackages",
      //   {
      //     "js": "never",
      //     "jsx": "never",
      //     "ts": "never",
      //     "tsx": "never",
      //     "": "never"
      //   }
      // ]
    },
    "settings": {
      "react": { "version": "detect" },
      "import/extensions": [".js", ".jsx", ".ts", ".tsx", ".mjs"],
    }
};
