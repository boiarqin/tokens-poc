
1. Need a generated token file from Figma Studio Tokens Plugin (`tokens.json`)
2. Following https://docs.tokens.studio/sync/github#7-how-to-use-tokens-stored-in-github-in-development, install token-transformer
What does Token Transformer do?
Converts tokens from Tokens Studio for Figma to something Style Dictionary can read, removing any math operations or aliases, only resulting in raw values.

3. Run `npx token-transformer tokens.json output.json`. `output.json` doesn't look very different at first glance, but string-parsed numbers are converted to numbers and references "{spacing.sm}" are interpolated.
4. Install style-dictionary (https://github.com/amzn/style-dictionary/), set up `config.json` for just sass variables, and did `npx style-dictionary build`. That generated `build/scss/_variables.scss`

- running into issue parsing fontweights
"fontWeight": {
        "value": "{fontWeights.petersburg-1}",
        "type": "fontWeights",
        "failedToResolve": true
      },
    fontWeights.petersburg-1 value needs to be fixed; petersburg-3 and petersburg-4 were fine.
    Simply replacing the value in output.json worked.

    rem usage?
    

5. Install Tailwind plugin (https://github.com/nado1001/style-dictionary-tailwindcss-transformer), set up `tailwind.build.js` to generate tailwind.config.js and tailwind.css files. Ran `node tailwind.build.js` which generated them in `build/web/tailwind.config.js` and `styles/tailwind.css`

To summarize:
Grouping of tokens
- any structure/lack of structure in the original tokens.json gets transferred to the final output, unless you do additional custom transforms on top of it.
So unless we have structure that groups spacing values under "spacing", (or logic to grab all spacing values) they all get dumped into 
- all structure names, e.g. "ref", are preserved as well.
- comments can be added, which will be helpful in referring to the original design system name.

Transformation:
- Drop shadow needs to be modified. (token-transformer has an expand drop shadow option)
- Use rems where possible, otherwise everything referencing will get converted to px. Rely on baseFontSize setting
- Token Studio has its own custom style-dictionary transforms to use: https://github.com/tokens-studio/sd-transforms
`npm install @tokens-studio/sd-transforms`

all the properties get spread out as color/type/x/y/blur/spread, but will need to be merged together
"elevation_1": {
        0: {
          color: "var(--elevation-1-0-color)",
          type: "var(--elevation-1-0-type)",
          x: "var(--elevation-1-0-x)",
          y: "var(--elevation-1-0-y)",
          blur: "var(--elevation-1-0-blur)",
          spread: "var(--elevation-1-0-spread)"
        },
        1: {
          color: "var(--elevation-1-1-color)",
          type: "var(--elevation-1-1-type)",
          x: "var(--elevation-1-1-x)",
          y: "var(--elevation-1-1-y)",
          blur: "var(--elevation-1-1-blur)",
          spread: "var(--elevation-1-1-spread)"
        },
        2: {
          color: "var(--elevation-1-2-color)",
          type: "var(--elevation-1-2-type)",
          x: "var(--elevation-1-2-x)",
          y: "var(--elevation-1-2-y)",
          blur: "var(--elevation-1-2-blur)",
          spread: "var(--elevation-1-2-spread)"
        },
        3: {
          color: "var(--elevation-1-3-color)",
          type: "var(--elevation-1-3-type)",
          x: "var(--elevation-1-3-x)",
          y: "var(--elevation-1-3-y)",
          blur: "var(--elevation-1-3-blur)",
          spread: "var(--elevation-1-3-spread)"
        }
      },