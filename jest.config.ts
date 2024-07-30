module.exports = {
  preset: "next/jest", // Utiliza el preset de Next.js
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"], // Asegúrate de que esta ruta sea correcta
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transforma archivos .ts y .tsx
    "^.+\\.jsx?$": "babel-jest", // Transforma archivos .js y .jsx
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Ajusta según tu estructura de carpetas
  },
  transformIgnorePatterns: [
    "node_modules/(?!(your-module-name|another-module-name)/)",
  ],
};
