
const varFileName = "_vars.sass"
const rootFileName = "root.sass"
const keyframesFileName = "_keyframes.sass"
const importVars = `@use "~@s/${varFileName}" as v`
const importKeyframes = `@use "~@s/${keyframesFileName}" as k`
const importAll = `
${importVars}
${importKeyframes}
`

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = (_phase, { defaultConfig }) => ({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.graphassets.com",
      },
    ],
  },
  sassOptions: {
    ...defaultConfig.sassOptions,
    additionalData: (content, context) => {
      const resourcePathParts = context.resource.split("/")
      const sheetPath = resourcePathParts[resourcePathParts.length - 1];
      const isVariables = sheetPath.includes(varFileName)
      const isKeyFrames = sheetPath.includes(keyframesFileName)
      const isRoot = sheetPath.includes(rootFileName)
      if (isVariables) {
        return content
      }
      if (isRoot || isKeyFrames) return [importVars, content].join("\n");

      return [importAll, content].join("\n");
    }
  }
});
export default nextConfig;
