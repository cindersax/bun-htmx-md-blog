import { Glob } from "bun";
import sharp from "sharp";

export async function serveCss(filePath: string): Promise<Response | null> {
  if (filePath === "/styles.css") {
    return new Response(await Bun.file("src/assets/output.css").text(), {
      headers: { "Content-Type": "text/css" },
      status: 200,
    });
  }
  return null;
}

export async function servePublicFile(
  filePath: string,
  publicFileGlob: Glob
): Promise<Response | null> {
  for await (const publicFilePath of publicFileGlob.scan(".")) {
    const fileName = publicFilePath.substring(
      publicFilePath.lastIndexOf("/") + 1,
      publicFilePath.lastIndexOf(".")
    );

    const fileExtension = publicFilePath.substring(
      publicFilePath.lastIndexOf(".") + 1
    );

    if (fileName && filePath === `/public/${fileName}.webp`) {
      try {
        const fileBuffer = await Bun.file(publicFilePath).arrayBuffer();
        switch (fileExtension) {
          case "png":
          case "jpg":
          case "webp":
          case "jpeg":
            const optimizedBuffer = await sharp(Buffer.from(fileBuffer))
              .resize({ width: 1200 })
              .webp({ quality: 60 })
              .toBuffer();
            return new Response(optimizedBuffer, {
              headers: { "Content-Type": `image/webp` },
            });

          case "svg":
            return new Response(fileBuffer, {
              headers: { "Content-Type": "image/svg+xml" },
            });

          case "txt":
            return new Response(fileBuffer, {
              headers: { "Content-Type": "text/plain" },
            });

          // Add more cases for other file types as needed
        }
      } catch (error) {
        console.error("Error processing file:", error);
        return null;
      }
    }
  }
  return null;
}
