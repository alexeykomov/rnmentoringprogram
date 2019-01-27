module.exports = {
    "parser": "babel-eslint",
    "extends": ["google", "prettier", "plugin:react/recommended"],
    "plugins": ["prettier", "react", "babel"],
    "rules": {
        "prettier/prettier": "error",
        "require-jsdoc": "off",
        "no-invalid-this": 0,
        "babel/no-invalid-this": 1
    },
};