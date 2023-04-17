1. Run `npm install` to install dependencies.
2. Run `node colors.build.js` to generate style files. The source tokens are located in `/tokens` and the output files are in `/build`.
3. Run `npm run dev` to start nextjs.
4. Run `npm run theme` to generate new typings based on the theme.
    - [This capability is only available in Chakra V2, not V1](https://chakra-ui.com/docs/styled-system/cli)
    - Troubleshoot: If the theme typings don't show up immediately, try restarting your TypeScript server (Cmd + Shift + P > "TypeScript: Restart TS server" if you're using VSCode).