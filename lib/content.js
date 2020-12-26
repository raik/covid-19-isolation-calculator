import fs from "fs";
import yaml from "js-yaml";

export function getContent(locale) {
  const contentFile = yaml.safeLoad(
    fs.readFileSync(`./content/content.${locale}.yaml`, "utf8")
  );

  return contentFile;
}
