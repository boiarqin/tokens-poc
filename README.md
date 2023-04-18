1. Run `npm install` to install dependencies.
2. Run `node colors.build.js` to generate style files. The source tokens are located in `/tokens` and the output files are in `/build`.
3. Run `npm run dev` to start nextjs.
4. Run `npm run theme` to generate new typings based on the theme. This works with both VS Code and Webstorm.
    - [This capability is only available in Chakra V2, not V1](https://chakra-ui.com/docs/styled-system/cli)
    - Troubleshoot: If the theme typings don't show up immediately, try restarting your TypeScript server (Cmd + Shift + P > "TypeScript: Restart TS server" if you're using VSCode).
    - Troubleshoot: There is a maximum scan depth of 3 on tokens. types will not get generated for tokens nested too deeply. (have to flatten names or remove outer structure)
5. Optional: Run `node icons.build.js` to generate JSX files based on icon SVGs. The source icons are in `/assets` and the output files are in `/build/icons`.