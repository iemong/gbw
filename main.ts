import { open } from "https://deno.land/x/opener/mod.ts";

type GitUrlObj = {
    url: string
}

const getGitBranch = async () => {
  const p = Deno.run({
    cmd: ["git", "symbolic-ref", "--short", "HEAD"],
    stdout: "piped",
    stderr: "piped",
  });

  const { code } = await p.status();
  const rawOutput = await p.output();
  const rawError = await p.stderrOutput();

  if (code === 0) {
    const result = new TextDecoder().decode(rawOutput);
    return { code, result };
  } else {
    const result = new TextDecoder().decode(rawError);
    console.error(result);
    return { code, result };
  }
};

const openGitUrl = async () => {
  const p = Deno.run({
    cmd: ["gh", "repo", "view", "--json", "url"],
    stdout: "piped",
    stderr: "piped",
  });
  const { code } = await p.status();
  const rawOutput = await p.output();
  const rawError = await p.stderrOutput();

  if (code === 0) {
    const result = new TextDecoder().decode(rawOutput);
    const json: GitUrlObj = JSON.parse(result)
    return { code, result: json.url };
  } else {
    const result = new TextDecoder().decode(rawError);
    console.error(result);
    return { code, result };
  }
};

const { result: branchName } = await getGitBranch();
const { code, result } = await openGitUrl();

const url = `${result}/tree/${branchName}`

await open(new URL(url).href);

Deno.exit(code);
