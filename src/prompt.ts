import { rgb8 } from "https://deno.land/std@0.202.0/fmt/colors.ts";

import { colors } from "./colors.ts";


export const _deps = {
  stdin: {
    setRaw: Deno.stdin.setRaw,
    read: Deno.stdin.read,
  },
  stdout: {
    write: Deno.stdout.write,
  },
  exit: Deno.exit,
  fmt: {
    colors: {
      rgb8,
    },
  },
};


export async function password(message: string) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  _deps.stdin.setRaw(true);
  _deps.stdout.write(encoder.encode(message));

  let readBytes, byteCount, readString, charCode, fill = "", password = "";

  while (true) {
    readBytes = new Uint8Array(1);
    byteCount = await _deps.stdin.read(readBytes);
    if (byteCount === 0) break;

    readString = decoder.decode(readBytes);

    charCode = readString.charCodeAt(0);
    if (charCode === 13) break;
    if ([3, 4].includes(charCode)) _deps.exit(1);

    password += readString;
    fill = _deps.fmt.colors.rgb8(Array(password.length).fill("*").join(""), colors.green);
    _deps.stdout.write(encoder.encode(`\r${message}${fill}`));
  }

  console.log("");
  _deps.stdin.setRaw(false);

  return password;
}
