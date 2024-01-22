import { rgb8 } from "https://deno.land/std@0.202.0/fmt/colors.ts";

export const deps = {
  stdin: {
    setRaw: Deno.stdin.setRaw.bind(Deno.stdin),
    read: Deno.stdin.read.bind(Deno.stdin),
  },
  stdout: {
    write: Deno.stdout.write.bind(Deno.stdout),
  },
  exit: Deno.exit,
  fmt: {
    colors: {
      rgb8,
    },
  },
};
