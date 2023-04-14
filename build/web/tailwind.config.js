/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      global: {
        sizing: {
          48: "var(--global-sizing-48)",
          56: "var(--global-sizing-56)",
          64: "var(--global-sizing-64)",
          72: "var(--global-sizing-72)",
          80: "var(--global-sizing-80)",
          96: "var(--global-sizing-96)",
          xsm: "var(--global-sizing-xsm)",
          sm: "var(--global-sizing-sm)",
          md: "var(--global-sizing-md)",
          lg: "var(--global-sizing-lg)",
          xlg: "var(--global-sizing-xlg)"
        },
        colors: {
          neutral: {
            10: "var(--global-colors-neutral-10)",
            20: "var(--global-colors-neutral-20)",
            30: "var(--global-colors-neutral-30)",
            40: "var(--global-colors-neutral-40)",
            50: "var(--global-colors-neutral-50)",
            60: "var(--global-colors-neutral-60)",
            70: "var(--global-colors-neutral-70)",
            80: "var(--global-colors-neutral-80)",
            85: "var(--global-colors-neutral-85)",
            90: "var(--global-colors-neutral-90)",
            95: "var(--global-colors-neutral-95)",
            98: "var(--global-colors-neutral-98)",
        "100White": "var(--global-colors-neutral-100-white)",
        "00Black": "var(--global-colors-neutral-00-black)"
          },
          primary: {
            10: "var(--global-colors-primary-10)",
            20: "var(--global-colors-primary-20)",
            30: "var(--global-colors-primary-30)",
            40: "var(--global-colors-primary-40)",
            50: "var(--global-colors-primary-50)",
            60: "var(--global-colors-primary-60)",
            70: "var(--global-colors-primary-70)",
            80: "var(--global-colors-primary-80)",
            85: "var(--global-colors-primary-85)",
            90: "var(--global-colors-primary-90)",
            95: "var(--global-colors-primary-95)"
          },
          success: {
            10: "var(--global-colors-success-10)",
            20: "var(--global-colors-success-20)",
            30: "var(--global-colors-success-30)",
            40: "var(--global-colors-success-40)",
            50: "var(--global-colors-success-50)",
            60: "var(--global-colors-success-60)",
            70: "var(--global-colors-success-70)",
            75: "var(--global-colors-success-75)",
            80: "var(--global-colors-success-80)",
            90: "var(--global-colors-success-90)"
          },
          error: {
            10: "var(--global-colors-error-10)",
            20: "var(--global-colors-error-20)",
            30: "var(--global-colors-error-30)",
            40: "var(--global-colors-error-40)",
            50: "var(--global-colors-error-50)",
            60: "var(--global-colors-error-60)",
            70: "var(--global-colors-error-70)",
            80: "var(--global-colors-error-80)",
            90: "var(--global-colors-error-90)"
          },
          warning: {
            10: "var(--global-colors-warning-10)",
            20: "var(--global-colors-warning-20)",
            30: "var(--global-colors-warning-30)",
            40: "var(--global-colors-warning-40)",
            50: "var(--global-colors-warning-50)",
            60: "var(--global-colors-warning-60)",
            70: "var(--global-colors-warning-70)",
            80: "var(--global-colors-warning-80)",
            90: "var(--global-colors-warning-90)"
          }
        },
        fontWeight: {
          light: "var(--global-font-weight-light)",
          regular: "var(--global-font-weight-regular)",
          medium: "var(--global-font-weight-medium)",
          semibold: "var(--global-font-weight-semibold)",
          bold: "var(--global-font-weight-bold)"
        },
        fontFamily: {
          sourceCodePro: "var(--global-font-family-source-code-pro)",
          petersburg: "var(--global-font-family-petersburg)",
          graphik: "var(--global-font-family-graphik)"
        }
      }
    },
  },
}