import { deps } from "./deps.ts";
import { colors } from "./colors.ts";


export function line(message?: string, defaultValue?: string): string | undefined {
  return prompt(message, defaultValue) || undefined;
}


export async function password(message: string) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  deps.stdin.setRaw(true);
  deps.stdout.write(encoder.encode(message));

  let readBytes, byteCount, readString, charCode, fill = "", password = "";

  while (true) {
    readBytes = new Uint8Array(1);
    byteCount = await deps.stdin.read(readBytes);
    if (byteCount === 0) break;

    readString = decoder.decode(readBytes);

    charCode = readString.charCodeAt(0);
    if (charCode === 13) break;
    if ([3, 4].includes(charCode)) deps.exit(1);

    password += readString;
    fill = deps.fmt.colors.rgb8(Array(password.length).fill("*").join(""), colors.green);
    deps.stdout.write(encoder.encode(`\r${message}${fill}`));
  }

  console.log("");
  deps.stdin.setRaw(false);

  return password;
}
